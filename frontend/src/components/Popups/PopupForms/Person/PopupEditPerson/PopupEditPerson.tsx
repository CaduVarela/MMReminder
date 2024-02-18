import './../../PopupFormComumStyles.scss'
import './PopupEditPerson.scss'

import { FormEvent, useEffect, useState } from 'react'

import { InputLabel } from '@mui/material'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'
import EditButton from '../../../../CustomMUI/Buttons/EditButtons/EditButton'

import SaveIcon from '@mui/icons-material/Save';
import { PersonType } from '@/assets/types/BackendTypes'

import { ZodError, z } from 'zod'
import validator from 'validator'
import IMask, { InputMaskElement } from 'imask'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setAlert } from '@/store/alertSlice'
import { useDispatch } from 'react-redux'

function PopupEditPerson({ person, handleClose }: { person: PersonType, handleClose: Function }) {

  const [id, setId] = useState(person.id)

  const [name, setName] = useState(person.name)
  const [email, setEmail] = useState(person.email)


  const [phone, setPhone] = useState(person.phone)

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  const phoneSchema = z.string().min(11).refine(
    (value) => validator.isMobilePhone(value, 'pt-BR'),
    {
      message: "Invalid phone number"
    }
  ).optional()

  const zodSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: phoneSchema
  }).strict()

  function validateFields(): boolean {
    try {
      if (phone && phone.length > 0)
        zodSchema.parse({ name, email, phone })
      else
        zodSchema.parse({ name, email })

      return true
    } catch (err: any) {
      if (err instanceof ZodError) {
        // console.log(err.errors)
        const flatten = err.flatten()
        console.log(err.flatten())

        setNameError(false)
        setEmailError(false)
        setPhoneError(false)

        Object.entries(flatten.fieldErrors).forEach((key) => {
          switch (key[0]) {
            case 'name':
              setNameError(true)
              console.log('1')
              break;
            case 'email':
              setEmailError(true)
              console.log('2')
              break;
            case 'phone':
              setPhoneError(true)
              console.log('3')
              break;
          }
        })
      }

      return false
    }
  }

  useEffect(() => {
    IMask(
      document.getElementById('person-phone-field') as InputMaskElement,
      {
        mask: '(00) 00000-0000'
      }
    )
  }, [])

  let newPerson: PersonType = { name, email, phone } as PersonType

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const personMutation = useMutation({
    mutationKey: ["update-person"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/person/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...newPerson
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["persons"]
      })
      queryClient.refetchQueries({
        queryKey: ["teams"],
      })
      dispatch(setAlert({
        text: "Person updated successfully!",
        severity: "success",
        autoHideDuration: 3000
      }))
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateFields()) { return }

    if (phone && phone !== null && phone.length > 0)
      newPerson = { name, email, phone } as PersonType
    else
      newPerson = { name, email } as PersonType

    personMutation.mutate()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Edit Person
        </h1>
        <p>
          You are updating <span className='edit-color'>{person.name}</span>.
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='person-name-group'>
            <InputLabel htmlFor='person-name-field'>Person Name</InputLabel>
            <StyledInputField
              id='person-name-field'
              placeholder='person name'
              error={nameError}
              required
              defaultValue={person.name}
              onChange={(e) => { setName(e.target.value) }}
            ></StyledInputField>
          </div>
          <div className='person-email-group'>
            <InputLabel htmlFor='person-email-field'>Person Email</InputLabel>
            <StyledInputField
              id='person-email-field'
              placeholder='person email'
              type='email'
              error={emailError}
              required
              defaultValue={person.email}
              onChange={(e) => { setEmail(e.target.value) }}
            ></StyledInputField>
          </div>
          <div className='person-phone-group'>
            <InputLabel htmlFor='person-phone-field'>Person Phone</InputLabel>
            <StyledInputField
              id='person-phone-field'
              placeholder='person phone'
              error={phoneError}
              defaultValue={person.phone}
              onChange={(e) => { setPhone(e.target.value) }}
            ></StyledInputField>
          </div>
          <div className='button-row'>
            <EditButton startIcon={<SaveIcon />} type='submit'>SAVE CHANGES</EditButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupEditPerson
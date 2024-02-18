import './../../PopupFormComumStyles.scss'
import './PopupAddNewPerson.scss'

import { FormEvent, useEffect, useState } from 'react'

import { InputLabel } from '@mui/material'
import AddButton from '../../../../CustomMUI/Buttons/AddButtons/AddButton'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import IMask, { InputMaskElement } from 'imask'
import { ZodError, z } from 'zod'
import validator from 'validator'
import { PersonType } from '@/assets/types/BackendTypes'
import { useDispatch } from 'react-redux'
import { setAlert } from '@/store/alertSlice'

function PopupAddNewPerson({ handleClose }: { handleClose: Function }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

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
    name: z.string().trim().min(1).max(40),
    email: z.string().trim().min(1).max(40).email(),
    phone: phoneSchema
  }).strict()

  function validateFields(): boolean {
    try {
      if (phone.length > 0)
        zodSchema.parse({ name, email, phone })
      else
        zodSchema.parse({ name, email })

      return true
    } catch (err: any) {
      if (err instanceof ZodError) {
        const flatten = err.flatten()

        setNameError(false)
        setEmailError(false)
        setPhoneError(false)

        Object.entries(flatten.fieldErrors).forEach((key) => {
          switch (key[0]) {
            case 'name':
              setNameError(true)
              break;
            case 'email':
              setEmailError(true)
              break;
            case 'phone':
              setPhoneError(true)
              break;
          }
        })
      }

      return false
    }
  }

  let newPerson: PersonType

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const personMutation = useMutation({
    mutationKey: ["new-person"],
    mutationFn: async () => {
      return await fetch('http://localhost:3000/api/person', {
        method: 'POST',
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
      dispatch(setAlert({
        text: "New person created successfully!",
        severity: "success",
        autoHideDuration: 3000
      }))
    }
  })

  useEffect(() => {
    IMask(
      document.getElementById('person-phone-field') as InputMaskElement,
      {
        mask: '(00) 00000-0000'
      }
    )
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateFields()) { return }

    if (phone.length < 1)
      newPerson = { name: name.trim(), email: email.trim() } as PersonType
    else
      newPerson = { name: name.trim(), email: email.trim(), phone: phone.trim() } as PersonType

    personMutation.mutate()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add New Person
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='person-name-group'>
            <InputLabel htmlFor='person-name-field'>Name</InputLabel>
            <StyledInputField
              id='person-name-field'
              placeholder='person name'
              error={nameError}
              required
              onChange={(e) => { setName(e.target.value) }}
            ></StyledInputField>
          </div>
          <div className='person-email-group'>
            <InputLabel htmlFor='person-email-field'>Email</InputLabel>
            <StyledInputField
              id='person-email-field'
              placeholder='person email'
              type='email'
              error={emailError}
              required
              onChange={(e) => { setEmail(e.target.value) }}
            ></StyledInputField>
          </div>
          <div className='person-phone-group'>
            <InputLabel htmlFor='person-phone-field'>Phone</InputLabel>
            <StyledInputField
              id='person-phone-field'
              placeholder='person phone'
              error={phoneError}
              onChange={(e) => { setPhone(e.target.value) }}
            ></StyledInputField>
          </div>
          <div className='button-row'>
            <AddButton type='submit'>ADD PERSON</AddButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupAddNewPerson
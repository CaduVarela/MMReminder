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

  const [nameError, setNameError] = useState({ error: false, text: [''] })
  const [emailError, setEmailError] = useState({ error: false, text: [''] })
  const [phoneError, setPhoneError] = useState({ error: false, text: [''] })

  const phoneSchema = z.string().refine(
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
      if (phone && phone.length > 0)
        zodSchema.parse({ name, email, phone })
      else
        zodSchema.parse({ name, email })

      return true
    } catch (err: any) {
      if (err instanceof ZodError) {
        const flattenError = err.flatten()

        setNameError({ error: false, text: [''] })
        setEmailError({ error: false, text: [''] })
        setPhoneError({ error: false, text: [''] })

        Object.entries(flattenError.fieldErrors).forEach((key) => {
          console.log(key)
          switch (key[0]) {
            case 'name':
              setNameError({ error: true, text: key[1] as string[] })
              break;
            case 'email':
              setEmailError({ error: true, text: key[1] as string[] })
              break;
            case 'phone':
              setPhoneError({ error: true, text: key[1] as string[] })
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

    if (phone && phone !== null && phone.length > 0)
      newPerson = { name, email, phone } as PersonType
    else
      newPerson = { name, email, phone: '' } as PersonType

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

          <div className='field-group person-name-group'>
            <InputLabel htmlFor='person-name-field'>Name <span className='warning-color'>*</span></InputLabel>
            <StyledInputField
              id='person-name-field'
              placeholder='person name'
              error={nameError.error}
              onChange={(e) => { setName(e.target.value), setNameError({ error: false, text: [''] }) }}
            ></StyledInputField>
            {nameError?.text.map((value, i) => <p key={i} className='field-error'>{value}</p>)}
          </div>

          <div className='field-group person-email-group'>
            <InputLabel htmlFor='person-email-field'>Email <span className='warning-color'>*</span></InputLabel>
            <StyledInputField
              id='person-email-field'
              placeholder='person email'
              error={emailError.error}
              onChange={(e) => { setEmail(e.target.value), setEmailError({ error: false, text: [''] }) }}
            ></StyledInputField>
            {emailError?.text.map((value, i) => <p key={i} className='field-error'>{value}</p>)}
          </div>

          <div className='field-group person-phone-group'>
            <InputLabel htmlFor='person-phone-field'>Phone</InputLabel>
            <StyledInputField
              id='person-phone-field'
              placeholder='person phone'
              error={phoneError.error}
              onChange={(e) => { setPhone(e.target.value), setPhoneError({ error: false, text: [''] }) }}
            ></StyledInputField>
            {phoneError?.text.map((value, i) => <p key={i} className='field-error'>{value}</p>)}
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
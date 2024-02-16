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

function PopupAddNewPerson({ handleClose }: { handleClose: Function }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  const zodSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().min(11).refine(
      (value) => validator.isMobilePhone(value, 'pt-BR'),
      {
        message: "Invalid phone number"
      }
    ).optional(),
  }).strict()

  function validateFields(): boolean {
    try {
      zodSchema.parse({
        name,
        email,
        phone
      })
      return true
    } catch (err: any) {
      if (err instanceof ZodError) {
        // console.log(err.errors)
        err.errors.forEach((err) => {
          console.log(err.message)
        })
      }

      return false
    }
  }

  const personMutation = useMutation({
    mutationKey: ["new-person"],
    mutationFn: async () => {
      return await fetch('http://localhost:3000/api/person', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
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


  const queryClient = useQueryClient()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateFields()) {
      return
    }

    personMutation.mutate()

    queryClient.resetQueries()

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
            <InputLabel htmlFor='person-name-field'>Person Name</InputLabel>
            <StyledInputField
              id='person-name-field'
              placeholder='person name'
              error={nameError}
              required
              onChange={(e) => {setName(e.target.value); setNameError(false)}}
            ></StyledInputField>
          </div>
          <div className='person-email-group'>
            <InputLabel htmlFor='person-email-field'>Person Email</InputLabel>
            <StyledInputField
              id='person-email-field'
              placeholder='person email'
              type='email'
              error={nameError}
              required
              onChange={(e) => {setEmail(e.target.value); setEmailError(false)}}
            ></StyledInputField>
          </div>
          <div className='person-phone-group'>
            <InputLabel htmlFor='person-phone-field'>Person Phone</InputLabel>
            <StyledInputField
              id='person-phone-field'
              placeholder='person phone'
              error={phoneError}
              onChange={(e) => { setPhone(e.target.value); setPhoneError(false) }}
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
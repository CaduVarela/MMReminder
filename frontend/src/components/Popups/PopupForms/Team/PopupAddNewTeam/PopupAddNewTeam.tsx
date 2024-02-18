import './../../PopupFormComumStyles.scss'
import './PopupAddNewTeam.scss'

import { FormEvent, useState } from 'react'

import { InputLabel } from '@mui/material'
import AddButton from '../../../../CustomMUI/Buttons/AddButtons/AddButton'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import PopupAlert from '@/components/PopupAlert/PopupAlert'
import { setAlert } from '@/store/alertSlice'
import { useDispatch } from 'react-redux'

function PopupAddNewTeam({ handleClose }: { handleClose: Function }) {

  const [name, setName] = useState('')

  const [nameError, setNameError] = useState(false)

  const zodSchema = z.string().trim().min(1).max(40)

  function validateFields(): boolean {
    try {
      zodSchema.parse(name)
      return true
    } catch (err) {
      setNameError(true)
      return false
    }
  }

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const teamMutation = useMutation({
    mutationKey: ["new-team"],
    mutationFn: async () => {
      return await fetch('http://localhost:3000/api/team', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["teams"]
      })
      dispatch(setAlert({
        text: "New team created!",
        severity: "success",
        autoHideDuration: 3000
      }))
    }
  })


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateFields()) return

    teamMutation.mutate()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add New Team
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='team-name-group'>
            <InputLabel htmlFor='team-name-field'>Name</InputLabel>
            <StyledInputField
              id='team-name-field'
              placeholder='team name'
              onChange={(e) => { setName(e.target.value); setNameError(false) }}
              required
              error={nameError}
            ></StyledInputField>
          </div>
          <div className='button-row'>
            <AddButton type='submit'>ADD TEAM</AddButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupAddNewTeam
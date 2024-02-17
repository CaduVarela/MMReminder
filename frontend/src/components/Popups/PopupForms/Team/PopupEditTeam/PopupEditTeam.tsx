import './../../PopupFormComumStyles.scss'
import './PopupEditTeam.scss'

import { FormEvent, useState } from 'react'

import { InputLabel } from '@mui/material'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'
import EditButton from '../../../../CustomMUI/Buttons/EditButtons/EditButton'

import SaveIcon from '@mui/icons-material/Save';

import { TeamType } from '@assets/types/BackendTypes'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function PopupEditTeam({ team, handleClose }: { team: TeamType, handleClose: Function }) {

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

  const queryClient = useQueryClient()

  const teamMutation = useMutation({
    mutationKey: ["update-team"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/team/${team.id}`, {
        method: 'PUT',
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
          Edit Team
        </h1>
        <p>
          You are updating <span className='edit-color'>{team.name}</span>.
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='team-name-group'>
            <InputLabel htmlFor='team-name-field'>Team Name</InputLabel>
            <StyledInputField
              id='team-name-field'
              required defaultValue={team.name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
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

export default PopupEditTeam
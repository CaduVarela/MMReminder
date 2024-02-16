import './../../PopupFormComumStyles.scss'
import './PopupDeleteTeam.scss'

import { FormEvent } from 'react'
import DeleteButton from '../../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../../PopupBox'
import { TeamType } from '@assets/types/BackendTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function PopupDeleteTeam({ team, handleClose }: { team: TeamType, handleClose: Function }) {

  const teamMutation = useMutation({
    mutationKey: ["delete-team"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/team/${team.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  })

  const queryClient = useQueryClient()

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    teamMutation.mutate()

    queryClient.resetQueries()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Team</h1>
        <p>Are you sure you want to delete <span className='warning'>{team.name}</span>?</p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='button-row'>
            <DeleteButton type='submit'>DELETE</DeleteButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupDeleteTeam
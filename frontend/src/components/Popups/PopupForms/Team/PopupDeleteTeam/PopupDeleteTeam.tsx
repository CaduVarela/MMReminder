import './../../PopupFormComumStyles.scss'
import './PopupDeleteTeam.scss'

import { FormEvent } from 'react'
import DeleteButton from '../../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../../PopupBox'
import { TeamType } from '@assets/types/BackendTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setAlert } from '@/store/alertSlice'
import { useDispatch } from 'react-redux'

function PopupDeleteTeam({ team, handleClose }: { team: TeamType, handleClose: Function }) {

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const teamMutation = useMutation({
    mutationKey: ["delete-team"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/team/${team.id}`, {
        method: 'DELETE',
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
        text: "Team deleted successfully!",
        severity: "success",
        autoHideDuration: 3000
      }))
    }
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    teamMutation.mutate()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Team</h1>
        <p>Are you sure you want to delete <span className='danger-color'>{team.name}</span>?</p>
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
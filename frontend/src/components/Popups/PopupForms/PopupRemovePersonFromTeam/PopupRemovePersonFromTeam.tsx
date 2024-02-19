import './../PopupFormComumStyles.scss'
import './PopupRemovePersonFromTeam.scss'

import DeleteButton from '../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../PopupBox'

import { FormEvent } from 'react'
import { PersonType, TeamType } from '@/assets/types/BackendTypes'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { setAlert } from '@/store/alertSlice'
import { useDispatch } from 'react-redux'

function PopupRemovePersonFromTeam(
  {
    person,
    team,
    handleClose
  }: {
    person: PersonType,
    team: TeamType,
    handleClose: Function
  }) {

  const dispatch = useDispatch()
  const queryClient = useQueryClient();
  
  const personMutation = useMutation({
    mutationKey: ["remove-person-from-team"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/person/${person.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          '$disconnect': {
            'teams': [team.id]
          }
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
      queryClient.refetchQueries({
        queryKey: ["persons"]
      })
      dispatch(setAlert({
        text: "Removed person from team successfully!",
        severity: "success",
        autoHideDuration: 3000
      }))
    }
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    personMutation.mutate()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Person</h1>
        <p>Are you sure you want to remove <span className='danger-color'>{person.name}</span> from <span className='danger-color'>{team.name}</span>?</p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='button-row'>
            <DeleteButton type='submit'>REMOVE</DeleteButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupRemovePersonFromTeam
import './../PopupFormComumStyles.scss'
import './PopupRemovePersonFromTeam.scss'

import DeleteButton from '../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../PopupBox'

import { FormEvent } from 'react'
import { PersonType, TeamType } from '@/assets/types/BackendTypes'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

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

  const personMutation = useMutation({
    mutationKey: ["delete-person"],
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
    }
  })

  const queryClient = useQueryClient();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    personMutation.mutate()

    queryClient.resetQueries()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Person</h1>
        <p>Are you sure you want to remove <span className='warning'>{person.name}</span> from <span className='warning'>{team.name}</span>?</p>
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
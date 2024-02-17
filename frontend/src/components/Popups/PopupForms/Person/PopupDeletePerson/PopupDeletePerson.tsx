import './../../PopupFormComumStyles.scss'
import './PopupDeletePerson.scss'

import { FormEvent } from 'react'
import DeleteButton from '../../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../../PopupBox'
import { PersonType } from '@/assets/types/BackendTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function PopupDeletePerson({ person, handleClose }: { person: PersonType, handleClose: Function }) {

  const queryClient = useQueryClient()

  const personMutation = useMutation({
    mutationKey: ["delete-person"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/person/${person.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["persons"]
      })
    }
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    personMutation.mutate()

    handleClose()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Person</h1>
        <p>Are you sure you want to delete <span className='warning'>{person.name}</span>?</p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='button-row'>
            <DeleteButton type='submit'>DELETE</DeleteButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupDeletePerson
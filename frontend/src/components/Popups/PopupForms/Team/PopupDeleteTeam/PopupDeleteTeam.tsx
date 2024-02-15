import './../../PopupFormComumStyles.scss'
import './PopupDeleteTeam.scss'

import { FormEvent } from 'react'
import DeleteButton from '../../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../../PopupBox'

function PopupDeleteTeam({ teamID, teamName }: { teamID: number, teamName: string }) {

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Team</h1>
        <p>Are you sure you want to delete <span className='warning'>{teamName}</span>?</p>
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
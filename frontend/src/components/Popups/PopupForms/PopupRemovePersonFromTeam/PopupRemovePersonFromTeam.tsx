import './../PopupFormComumStyles.scss'
import './PopupRemovePersonFromTeam.scss'

import DeleteButton from '../../../CustomMUI/Buttons/DeleteButtons/DeleteButton'
import PopupBox from '../../PopupBox'

import { FormEvent } from 'react'

function PopupRemovePersonFromTeam(
  {
    personID,
    personName,
    teamID,
    teamName
  }: {
    personID: number,
    personName: string,
    teamID: number,
    teamName: string,
  }) {

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>Delete Person</h1>
        <p>Are you sure you want to remove <span className='warning'>{personName}</span> from <span className='warning'>{teamName}</span>?</p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='button-row'>
            <DeleteButton type='submit'>DELETE</DeleteButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupRemovePersonFromTeam
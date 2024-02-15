import './../../PopupFormComumStyles.scss'
import './PopupAddNewTeam.scss'

import { FormEvent } from 'react'

import { InputLabel } from '@mui/material'
import AddButton from '../../../../CustomMUI/Buttons/AddButtons/AddButton'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'

function PopupAddNewTeam() {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // @todo: code proper action
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add New Team
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='team-name-group'>
            <InputLabel htmlFor='team-name-field'>Team Name</InputLabel>
            <StyledInputField id='team-name-field' placeholder='team name' required></StyledInputField>
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
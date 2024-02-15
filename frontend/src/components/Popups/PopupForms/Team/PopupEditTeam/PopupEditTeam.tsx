import './../../PopupFormComumStyles.scss'
import './PopupEditTeam.scss'

import { FormEvent } from 'react'

import { InputLabel } from '@mui/material'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'
import EditButton from '../../../../CustomMUI/Buttons/EditButtons/EditButton'

import SaveIcon from '@mui/icons-material/Save';

function PopupEditTeam({ teamID, teamName }: { teamID: number, teamName: string }) {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // @todo: code proper action
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Edit Team
        </h1>
        <p>
          You are updating <span className='edit-color'>{teamName}</span>.
        </p>
        <form className='form' onSubmit={handleSubmit}>
          <div className='team-name-group'>
            <InputLabel htmlFor='team-name-field'>Team Name</InputLabel>
            <StyledInputField id='team-name-field' required defaultValue={teamName}></StyledInputField>
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
import './../../PopupFormComumStyles.scss'
import './PopupEditPerson.scss'

import { FormEvent } from 'react'

import { InputLabel } from '@mui/material'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'
import EditButton from '../../../../CustomMUI/Buttons/EditButtons/EditButton'

import SaveIcon from '@mui/icons-material/Save';

function PopupEditPerson(
  {
    personID,
    personName,
    personEmail,
    personPhone
  }: {
    personID: number,
    personName: string,
    personEmail: string,
    personPhone?: string,
  }) {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // @todo: code proper action
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Edit Person
        </h1>
        <p>
          You are updating <span className='edit-color'>{personName}</span>.
        </p>
        <form className='form' onSubmit={handleSubmit}>
        <div className='person-name-group'>
            <InputLabel htmlFor='person-name-field'>Person Name</InputLabel>
            <StyledInputField id='person-name-field' placeholder='person name' defaultValue={personName} required></StyledInputField>
          </div>
          <div className='person-email-group'>
            <InputLabel htmlFor='person-email-group'>Person Email</InputLabel>
            <StyledInputField id='person-email-group' placeholder='person email' type='email' defaultValue={personEmail} required></StyledInputField>
          </div>
          <div className='person-phone-group'>
            <InputLabel htmlFor='person-phone-group'>Person Phone</InputLabel>
            <StyledInputField id='person-phone-group' placeholder='person phone' defaultValue={personPhone}></StyledInputField>
          </div>
          <div className='button-row'>
            <EditButton startIcon={<SaveIcon />} type='submit'>SAVE CHANGES</EditButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupEditPerson
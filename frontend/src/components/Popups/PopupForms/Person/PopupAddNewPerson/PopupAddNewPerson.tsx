import './../../PopupFormComumStyles.scss'
import './PopupAddNewPerson.scss'

import { FormEvent } from 'react'

import { InputLabel } from '@mui/material'
import AddButton from '../../../../CustomMUI/Buttons/AddButtons/AddButton'
import StyledInputField from '../../../../CustomMUI/StyledInputField'
import PopupBox from '../../../PopupBox'

function PopupAddNewPerson() {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // @todo: code proper action
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add New Person
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='person-name-group'>
            <InputLabel htmlFor='person-name-field'>Person Name</InputLabel>
            <StyledInputField id='person-name-field' placeholder='person name' required></StyledInputField>
          </div>
          <div className='person-email-group'>
            <InputLabel htmlFor='person-email-group'>Person Email</InputLabel>
            <StyledInputField id='person-email-group' placeholder='person email' type='email' required></StyledInputField>
          </div>
          <div className='person-phone-group'>
            <InputLabel htmlFor='person-phone-group'>Person Phone</InputLabel>
            <StyledInputField id='person-phone-group' placeholder='person phone'></StyledInputField>
          </div>
          <div className='button-row'>
            <AddButton type='submit'>ADD PERSON</AddButton>
          </div>
        </form>
      </div>
    </PopupBox>
  )
}

export default PopupAddNewPerson
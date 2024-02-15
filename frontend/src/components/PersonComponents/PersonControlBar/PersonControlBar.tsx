import './PersonControlBar.scss'

// Buttons & Input
import AddButton from '../../CustomMUI/Buttons/AddButtons/AddButton'
import AddButtonOutline from '../../CustomMUI/Buttons/AddButtons/AddButtonOutline'

import DeleteButton from '../../CustomMUI/Buttons/DeleteButtons/DeleteButton'

import EditButton from '../../CustomMUI/Buttons/EditButtons/EditButton'
import EditButtonOutline from '../../CustomMUI/Buttons/EditButtons/EditButtonOutline'

import FilterButton from '../../CustomMUI/Buttons/FilterButtons/FilterButton'
import FilterButtonOutline from '../../CustomMUI/Buttons/FilterButtons/FilterButtonOutline'

import RoundedTextBar from '../../CustomMUI/RoundedTextBar'
import PopupModal from '../../Popups/PopupModal'
import { useState } from 'react'
import PopupAddExistingTeam from '../../Popups/PopupForms/Team/PopupAddExistingTeam/PopupAddExistingTeam'
import PopupDeletePerson from '../../Popups/PopupForms/Person/PopupDeletePerson/PopupDeletePerson'
import PopupEditPerson from '../../Popups/PopupForms/Person/PopupEditPerson/PopupEditPerson'

function PersonControlBar(
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

  const buttonHeight = '40px';

  // Button Events
  const [showAddExistingTeam, setShowAddTeam] = useState(false)
  const handleAddExistingTeam = () => {
    setShowAddTeam(prevState => !prevState)
  }

  const [showDeletePerson, setShowDeletePerson] = useState(false)
  const handleShowDeletePerson = () => {
    setShowDeletePerson(prevState => !prevState)
  }
  
  const [showEditPerson, setShowEditPerson] = useState(false)
  const handleShowEditPerson = () => {
    setShowEditPerson(prevState => !prevState)
  }

  return (
    <>
      <PopupModal
        open={showAddExistingTeam}
        onClose={handleAddExistingTeam}
      >
        <PopupAddExistingTeam />
      </PopupModal>

      <PopupModal
        open={showDeletePerson}
        onClose={handleShowDeletePerson}
      >
        <PopupDeletePerson personID={personID} personName={personName} />
      </PopupModal>

      <PopupModal
        open={showEditPerson}
        onClose={handleShowEditPerson}
      >
        <PopupEditPerson personID={personID} personName={personName} personEmail={personEmail} personPhone={personPhone}/>
      </PopupModal>

      <div className='person-control-bar'>
        <div>
          <RoundedTextBar placeholder='Filter by Team Name' style={{ marginRight: '8px', height: buttonHeight }}></RoundedTextBar>
          <FilterButtonOutline style={{ height: buttonHeight }}>FILTER</FilterButtonOutline>
        </div>
        <AddButtonOutline style={{ height: buttonHeight }} onClick={handleAddExistingTeam}>ADD TEAM</AddButtonOutline>
        <EditButtonOutline style={{ height: buttonHeight }} onClick={handleShowEditPerson}>EDIT PERSON</EditButtonOutline>
        <DeleteButton style={{ height: buttonHeight }} onClick={handleShowDeletePerson}>DELETE PERSON</DeleteButton>
      </div>
    </>
  )
}

export default PersonControlBar
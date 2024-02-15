import './TeamControlBar.scss'

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
import PopupAddExistingPerson from '../../Popups/PopupForms/Person/PopupAddExistingPerson/PopupAddExistingPerson'
import PopupDeleteTeam from '../../Popups/PopupForms/Team/PopupDeleteTeam/PopupDeleteTeam'
import PopupEditTeam from '../../Popups/PopupForms/Team/PopupEditTeam/PopupEditTeam'

function TeamControlBar({ teamID, teamName }: { teamID: number, teamName: string }) {

  const buttonHeight = '40px';

  // Button Events
  const [showAddExistingPerson, setShowAddPerson] = useState(false)
  const handleAddExistingPerson = () => {
    setShowAddPerson(prevState => !prevState)
  }

  const [showShowDeleteTeam, setShowDeleteTeam] = useState(false)
  const handleShowDeleteTeam = () => {
    setShowDeleteTeam(prevState => !prevState)
  }

  const [showEditTeam, setShowEditTeam] = useState(false)
  const handleShowEditTeam = () => {
    setShowEditTeam(prevState => !prevState)
  }

  return (
    <>
      <PopupModal
        open={showAddExistingPerson}
        onClose={handleAddExistingPerson}
      >
        <PopupAddExistingPerson />
      </PopupModal>

      <PopupModal
        open={showShowDeleteTeam}
        onClose={handleShowDeleteTeam}
      >
        <PopupDeleteTeam teamID={teamID} teamName={teamName} />
      </PopupModal>

      <PopupModal
        open={showEditTeam}
        onClose={handleShowEditTeam}
      >
        <PopupEditTeam teamID={teamID} teamName={teamName} />
      </PopupModal>

      <div className='team-control-bar'>
        <div>
          <RoundedTextBar placeholder='Filter by Person Name' style={{ marginRight: '8px', height: buttonHeight }}></RoundedTextBar>
          <FilterButtonOutline style={{ height: buttonHeight }}>FILTER</FilterButtonOutline>
        </div>
        <AddButtonOutline style={{ height: buttonHeight }} onClick={handleAddExistingPerson}>ADD PERSON</AddButtonOutline>
        <EditButtonOutline style={{ height: buttonHeight }} onClick={handleShowEditTeam}>EDIT TEAM</EditButtonOutline>
        <DeleteButton style={{ height: buttonHeight }} onClick={handleShowDeleteTeam}>DELETE TEAM</DeleteButton>
      </div>
    </>
  )
}

export default TeamControlBar
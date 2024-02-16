import './TeamControlBar.scss'

// Buttons & Input
import AddButtonOutline from '../../CustomMUI/Buttons/AddButtons/AddButtonOutline'

import DeleteButton from '../../CustomMUI/Buttons/DeleteButtons/DeleteButton'

import EditButtonOutline from '../../CustomMUI/Buttons/EditButtons/EditButtonOutline'

import FilterButtonOutline from '../../CustomMUI/Buttons/FilterButtons/FilterButtonOutline'

import RoundedTextBar from '../../CustomMUI/RoundedTextBar'
import PopupModal from '../../Popups/PopupModal'
import { useState } from 'react'
import PopupAddExistingPerson from '../../Popups/PopupForms/Person/PopupAddExistingPerson/PopupAddExistingPerson'
import PopupDeleteTeam from '../../Popups/PopupForms/Team/PopupDeleteTeam/PopupDeleteTeam'
import PopupEditTeam from '../../Popups/PopupForms/Team/PopupEditTeam/PopupEditTeam'
import { TeamType } from '@assets/types/BackendTypes'

function TeamControlBar({
  team,
  handleFilterChange
}: {
  team: TeamType,
  handleFilterChange: Function
}) {

  const [filterText, setFilterText] = useState('')

  const buttonHeight = '40px';

  // Button Events
  const [showAddExistingPerson, setShowAddPerson] = useState(false)
  const handleAddExistingPerson = () => {
    setShowAddPerson(prevState => !prevState)
  }

  const [showDeleteTeam, setShowDeleteTeam] = useState(false)
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
        <>
          <PopupAddExistingPerson team={team} handleClose={handleAddExistingPerson} />
        </>
      </PopupModal>

      <PopupModal
        open={showDeleteTeam}
        onClose={handleShowDeleteTeam}
      >
        <>
          <PopupDeleteTeam team={team} handleClose={handleShowDeleteTeam} />
        </>
      </PopupModal>

      <PopupModal
        open={showEditTeam}
        onClose={handleShowEditTeam}
      >
        <>
          <PopupEditTeam team={team} handleClose={handleShowEditTeam} />
        </>
      </PopupModal>

      <div className='team-control-bar'>
        {/* <div>
          <RoundedTextBar
            placeholder='Filter by Person Name'
            style={{ marginRight: '8px', height: buttonHeight }}
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
          ></RoundedTextBar>
          <FilterButtonOutline
            style={{ height: buttonHeight }}
            onClick={(e) => handleFilterChange(e, filterText)}
          >FILTER</FilterButtonOutline>
        </div> */}
        <AddButtonOutline style={{ height: buttonHeight }} onClick={handleAddExistingPerson}>ADD PERSON</AddButtonOutline>
        <EditButtonOutline style={{ height: buttonHeight }} onClick={handleShowEditTeam}>EDIT TEAM</EditButtonOutline>
        <DeleteButton style={{ height: buttonHeight }} onClick={handleShowDeleteTeam}>DELETE TEAM</DeleteButton>
      </div>
    </>
  )
}

export default TeamControlBar
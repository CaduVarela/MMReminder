import './PersonControlBar.scss'

// Buttons & Input
import AddButtonOutline from '../../CustomMUI/Buttons/AddButtons/AddButtonOutline'

import DeleteButton from '../../CustomMUI/Buttons/DeleteButtons/DeleteButton'

import EditButtonOutline from '../../CustomMUI/Buttons/EditButtons/EditButtonOutline'

import FilterButtonOutline from '../../CustomMUI/Buttons/FilterButtons/FilterButtonOutline'

import RoundedTextBar from '../../CustomMUI/RoundedTextBar'
import PopupModal from '../../Popups/PopupModal'
import { Dispatch, SetStateAction, useState } from 'react'
import PopupAddExistingTeam from '../../Popups/PopupForms/Team/PopupAddExistingTeam/PopupAddExistingTeam'
import PopupDeletePerson from '../../Popups/PopupForms/Person/PopupDeletePerson/PopupDeletePerson'
import PopupEditPerson from '../../Popups/PopupForms/Person/PopupEditPerson/PopupEditPerson'
import { PersonType } from '@/assets/types/BackendTypes'
import RefreshButtonOutline from '@/components/CustomMUI/Buttons/RefreshButtons/RefreshButtonOutline'

function PersonControlBar(
  {
    person,
    setFilterText
  }: {
    person: PersonType,
    setFilterText: Dispatch<SetStateAction<string>>
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
        <>
          <PopupAddExistingTeam person={person} handleClose={handleAddExistingTeam} />
        </>
      </PopupModal>

      <PopupModal
        open={showDeletePerson}
        onClose={handleShowDeletePerson}
      >
        <>
          <PopupDeletePerson person={person} handleClose={handleShowDeletePerson} />
        </>
      </PopupModal>

      <PopupModal
        open={showEditPerson}
        onClose={handleShowEditPerson}
      >
        <>
          <PopupEditPerson person={person} handleClose={handleShowEditPerson} />
        </>
      </PopupModal>

      <div className='person-control-bar'>
        <div>
          <RoundedTextBar
            placeholder='Filter by Team Name'
            style={{ marginRight: '8px', height: buttonHeight }}
            onChange={(e) => setFilterText(e.target.value)}
          ></RoundedTextBar>
          {/* <FilterButtonOutline
            style={{ height: buttonHeight }}
          >FILTER</FilterButtonOutline> */}
        </div>
        <AddButtonOutline style={{ height: buttonHeight }} onClick={handleAddExistingTeam}>ADD TEAM</AddButtonOutline>
        <EditButtonOutline style={{ height: buttonHeight }} onClick={handleShowEditPerson}>EDIT PERSON</EditButtonOutline>
        <DeleteButton style={{ height: buttonHeight }} onClick={handleShowDeletePerson}>DELETE PERSON</DeleteButton>
      </div>
    </>
  )
}

export default PersonControlBar
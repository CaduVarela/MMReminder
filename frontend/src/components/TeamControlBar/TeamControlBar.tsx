import './TeamControlBar.scss'

// Buttons & Input
import AddButton from '../CustomMUI/Buttons/AddButtons/AddButton'
import AddButtonOutline from '../CustomMUI/Buttons/AddButtons/AddButtonOutline'

import DeleteButton from '../CustomMUI/Buttons/DeleteButtons/DeleteButton'

import EditButton from '../CustomMUI/Buttons/EditButtons/EditButton'
import EditButtonOutline from '../CustomMUI/Buttons/EditButtons/EditButtonOutline'

import FilterButton from '../CustomMUI/Buttons/FilterButtons/FilterButton'
import FilterButtonOutline from '../CustomMUI/Buttons/FilterButtons/FilterButtonOutline'

import RoundedTextBar from '../CustomMUI/RoundedTextBar'

function TeamControlBar() {

  const buttonHeight = '40px';

  return (
    <>
      <div className='team-control-bar'>
        <div>
          <RoundedTextBar placeholder='Filter by name' style={{marginRight: '8px', height: buttonHeight}}></RoundedTextBar>
          <FilterButtonOutline style={{height: buttonHeight}}>FILTER</FilterButtonOutline>
        </div>
        <AddButtonOutline style={{height: buttonHeight}}>ADD PERSON</AddButtonOutline>
        <EditButtonOutline style={{height: buttonHeight}}>EDIT TEAM</EditButtonOutline>
        <DeleteButton style={{height: buttonHeight}}>DELETE TEAM</DeleteButton>
      </div>
    </>
  )
}

export default TeamControlBar
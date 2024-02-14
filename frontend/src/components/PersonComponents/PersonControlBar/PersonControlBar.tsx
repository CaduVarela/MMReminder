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

function PersonControlBar() {

  const buttonHeight = '40px';

  return (
    <>
      <div className='person-control-bar'>
        <div>
          <RoundedTextBar placeholder='Filter by Team Name' style={{marginRight: '8px', height: buttonHeight}}></RoundedTextBar>
          <FilterButtonOutline style={{height: buttonHeight}}>FILTER</FilterButtonOutline>
        </div>
        <AddButtonOutline style={{height: buttonHeight}}>ADD TEAM</AddButtonOutline>
        <EditButtonOutline style={{height: buttonHeight}}>EDIT PERSON</EditButtonOutline>
        <DeleteButton style={{height: buttonHeight}}>DELETE PERSON</DeleteButton>
      </div>
    </>
  )
}

export default PersonControlBar
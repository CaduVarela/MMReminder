import AddButton from '../CustomMUI/AddButton'
import AddButtonOutline from '../CustomMUI/AddButtonOutline'
import DeleteButton from '../CustomMUI/DeleteButton'
import EditButton from '../CustomMUI/EditButton'
import EditButtonOutline from '../CustomMUI/EditButtonOutline'
import FilterButton from '../CustomMUI/FilterButton'
import FilterButtonOutline from '../CustomMUI/FilterButtonOutline'
import RoundedTextBar from '../CustomMUI/RoundedTextBar'
import './TeamControlBar.scss'

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
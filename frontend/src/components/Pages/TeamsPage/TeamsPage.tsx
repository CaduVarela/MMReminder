import './TeamsPage.scss'

import { useState } from 'react'
import palette from '@assets/styles/palette.module.scss'

// Components
import PagePanel from "../../Panel/PagePanel/PagePanel"
import RoundedTextBar from "../../CustomMUI/RoundedTextBar"
import FilterButton from '../../CustomMUI/Buttons/FilterButtons/FilterButton'
import AddButton from '../../CustomMUI/Buttons/AddButtons/AddButton'
import PanelHeader from '../../Panel/PanelHeader/PanelHeader'
import TeamCard from '../../TeamsComponents/TeamCard/TeamCard'
import PanelBody from '../../Panel/PanelBody/PanelBody'
import PanelFooter from '../../Panel/PanelFooter/PanelFooter'

// Icons
import GroupsIcon from '@mui/icons-material/Groups';

// MUI
import { Pagination } from '@mui/material'
import AddButtonOutline from '../../CustomMUI/Buttons/AddButtons/AddButtonOutline'
import FilterButtonOutline from '../../CustomMUI/Buttons/FilterButtons/FilterButtonOutline'
import PopupModal from '../../Popups/PopupModal'
import PopupAddNewTeam from '../../Popups/PopupForms/Team/PopupAddNewTeam/PopupAddNewTeam'

function TeamsPage() {

  const [filterText, setFilterText] = useState("")
  
  // Teams Pagination
  const [TeamsPage, setTeamsPage] = useState(1)
  const [teamsPageCount, setTeamsPageCount] = useState(5)

  const handleTeamsPageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setTeamsPage(newPage)
  }

  // Button Events
  const [showAddTeam, setShowAddTeam] = useState(false)
  const handleAddTeam = () => {
    setShowAddTeam(prevState => !prevState)
  }

  return (
    <PagePanel>

      <PopupModal
        open={showAddTeam}
        onClose={handleAddTeam}
      >
        <PopupAddNewTeam />
      </PopupModal>

      <PanelHeader>
        <GroupsIcon style={{ fontSize: '48px', color: palette.cardDarkColor }} />
        <div>
          <RoundedTextBar
            placeholder='Filter by Team Name'
            style={{ marginRight: '16px' }}
            onChange={(e) => setFilterText(e.target.value)}>
          </RoundedTextBar>
          <FilterButton>FILTER</FilterButton>
        </div>
        <AddButtonOutline onClick={handleAddTeam}>ADD TEAM</AddButtonOutline>
      </PanelHeader>

      <PanelBody>
        <TeamCard id={1} teamName='New Team' />
        <TeamCard id={2} teamName='New Team' />
        <TeamCard id={3} teamName='New Team' />
        <TeamCard id={4} teamName='New Team' />
        <TeamCard id={5} teamName='New Team' />
        <TeamCard id={6} teamName='New Team' />
        <TeamCard id={7} teamName='New Team' />
        <TeamCard id={8} teamName='New Team' />
      </PanelBody>

      <PanelFooter>
        <Pagination count={teamsPageCount} page={TeamsPage} onChange={handleTeamsPageChange} />
      </PanelFooter>

    </PagePanel>
  )
}

export default TeamsPage
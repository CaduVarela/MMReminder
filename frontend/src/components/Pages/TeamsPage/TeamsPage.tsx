import './TeamPage.scss'

import { useState } from 'react'

import palette from './../../../assets/styles/palette.module.scss'

// Components
import PagePanel from "../../Panel/PagePanel/PagePanel"
import RoundedTextBar from "../../CustomMUI/RoundedTextBar"
import FilterButton from '../../CustomMUI/FilterButton'
import AddButton from '../../CustomMUI/AddButton'
import PanelHeader from '../../Panel/PanelHeader/PanelHeader'
import TeamCard from '../../TeamCard/TeamCard'
import PanelBody from '../../Panel/PanelBody/PanelBody'

// Icons
import GroupsIcon from '@mui/icons-material/Groups';
import AddButtonOutline from '../../CustomMUI/AddButtonOutline'
import FilterButtonOutline from '../../CustomMUI/FilterButtonOutline'


function TeamsPage() {

  const [filterText, setFilterText] = useState("")

  return (
    <PagePanel>
      <PanelHeader>
        {/* <h1>Teams List</h1> */}
        <GroupsIcon style={{ fontSize: '48px', color: palette.cardDarkColor }} />
        <div>
          <RoundedTextBar
            placeholder='Filter by Team Name'
            style={{ marginRight: '16px' }}
            onChange={(e) => setFilterText(e.target.value)}>
          </RoundedTextBar>
          <FilterButton>FILTER</FilterButton>
        </div>
        <AddButtonOutline>ADD TEAM</AddButtonOutline>
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

    </PagePanel>
  )
}

export default TeamsPage
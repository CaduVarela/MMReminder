import './PersonsPage.scss'

import { useState } from 'react'
import palette from '@assets/styles/palette.module.scss'

// Components
import PagePanel from "../../Panel/PagePanel/PagePanel"
import RoundedTextBar from "../../CustomMUI/RoundedTextBar"
import PanelHeader from '../../Panel/PanelHeader/PanelHeader'
import PersonCard from '../../PersonComponents/PersonCard/PersonCard'
import PanelBody from '../../Panel/PanelBody/PanelBody'
import PanelFooter from '../../Panel/PanelFooter/PanelFooter'

// Icons
import PersonIcon from '@mui/icons-material/Person';

// MUI
import AddButton from '../../CustomMUI/Buttons/AddButtons/AddButton'
import AddButtonOutline from '../../CustomMUI/Buttons/AddButtons/AddButtonOutline'
import FilterButton from '../../CustomMUI/Buttons/FilterButtons/FilterButton'
import FilterButtonOutline from '../../CustomMUI/Buttons/FilterButtons/FilterButtonOutline'
import { Pagination } from '@mui/material'


function PersonsPage() {

  const [filterText, setFilterText] = useState("")

  // Persons Pagination
  const [personsPage, setPersonsPage] = useState(0)
  const [personsPageCount, setPersonsPageCount] = useState(5)

  const handlePersonsPageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPersonsPage(newPage)
  }

  return (
    <PagePanel>
      <PanelHeader>
        {/* <h1>Teams List</h1> */}
        <PersonIcon style={{ fontSize: '48px', color: palette.cardDarkColor }} />
        <div>
          <RoundedTextBar
            placeholder='Filter by Person Name'
            style={{ marginRight: '16px' }}
            onChange={(e) => setFilterText(e.target.value)}>
          </RoundedTextBar>
          <FilterButton>FILTER</FilterButton>
        </div>
        <AddButtonOutline>ADD PERSON</AddButtonOutline>
      </PanelHeader>

      <PanelBody>
        <PersonCard
          id={1}
          personName='Billy Jobbson'
          personEmail='billson@gmail.com'
          personPhone='(42)12345-6789'
        />
      </PanelBody>

      <PanelFooter>
        <Pagination
          count={personsPageCount}
          page={personsPage}
          onChange={handlePersonsPageChange}
          style={{ maxHeight: 40 }}
        />
      </PanelFooter>

    </PagePanel>
  )
}

export default PersonsPage
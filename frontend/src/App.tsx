import './App.scss'

import { useState } from 'react'

// Components
import { TeamsPage } from './components/TeamsPage/TeamsPage'
import { PersonsPage } from './components/PersonsPage/PersonsPage'
import { Header } from './components/Header/Header'

// Redux
import { useSelector } from 'react-redux'
import { stateType } from './store/slice'

// Palette
import palette from './assets/styles/palette.module.scss'


import AddButton from './components/CustomMUI/AddButton'
import EditButton from './components/CustomMUI/EditButton'
import DeleteButton from './components/CustomMUI/DeleteButton'
import FilterButton from './components/CustomMUI/FilterButton'

function App() {

  const tab = useSelector((state: stateType) => state.tab.tab)

  return (
    <main>
      <Header/>

      <div className='background'></div>

      <AddButton>ADD</AddButton>
      <EditButton>EDIT</EditButton>
      <DeleteButton>DELETE</DeleteButton>
      <FilterButton>FILTER</FilterButton>

      {tab === "teams" && <TeamsPage/>}
      {tab === "persons" && <PersonsPage/>}
    </main>
  )
}

export default App
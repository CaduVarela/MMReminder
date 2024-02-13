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

function App() {

  const tab = useSelector((state: stateType) => state.tab.tab)

  return (
    <main>
      <Header/>

      <div className='background'></div>

      {/* {tab === "teams" && <TeamsPage/>} */}
      {/* {tab === "persons" && <PersonsPage/>} */}
    </main>
  )
}

export default App
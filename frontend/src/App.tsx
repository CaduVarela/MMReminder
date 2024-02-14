import './App.scss'

// import { useState } from 'react'

// Components
import TeamsPage from './components/Pages/TeamsPage/TeamsPage'
import PersonsPage from './components/Pages/PersonsPage/PersonsPage'
import SiteHeader from './components/SiteHeader/SiteHeader'
import SiteBody from './components/SiteBody/SiteBody'

// Redux
import { useSelector } from 'react-redux'
import { stateType } from './store/slice'

// Palette
// import palette from './assets/styles/palette.module.scss'



function App() {

  const tab = useSelector((state: stateType) => state.tab.tab)

  return (
    <main>
      <SiteHeader />

      <div className='background'></div>

      <SiteBody>
        {tab === "teams" && <TeamsPage />}
        {tab === "persons" && <PersonsPage />}
      </SiteBody>
    </main>
  )
}

export default App
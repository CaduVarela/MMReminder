import './App.scss'

// Pages
import TeamsPage from './Pages/TeamsPage/TeamsPage'
import PersonsPage from './Pages/PersonsPage/PersonsPage'

// Components
import SiteHeader from './components/SiteMainComponents/SiteHeader/SiteHeader'
import SiteBody from './components/SiteMainComponents/SiteBody/SiteBody'

// Redux
import { useSelector } from 'react-redux'
import { stateType } from './store/slice'

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
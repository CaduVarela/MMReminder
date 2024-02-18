import './App.scss'

// Pages
import TeamsPage from './Pages/TeamsPage/TeamsPage'
import PersonsPage from './Pages/PersonsPage/PersonsPage'

// Components
import SiteHeader from './components/SiteMainComponents/SiteHeader/SiteHeader'
import SiteBody from './components/SiteMainComponents/SiteBody/SiteBody'
import PopupAlert from './components/PopupAlert/PopupAlert'

// Redux
import { useSelector } from 'react-redux'
import { TabType } from './store/tabSlice'
import { AlertType } from './store/alertSlice'
import { useEffect } from 'react'

function App() {

  const tab = useSelector((state: TabType) => state.tab.tab)
  const alert = useSelector((state: AlertType) => state.alert?.alert)

  return (
    <main>
      <SiteHeader />

      {alert?.autoHideDuration as number > 0 &&
        <PopupAlert
          severity={alert?.severity}
          text={alert?.text}
          autoHideDuration={alert?.autoHideDuration}
          variant="standard"
        />
      }

      <div className='background'></div>
      <SiteBody>
        {tab === "teams" && <TeamsPage />}
        {tab === "persons" && <PersonsPage />}
      </SiteBody>

    </main>
  )
}

export default App
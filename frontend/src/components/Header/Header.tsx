import './Header.scss'

import { useDispatch, useSelector } from 'react-redux'
import { changeTab, stateType } from './../../store/slice'

import palette from './../../assets/styles/palette.module.scss'
import HeaderButton from '../CustomMUI/HeaderButton'

export function Header() {

  const dispatch = useDispatch()

  const tab = useSelector((state: stateType) => state.tab.tab)

  const handleTabChange = (newTab: "teams" | "persons") => {
    dispatch(changeTab(newTab))
  }

  return (
    <>
      <header>
        <div className='top-section'>
          <h1>MM <span className='italic'>Reminder</span></h1>
        </div>
        <div className='bottom-section'>
          <HeaderButton
            variant='contained'
            onClick={() => handleTabChange("teams")}
            style={tab === "teams" ? { backgroundColor: palette.themeColorDark } : {}}
          >Teams</HeaderButton>
          <HeaderButton
            variant='contained'
            onClick={() => handleTabChange("persons")}
            style={tab === "persons" ? { backgroundColor: palette.themeColorDark } : {}}
          >Persons</HeaderButton>
        </div>
      </header>
    </>
  )
}
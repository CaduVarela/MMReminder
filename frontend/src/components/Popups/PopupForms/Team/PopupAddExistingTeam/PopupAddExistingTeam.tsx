import './../../PopupFormComumStyles.scss'
import './PopupAddExistingTeam.scss'

import { FormEvent, useState } from 'react'

import PopupBox from '../../../PopupBox'
import RoundedTextBar from '../../../../CustomMUI/RoundedTextBar'
import FilterButton from '../../../../CustomMUI/Buttons/FilterButtons/FilterButton'
import { Pagination } from '@mui/material'

function PopupAddExistingTeam() {

  const [selectedPersonID, setSelectedPersonID] = useState(-1)

  const [filterText, setFilterText] = useState('')
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value)
  }

  function createData(
    id: number,
    name: string
  ) {
    return { id, name };
  }

  const rows = [
    createData(0, 'Sample Team 1'),
    createData(1, 'Sample Team 2'),
    createData(2, 'Sample Team 3'),
    createData(3, 'Sample Team 4'),
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // @todo: code proper action
  }

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add New Person
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='search-group'>
            <RoundedTextBar placeholder='Search team by name' onChange={handleFilterChange}></RoundedTextBar>
            <FilterButton>SEARCH</FilterButton>
          </div>
          <div>
            {rows.map((row) => (
              <div key={row.id} onClick={() => { setSelectedPersonID(row.id) }} className='data-row'>
                <h1>{row.name}</h1>
              </div>
            ))}
          </div>
        </form>
        <div className='pagination'>
          <Pagination />
        </div>
      </div>
    </PopupBox>
  )
}

export default PopupAddExistingTeam
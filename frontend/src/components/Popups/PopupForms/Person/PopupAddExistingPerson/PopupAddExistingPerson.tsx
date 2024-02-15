import './../../PopupFormComumStyles.scss'
import './PopupAddExistingPerson.scss'

import { FormEvent, useState } from 'react'

import PopupBox from '../../../PopupBox'
import RoundedTextBar from '../../../../CustomMUI/RoundedTextBar'
import FilterButton from '../../../../CustomMUI/Buttons/FilterButtons/FilterButton'
import { Pagination } from '@mui/material'

function PopupAddExistingPerson() {

  const [selectedPersonID, setSelectedPersonID] = useState(-1)

  const [filterText, setFilterText] = useState('')
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // @todo: code proper action
  }

  function createData(
    id: number,
    name: string,
    email: string,
    phone?: string
  ) {
    return { id, name, email, phone };
  }

  const rows = [
    createData(0, 'Sample Person', 'sample@person.com', '(42)12345-6789'),
    createData(0, 'Sample Person', 'sample@person.com', '(42)12345-6789'),
    createData(0, 'Sample Person', 'sample@person.com', '(42)12345-6789')
  ]

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add Existing Person
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='search-group'>
            <RoundedTextBar placeholder='Search person by name' onChange={handleFilterChange}></RoundedTextBar>
            <FilterButton>SEARCH</FilterButton>
          </div>
          <div>
            {rows.map((row) => (
              <div key={row.id} onClick={() => { setSelectedPersonID(row.id) }} className='data-row'>
                <h1>{row.name}</h1>
                <p>{row.email} {row.phone ? `| ${row.phone}` : ''}</p>
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

export default PopupAddExistingPerson
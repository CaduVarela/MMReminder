import './../../PopupFormComumStyles.scss'
import './PopupAddExistingPerson.scss'

import { FormEvent, useEffect, useState } from 'react'

import PopupBox from '../../../PopupBox'
import RoundedTextBar from '../../../../CustomMUI/RoundedTextBar'
import FilterButton from '../../../../CustomMUI/Buttons/FilterButtons/FilterButton'
import { Pagination } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PersonType, TeamType } from '@/assets/types/BackendTypes'

function PopupAddExistingPerson({ team, handleClose }: { team: TeamType, handleClose: Function }) {

  const [selectedPerson, setSelectedPerson] = useState<PersonType>({
    name: '',
    email: '',
  } as PersonType)

  // Persons Pagination
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>()
  const rowsPerPage = 3

  const handlePersonsPageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const [filterText, setFilterText] = useState('')
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value)
  }

  

  const teamMutation = useMutation({
    mutationKey: ["add-person-to-team"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/team/${team.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "$connect": {
            persons: [selectedPerson.id]
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    teamMutation.mutate()

    // queryClient.resetQueries()
    handleClose()
  }

  // Data Fetch
  const { data: persons, isLoading, refetch } = useQuery({
    queryKey: ["existing-persons-list", page],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/person?page=${page - 1}&take=${rowsPerPage}&name=${filterText}`)
        .then((res) => res.json())
    }
  })

  useEffect(() => {
    if (isLoading === false)
      setPageCount(Math.ceil(persons.pagination.count / rowsPerPage))
  }, [persons?.pagination.count])

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
            {persons?.data.map((person: PersonType) => (
              <button key={person.id} onClick={() => { setSelectedPerson(person) }} type='submit' className='data-row'>
                <h1>{person.name}</h1>
                <p>{person.email} {person.phone ? `| ${person.phone}` : ''}</p>
              </button>
            ))}
          </div>
        </form>
        <div className='pagination'>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePersonsPageChange}
            style={{ maxHeight: 40 }}
          />
        </div>
      </div>
    </PopupBox>
  )
}

export default PopupAddExistingPerson
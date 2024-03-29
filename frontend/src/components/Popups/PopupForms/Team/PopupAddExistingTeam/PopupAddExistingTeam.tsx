import './../../PopupFormComumStyles.scss'
import './PopupAddExistingTeam.scss'

import { FormEvent, useEffect, useState } from 'react'

import PopupBox from '../../../PopupBox'
import RoundedTextBar from '../../../../CustomMUI/RoundedTextBar'
import FilterButton from '../../../../CustomMUI/Buttons/FilterButtons/FilterButton'
import { Pagination } from '@mui/material'
import { PersonType, TeamType } from '@/assets/types/BackendTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import StyledCircularProgress from '@/components/CustomMUI/StyledCircularProgress'
import PopupAlert from '@/components/PopupAlert/PopupAlert'
import { setAlert } from '@/store/alertSlice'
import { useDispatch } from 'react-redux'

function PopupAddExistingTeam({ person, handleClose }: { person: PersonType, handleClose: Function }) {

  const [selectedTeam, setSelectedTeam] = useState<TeamType>({
    id: -1,
    name: ''
  } as TeamType)

  // Persons Pagination
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>()
  const rowsPerPage = 3

  const handleTeamsPageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

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

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const teamMutation = useMutation({
    mutationKey: ["add-team-to-person"],
    mutationFn: async () => {
      return await fetch(`http://localhost:3000/api/person/${person.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "$connect": {
            teams: [selectedTeam.id]
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["persons"]
      })
      queryClient.refetchQueries({
        queryKey: ["teams"]
      })
      dispatch(setAlert({
        text: "Team added successfully!",
        severity: "success",
        autoHideDuration: 3000
      }))
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let alreadyOnTeam = false
    person.teams.map((value) => {
      if (value.id === selectedTeam.id) {
        dispatch(setAlert({
          text: "This team already have this person!",
          severity: "warning",
          autoHideDuration: 3000
        }))
        alreadyOnTeam = true
      }
    })

    if (alreadyOnTeam) { return }

    teamMutation.mutate()

    handleClose()
  }

  // Data Fetch
  const { data: teams, isLoading, refetch } = useQuery({
    queryKey: ["existing-teams-list", page],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/team?page=${page - 1}&take=${rowsPerPage}&name=${filterText}`)
        .then((res) => res.json())
    }
  })

  useEffect(() => {
    if (isLoading === false)
      setPageCount(Math.ceil(teams.pagination.count / rowsPerPage))
  }, [teams?.pagination.count])

  return (
    <PopupBox>
      <div className='content-wrapper'>
        <h1>
          Add Existing Team
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='search-group'>
            <RoundedTextBar placeholder='Search team by name' onChange={handleFilterChange}></RoundedTextBar>
            <FilterButton onClick={() => refetch()}>SEARCH</FilterButton>
          </div>
          <div>
            {teams?.data.map((team: TeamType) => (
              <button key={team.id} onClick={() => { setSelectedTeam(team) }} className='data-row' type='submit'>
                <h1>{team.name}</h1>
              </button>
            ))}
            {isLoading && <div className='full-center'> <StyledCircularProgress /> </div>}
            {teams?.pagination.count < 1 && <div className='full-center'>No persons found</div>}
          </div>
        </form>
        <div className='pagination'>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleTeamsPageChange}
            style={{ maxHeight: 40 }}
          />
        </div>
      </div>
    </PopupBox>
  )
}

export default PopupAddExistingTeam
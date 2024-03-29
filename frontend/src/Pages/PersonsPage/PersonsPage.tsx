import './PersonsPage.scss'

import { useEffect, useState } from 'react'
import palette from '@assets/styles/palette.module.scss'

import { useQuery } from '@tanstack/react-query'
import { PersonType } from '@/assets/types/BackendTypes'

// MUI
import { Pagination } from '@mui/material'
import AddButtonOutline from '@/components/CustomMUI/Buttons/AddButtons/AddButtonOutline'
import FilterButton from '@/components/CustomMUI/Buttons/FilterButtons/FilterButton'
import StyledCircularProgress from '@/components/CustomMUI/StyledCircularProgress'
import RoundedTextBar from '@/components/CustomMUI/RoundedTextBar';

// Icons
import PersonIcon from '@mui/icons-material/Person';

// Modal
import PopupAddNewPerson from '@/components/Popups/PopupForms/Person/PopupAddNewPerson/PopupAddNewPerson'
import PopupModal from '@/components/Popups/PopupModal'

// Components
import PanelHeader from '@/components/Panel/PanelHeader/PanelHeader';
import PagePanel from '@/components/Panel/PagePanel/PagePanel';
import PanelBody from '@/components/Panel/PanelBody/PanelBody';
import PanelFooter from '@/components/Panel/PanelFooter/PanelFooter';
import PersonCard from '@/components/PersonComponents/PersonCard/PersonCard';
import RefreshButtonOutline from '@/components/CustomMUI/Buttons/RefreshButtons/RefreshButtonOutline'

function PersonsPage() {

  const [filterText, setFilterText] = useState("")

  // Persons Pagination
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>()
  const rowsPerPage = 5

  const handlePersonsPageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Button Events
  const [showAddPerson, setShowAddPerson] = useState(false)
  const handleShowAddPerson = () => {
    setShowAddPerson(prevState => !prevState)
  }

  // Data Fetch
  const { data: persons, isLoading, refetch, isSuccess, isError } = useQuery({
    queryKey: ["persons", page],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/person?page=${page - 1}&take=${rowsPerPage}&name=${filterText}`)
        .then((res) => res.json())
    }
  })

  useEffect(() => {
    if (isLoading === false)
      setPageCount(Math.ceil(persons.pagination.count / rowsPerPage))
  }, [persons, isSuccess])

  return (
    <>
      <PopupModal
        open={showAddPerson}
        onClose={handleShowAddPerson}
      >
        <>
          <PopupAddNewPerson handleClose={handleShowAddPerson} />
        </>
      </PopupModal>

      <PagePanel>

        <PanelHeader>
          <PersonIcon style={{ fontSize: '48px', color: palette.cardDarkColor }} />
          <div>
            <RoundedTextBar
              placeholder='Filter by Person Name'
              style={{ marginRight: '16px', width: 280 }}
              onChange={(e) => setFilterText(e.target.value)}>
            </RoundedTextBar>
            <FilterButton onClick={() => refetch()}>FILTER</FilterButton>
          </div>
          <RefreshButtonOutline onClick={() => refetch()} style={{ width: 184 }}>REFRESH</RefreshButtonOutline>
          <AddButtonOutline onClick={handleShowAddPerson} style={{ width: 184 }}>ADD PERSON</AddButtonOutline>
        </PanelHeader>

        <PanelBody>
          {persons ? persons?.data.map((person: PersonType) => (
            <PersonCard
              key={person.id}
              person={person}
            />
          )) : isLoading && <div className='full-center'> <StyledCircularProgress /> </div>}
          {persons?.pagination.count <= 0 && <h1 className='no-persons-registered'> No persons found...</h1>}
          {isError && <h1 className='person-error-ocurred'>Sorry, an error has occurred :(</h1>}
        </PanelBody>

        <PanelFooter>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePersonsPageChange}
            style={{ maxHeight: 40 }}
          />
        </PanelFooter>

      </PagePanel>
    </>
  )
}

export default PersonsPage
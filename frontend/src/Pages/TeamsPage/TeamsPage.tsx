import './TeamsPage.scss'

import { useState, useEffect } from 'react'
import palette from '@assets/styles/palette.module.scss'

import { useQuery } from '@tanstack/react-query'
import { TeamType } from '@/assets/types/BackendTypes'

// MUI
import { Pagination } from '@mui/material'
import StyledCircularProgress from '@/components/CustomMUI/StyledCircularProgress'
import AddButtonOutline from '@/components/CustomMUI/Buttons/AddButtons/AddButtonOutline';
import FilterButton from '@/components/CustomMUI/Buttons/FilterButtons/FilterButton';
import RoundedTextBar from '@/components/CustomMUI/RoundedTextBar';

// Icons
import GroupsIcon from '@mui/icons-material/Groups';

// Modal
import PopupModal from '@/components/Popups/PopupModal';
import PopupAddNewTeam from '@/components/Popups/PopupForms/Team/PopupAddNewTeam/PopupAddNewTeam';

// Components
import PagePanel from '@/components/Panel/PagePanel/PagePanel';
import PanelBody from '@/components/Panel/PanelBody/PanelBody';
import PanelFooter from '@/components/Panel/PanelFooter/PanelFooter';
import PanelHeader from '@/components/Panel/PanelHeader/PanelHeader';
import TeamCard from '@/components/TeamsComponents/TeamCard/TeamCard';

function TeamsPage() {

  const [filterText, setFilterText] = useState("")

  // Teams Pagination
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>()
  const rowsPerPage = 5

  const handleTeamsPageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Button Events
  const [showAddTeam, setShowAddTeam] = useState(false)
  const handleShowAddTeam = () => {
    setShowAddTeam(prevState => !prevState)
  }

  // Data Fetch
  const { data: teams, isLoading, refetch } = useQuery({
    queryKey: ["teams", page],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/team?page=${page - 1}&take=${rowsPerPage}&name=${filterText}`)
        .then((res) => res.json())
    }
  })

  useEffect(() => {
    if (isLoading === false)
      setPageCount(Math.ceil(teams.pagination.count / rowsPerPage))
  }, [teams])

  return (
    <>
      <PopupModal
        open={showAddTeam}
        onClose={handleShowAddTeam}
      >
        <>
          <PopupAddNewTeam handleClose={handleShowAddTeam}/>
        </>
      </PopupModal>

      <PagePanel>

        <PanelHeader>
          <GroupsIcon style={{ fontSize: '48px', color: palette.cardDarkColor }} />
          <div>
            <RoundedTextBar
              placeholder='Filter by Team Name'
              style={{ marginRight: '16px' }}
              onChange={(e) => setFilterText(e.target.value)}>
            </RoundedTextBar>
            <FilterButton onClick={() => refetch()}>FILTER</FilterButton>
          </div>
          <AddButtonOutline onClick={handleShowAddTeam}>ADD TEAM</AddButtonOutline>
        </PanelHeader>

        <PanelBody>
          {teams ? teams.data.map((team : TeamType) => (
            <TeamCard
              key={team.id}
              team={team}
            />
          )) : isLoading ? <div className='full-center'> <StyledCircularProgress /> </div>
           : <h1 className='no-teams-registered'> No teams registered yet...</h1>}
        </PanelBody>

        <PanelFooter>
          <Pagination count={pageCount} page={page} onChange={handleTeamsPageChange} />
        </PanelFooter>

      </PagePanel>
    </>
  )
}

export default TeamsPage
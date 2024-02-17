import { useEffect, useState } from 'react';
import './TeamCard.scss'

import PersonIcon from '@mui/icons-material/Person';
import TeamControlBar from '../TeamControlBar/TeamControlBar';

import { TeamType } from '@assets/types/BackendTypes';
import TeamPersonsTable from '../TeamPersonsTable/TeamPersonsTable';

function TeamCard({ team }: { team: TeamType }) {

  const personCount = team.persons ? Object.keys(team.persons).length : 0
  const [filterText, setFilterText] = useState('')

  // Page Behavior Manipulation
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <div className='team-card' onClick={() => setIsOpened(!isOpened)}>
        <h1>{team.name}</h1>
        <div className='person-counter'>
          <PersonIcon style={{ fontSize: '32px' }} />
          <span style={{ width: 32, marginLeft: 8 }}>{personCount}</span>
        </div>
      </div>
      {isOpened &&
        <div className='team-card-opened-content'>
          <TeamControlBar team={team} setFilterText={setFilterText} />

          {personCount > 0 ?
            <TeamPersonsTable key={team.id + team.name + team.persons} team={team} filter={filterText} />
            : <p className='no-persons-yet'> no persons in this team yet... </p>
          }

        </div>
      }
    </>
  )
}

export default TeamCard
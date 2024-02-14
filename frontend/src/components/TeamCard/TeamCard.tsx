import { useState } from 'react';
import './TeamCard.scss'

import PersonIcon from '@mui/icons-material/Person';
import TeamControlBar from '../TeamControlBar/TeamControlBar';

function TeamCard(
  {
    id,
    teamName
  }:
    {
      id: number,
      teamName?: string
    }) {

  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <div className='team-card' onClick={() => setIsOpened(!isOpened)}>
        <h1>{teamName}</h1>
        <div className='person-counter'>
          <PersonIcon style={{ fontSize: '32px' }} />
          <span>0</span>
        </div>
      </div>
      {isOpened &&
        <div>
          <TeamControlBar />
        </div>
      }
    </>
  )
}

export default TeamCard
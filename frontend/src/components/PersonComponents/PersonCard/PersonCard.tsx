import './PersonCard.scss'
import { useState } from 'react';

import GroupsIcon from '@mui/icons-material/Groups';

import PersonControlBar from '../PersonControlBar/PersonControlBar';
import { PersonType, TeamType } from '@/assets/types/BackendTypes';
import PersonTeamsTable from '../PersonTeamsTable/PersonTeamsTable';

function PersonCard({ person }: { person: PersonType }) {

  const personCount = person.teams ? Object.keys(person.teams).length : 0

  // Page Behavior Manipulation
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <div className='person-card' onClick={() => setIsOpened(!isOpened)}>
        <div className='person-info'>
          <h1>{person.name}</h1>
          <p>{person.email} {person.phone ? `| ${person.phone}` : ''}</p>
        </div>
        <div className='person-counter'>
          <GroupsIcon style={{ fontSize: '32px' }} />
          <span style={{ width: 32, marginLeft: 8 }}>{personCount}</span>
        </div>
      </div>
      {isOpened &&
        <div className='person-card-opened-content'>
          <PersonControlBar person={person} />

          {personCount > 0 ?
            <PersonTeamsTable person={person} />
            : <p className='no-teams-yet'> this person is not on any team yet... </p>
          }

        </div>
      }
    </>
  )
}

export default PersonCard
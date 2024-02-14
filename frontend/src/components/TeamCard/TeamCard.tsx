import { useState } from 'react';
import './TeamCard.scss'

import PersonIcon from '@mui/icons-material/Person';
import TeamControlBar from '../TeamControlBar/TeamControlBar';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      }
    </>
  )
}

export default TeamCard
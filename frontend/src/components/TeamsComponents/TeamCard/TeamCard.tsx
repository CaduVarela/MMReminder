import { useState } from 'react';
import './TeamCard.scss'
import palette from '@assets/styles/palette.module.scss';

import PersonIcon from '@mui/icons-material/Person';
import TeamControlBar from '../TeamControlBar/TeamControlBar';

//
import EditButtonOutline from '../../CustomMUI/Buttons/EditButtons/EditButtonOutline';
import DeleteButton from '../../CustomMUI/Buttons/DeleteButtons/DeleteButton';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import StyledTableContainer from '../../CustomMUI/TableComponents/StyledTableContainer';
import StyledHeadTableCell from '../../CustomMUI/TableComponents/StyledHeadTableCell';
import StyledBodyTableCell from '../../CustomMUI/TableComponents/StyledBodyTableCell';
import StyledTableRow from '../../CustomMUI/TableComponents/StyledTableRow';
import StyledTablePagination from '../../CustomMUI/TableComponents/StyledTablePagination';

function TeamCard(
  {
    id,
    teamName
  }:
    {
      id: number,
      teamName?: string
    }) {


  // Page Behavior Manipulation
  const [isOpened, setIsOpened] = useState(false)

  // Data Manipulation
  function createData(
    name: string,
    email: string,
    phone: string,
    options: React.ReactNode
  ) {
    return { name, email, phone, options };
  }

  const options = <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0 8px' }}>
    <EditButtonOutline size='small' style={{ height: 32 }}>EDIT</EditButtonOutline>
    {/* <DeleteButton size='small' style={{ height: 32, padding: '0 6px 0 16px' }}></DeleteButton> */}
    <DeleteButton size='small'style={{ height: 32 }}>DEL</DeleteButton>
  </div>

  const rows = [
    createData('Josezinho da Silva', 'josereidelas@gmail.com', '(42)12345-6789', options),
    createData('Abelhijhonsson', 'abelhi@gmail.com', '(42)12345-6789', options),
    createData('Josezinho da Silva', 'josereidelas@gmail.com', '(42)12345-6789', options),
    createData('Josezinho da Silva', 'josereidelas@gmail.com', '(42)12345-6789', options),
  ];

  // Table Manipulation

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

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
        <div className='opened-content'>
          <TeamControlBar />

          <StyledTableContainer
            sx={{
              width: '95%',
              margin: '8px auto 0',
            }}>
            <Table size='small'>
              <TableHead sx={{ height: 48 }}>
                <TableRow >
                  <StyledHeadTableCell>Name</StyledHeadTableCell>
                  <StyledHeadTableCell>Email</StyledHeadTableCell>
                  <StyledHeadTableCell>Phone</StyledHeadTableCell>
                  <StyledHeadTableCell>Options</StyledHeadTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name} sx={{}}>
                    <StyledBodyTableCell>{row.name}</StyledBodyTableCell>
                    <StyledBodyTableCell>{row.email}</StyledBodyTableCell>
                    <StyledBodyTableCell>{row.phone}</StyledBodyTableCell>
                    <StyledBodyTableCell>{row.options}</StyledBodyTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <StyledTablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

            colSpan={4}
          />
        </div>
      }
    </>
  )
}

export default TeamCard
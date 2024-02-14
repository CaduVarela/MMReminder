import { useState } from 'react';
import './PersonCard.scss'
import palette from '@assets/styles/palette.module.scss';

import PersonIcon from '@mui/icons-material/Person';

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
import PersonControlBar from '../PersonControlBar/PersonControlBar';

function PersonCard(
  {
    id,
    personName = '',
    personEmail = '',
    personPhone = '',
  }:
    {
      id: number,
      personName?: string,
      personEmail?: string,
      personPhone?: string,
    }) {


  // Page Behavior Manipulation
  const [isOpened, setIsOpened] = useState(false)

  // Table Data Manipulation
  function createData(
    name: string,
    options: React.ReactNode
  ) {
    return { name, options };
  }

  const options = <div style={{ display: 'flex', justifyContent: 'left', gap: '0 8px' }}>
    <DeleteButton size='small' style={{ height: 32 }}>REMOVE</DeleteButton>
  </div>

  const rows = [
    createData('Sample Team 1', options),
    createData('Sample Team 2', options),
  ]

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
      <div className='person-card' onClick={() => setIsOpened(!isOpened)}>
        <div className='person-info'>
          <h1>{personName}</h1>
          <p>{personEmail} | {personPhone}</p>
        </div>
        <div className='person-counter'>
          <PersonIcon style={{ fontSize: '32px' }} />
          <span>0</span>
        </div>
      </div>
      {isOpened &&
        <div className='opened-content'>
          <PersonControlBar />

          <StyledTableContainer
            sx={{
              width: '95%',
              margin: '8px auto 0',
            }}>
            <Table size='small'>
              <TableHead sx={{ height: 48 }}>
                <TableRow >
                  <StyledHeadTableCell>Team Name</StyledHeadTableCell>
                  <StyledHeadTableCell sx={{ width: '21%' }}>Options</StyledHeadTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name} sx={{}}>
                    <StyledBodyTableCell>{row.name}</StyledBodyTableCell>
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

export default PersonCard
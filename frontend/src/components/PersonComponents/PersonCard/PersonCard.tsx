import './PersonCard.scss'
import { useState } from 'react';
import palette from '@assets/styles/palette.module.scss';

import PersonIcon from '@mui/icons-material/Person';

//
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
import PopupModal from '../../Popups/PopupModal';
import PopupRemovePersonFromTeam from '../../Popups/PopupForms/PopupRemovePersonFromTeam/PopupRemovePersonFromTeam';
import { TableFooter } from '@mui/material';

function PersonCard(
  {
    personID,
    personName = '',
    personEmail = '',
    personPhone = '',
  }:
    {
      personID: number,
      personName?: string,
      personEmail?: string,
      personPhone?: string,
    }) {


  // Page Behavior Manipulation
  const [isOpened, setIsOpened] = useState(false)

  // Table Data Manipulation
  function createData(
    id: number,
    name: string,
  ) {
    return { id, name };
  }

  const rows = [
    createData(0, 'Sample Team 1'),
    createData(1, 'Sample Team 2'),
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

  // Popup
  const [targetTeam, setTargetTeam] = useState({
    id: -1,
    name: ''
  })

  const [showRemovePersonFromTeam, setShowRemovePersonFromTeam] = useState(false)
  const handleShowRemovePersonFromTeam = () => {
    setShowRemovePersonFromTeam(prevState => !prevState)
  }

  return (
    <>
      <PopupModal
        open={showRemovePersonFromTeam}
        onClose={handleShowRemovePersonFromTeam}
      >
        <>
          <PopupRemovePersonFromTeam personID={personID} personName={personName} teamID={targetTeam.id} teamName={targetTeam.name} />
        </>
      </PopupModal>

      <div className='person-card' onClick={() => setIsOpened(!isOpened)}>
        <div className='person-info'>
          <h1>{personName}</h1>
          <p>{personEmail} {personPhone ? `| ${personPhone}` : ''}</p>
        </div>
        <div className='person-counter'>
          <PersonIcon style={{ fontSize: '32px' }} />
          <span>0</span>
        </div>
      </div>
      {isOpened &&
        <div className='person-card-opened-content'>
          <PersonControlBar personID={personID} personName={personName} personEmail={personEmail} personPhone={personPhone} />

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
                  <StyledTableRow key={row.id}>
                    <StyledBodyTableCell>{row.name}</StyledBodyTableCell>
                    <StyledBodyTableCell>
                      <div style={{ display: 'flex', justifyContent: 'left', gap: '0 8px' }}>
                        <DeleteButton size='small' style={{ height: 32 }} onClick={() => {
                          setTargetTeam({
                            id: row.id,
                            name: row.name
                          })
                          handleShowRemovePersonFromTeam()
                        }}>REMOVE</DeleteButton>
                      </div>
                    </StyledBodyTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <StyledTablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </StyledTableContainer>
        </div>
      }
    </>
  )
}

export default PersonCard
import { useState } from 'react';
import './TeamCard.scss'

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
import PopupModal from '../../Popups/PopupModal';
import PopupRemovePersonFromTeam from '../../Popups/PopupForms/PopupRemovePersonFromTeam/PopupRemovePersonFromTeam';
import PopupEditPerson from '../../Popups/PopupForms/Person/PopupEditPerson/PopupEditPerson';
import { TableFooter } from '@mui/material';

function TeamCard(
  {
    teamID,
    teamName = ''
  }:
    {
      teamID: number,
      teamName: string
    }) {


  // Page Behavior Manipulation
  const [isOpened, setIsOpened] = useState(false)

  // Data Manipulation
  function createData(
    id: number,
    name: string,
    email: string,
    phone: string,
  ) {
    return { id, name, email, phone };
  }

  const rows = [
    createData(0, 'Josezinho da Silva', 'josereidelas@gmail.com', '(42)12345-6789'),
    createData(1, 'Abelhijhonsson', 'abelhi@gmail.com', '(42)12345-6789'),
    createData(2, 'Josezinho da Silva', 'josereidelas@gmail.com', '(42)12345-6789'),
    createData(3, 'Josezinho da Silva', 'josereidelas@gmail.com', '(42)12345-6789'),
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

  // Popup
  const [targetPerson, setTargetPerson] = useState({
    id: -1,
    name: '',
    email: '',
    phone: ''
  })

  const [showRemovePersonFromTeam, setShowRemovePersonFromTeam] = useState(false)
  const handleShowRemovePersonFromTeam = () => {
    setShowRemovePersonFromTeam(prevState => !prevState)
  }

  const [showEditPerson, setShowEditPerson] = useState(false)
  const handleShowEditPerson = () => {
    setShowEditPerson(prevState => !prevState)
  }

  return (
    <>
      <PopupModal
        open={showRemovePersonFromTeam}
        onClose={handleShowRemovePersonFromTeam}
      >
        <>
          <PopupRemovePersonFromTeam personID={targetPerson.id} personName={targetPerson.name} teamID={teamID} teamName={teamName} />
        </>
      </PopupModal>

      <PopupModal
        open={showEditPerson}
        onClose={handleShowEditPerson}
      >
        <>
          <PopupEditPerson personID={targetPerson.id} personName={targetPerson.name} personEmail={targetPerson.email} personPhone={targetPerson.phone} />
        </>
      </PopupModal>

      <div className='team-card' onClick={() => setIsOpened(!isOpened)}>
        <h1>{teamName}</h1>
        <div className='person-counter'>
          <PersonIcon style={{ fontSize: '32px' }} />
          <span>0</span>
        </div>
      </div>
      {isOpened &&
        <div className='team-card-opened-content'>
          <TeamControlBar teamID={teamID} teamName={teamName} />

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
                  <StyledTableRow key={row.id}>
                    <StyledBodyTableCell>{row.name}</StyledBodyTableCell>
                    <StyledBodyTableCell>{row.email}</StyledBodyTableCell>
                    <StyledBodyTableCell>{row.phone}</StyledBodyTableCell>
                    <StyledBodyTableCell>
                      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0 8px' }}>
                        <EditButtonOutline size='small' style={{ height: 32 }} onClick={() => {
                          setTargetPerson({
                            id: row.id,
                            name: row.name,
                            email: row.email,
                            phone: row.phone + '',
                          })
                          handleShowEditPerson()
                        }}>EDIT</EditButtonOutline>
                        <DeleteButton size='small' style={{ height: 32 }} onClick={() => {
                          setTargetPerson({
                            id: row.id,
                            name: row.name,
                            email: row.email,
                            phone: row.phone + ''
                          })
                          handleShowRemovePersonFromTeam()
                        }}>DEL</DeleteButton>
                      </div>
                    </StyledBodyTableCell>
                  </StyledTableRow>
                ))}

              </TableBody>
              <TableFooter style={{ height: 24 }} sx={{ height: 24 }}>
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

export default TeamCard
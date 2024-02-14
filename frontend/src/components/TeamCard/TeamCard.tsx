import { useState } from 'react';
import './TeamCard.scss'
import palette from '@assets/styles/palette.module.scss';

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

import { TableFooter, TablePagination, styled } from '@mui/material';
import EditButtonOutline from '../CustomMUI/Buttons/EditButtons/EditButtonOutline';
import DeleteButton from '../CustomMUI/Buttons/DeleteButtons/DeleteButton';

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: palette.cardLightColor,
  borderRadius: '8px',
  border: `1px solid ${palette.lightColorShade}`
})

const HeadTableCell = styled(TableCell)({
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 'bold',
  fontSize: '18px',
  color: palette.cardDarkColor,
})

const BodyTableCell = styled(TableCell)({
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 'medium',
  fontSize: '16px',
  color: palette.cardDarkColor,
})

const StyledTableRow = styled(TableRow)({
  borderColor: palette.lightColorShade,

  '&:nth-of-type(odd)': {
    backgroundColor: `${palette.cardDarkColor}08`,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
})

const StyledTablePagination = styled(TablePagination)({
  width: '95%',
  margin: '-1px auto 0',
  display: 'flex',
  justifyContent: 'right',
  border: '1px solid ' + palette.lightColorShade,
  borderTop: '1px solid ' + palette.cardLightGray + '80',
  borderRadius: '0 0 8px 8px',
  backgroundColor: palette.cardLightColor
})

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
    <DeleteButton size='small' style={{ height: 32 }}>DELETE</DeleteButton>
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

  function handleChangePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) {
    setPage(page)
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
        <div>
          <TeamControlBar />

          <StyledTableContainer
            sx={{
              width: '95%',
              margin: '8px auto 0',
              borderRadius: '8px 8px 0 0',
            }}>
            <Table size='small'>
              <TableHead sx={{ height: 48 }}>
                <TableRow >
                  <HeadTableCell>Name</HeadTableCell>
                  <HeadTableCell>Email</HeadTableCell>
                  <HeadTableCell>Phone</HeadTableCell>
                  <HeadTableCell>Options</HeadTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name} sx={{}}>
                    <BodyTableCell>{row.name}</BodyTableCell>
                    <BodyTableCell>{row.email}</BodyTableCell>
                    <BodyTableCell>{row.phone}</BodyTableCell>
                    <BodyTableCell>{row.options}</BodyTableCell>
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
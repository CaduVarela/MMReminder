import { PersonType, TeamType } from "@/assets/types/BackendTypes"
import DeleteButton from "@/components/CustomMUI/Buttons/DeleteButtons/DeleteButton"
import EditButtonOutline from "@/components/CustomMUI/Buttons/EditButtons/EditButtonOutline"
import StyledBodyTableCell from "@/components/CustomMUI/TableComponents/StyledBodyTableCell"
import StyledHeadTableCell from "@/components/CustomMUI/TableComponents/StyledHeadTableCell"
import StyledTableContainer from "@/components/CustomMUI/TableComponents/StyledTableContainer"
import StyledTablePagination from "@/components/CustomMUI/TableComponents/StyledTablePagination"
import StyledTableRow from "@/components/CustomMUI/TableComponents/StyledTableRow"
import PopupEditPerson from "@/components/Popups/PopupForms/Person/PopupEditPerson/PopupEditPerson"
import PopupRemovePersonFromTeam from "@/components/Popups/PopupForms/PopupRemovePersonFromTeam/PopupRemovePersonFromTeam"
import PopupModal from "@/components/Popups/PopupModal"
import { Table, TableHead, TableRow, TableBody, TableFooter } from "@mui/material"
import { useEffect, useState } from "react"


function TeamPersonsTable({ team }: { team: TeamType }) {
  const personCount = Object.keys(team.persons).length

  // Table Manipulation
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [rowsPerPageOptions, setRowsPerPageoptions] = useState(
    personCount > 10 ? [5, 10, 20]
      : personCount > 5 ? [5, 10] : [],
  )

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage)
    refreshRows(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    refreshRows(page, parseInt(event.target.value, 10))
  }

  // Data Manipulation
  const [rows, setRows] = useState<PersonType[]>([]);

  function refreshRows(page: number, rowsPerPage: number) {
    let newRows: PersonType[] = []
    for (let i = 0; i < rowsPerPage; i++) {
      const calc = i + (page) * rowsPerPage
      if (calc < personCount)
        newRows.push(team.persons[calc])
      else if (personCount > 5) {
        newRows.push({
          id: calc,
          name: '',
          email: '',
          phone: '',
        } as PersonType)
      } else break
    }
    setRows(newRows)
  }

  useEffect(() => {
    refreshRows(page, rowsPerPage)
  }, [])

  // Popup
  const [targetPerson, setTargetPerson] = useState<PersonType>({
    id: -1,
    name: '',
    email: '',
    phone: ''
  } as PersonType)

  const [showRemovePersonFromTeam, setShowRemovePersonFromTeam] = useState(false)
  const handleShowRemovePersonFromTeam = () => {
    refreshRows(page, rowsPerPage)
    setShowRemovePersonFromTeam(prevState => !prevState)
  }

  const [showEditPerson, setShowEditPerson] = useState(false)
  const handleShowEditPerson = () => {
    refreshRows(page, rowsPerPage)
    setShowEditPerson(prevState => !prevState)
  }

  return (
    <>
      <PopupModal
        open={showRemovePersonFromTeam}
        onClose={handleShowRemovePersonFromTeam}
      >
        <>
          <PopupRemovePersonFromTeam person={targetPerson} team={team} handleClose={handleShowRemovePersonFromTeam} />
        </>
      </PopupModal>

      <PopupModal
        open={showEditPerson}
        onClose={handleShowEditPerson}
      >
        <>
          <PopupEditPerson person={targetPerson} />
        </>
      </PopupModal>

      <StyledTableContainer
        key={rows.length}
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
            {rows.map((person) => (
              <StyledTableRow key={person.id}>
                <StyledBodyTableCell>{person.name}</StyledBodyTableCell>
                <StyledBodyTableCell>{person.email}</StyledBodyTableCell>
                <StyledBodyTableCell>{person.phone}</StyledBodyTableCell>

                {person.name !== '' ?

                  <StyledBodyTableCell>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0 8px' }}>
                      <EditButtonOutline size='small' style={{ height: 32 }} onClick={() => {
                        setTargetPerson(person)
                        handleShowEditPerson()
                      }}>EDIT</EditButtonOutline>
                      <DeleteButton size='small' style={{ height: 32 }} onClick={() => {
                        setTargetPerson(person)
                        handleShowRemovePersonFromTeam()
                      }}>DEL</DeleteButton>
                    </div>
                  </StyledBodyTableCell>
                
                : <StyledBodyTableCell></StyledBodyTableCell>}
              </StyledTableRow>
            ))}

          </TableBody>
          <TableFooter style={{ height: 24 }} sx={{ height: 24 }}>
            <TableRow>
              <StyledTablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={personCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </StyledTableContainer>
    </>
  )
}

export default TeamPersonsTable
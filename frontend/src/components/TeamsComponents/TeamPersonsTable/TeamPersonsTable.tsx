import PersonsPage from "@/Pages/PersonsPage/PersonsPage"
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


function TeamPersonsTable({ team, filter = '' }: { team: TeamType, filter?: string }) {
  const [personCount, setPersonCount] = useState(Object.keys(team.persons).length)

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
    refreshRows(0, parseInt(event.target.value, 10))
  }

  // Data Manipulation
  const [rows, setRows] = useState<PersonType[]>([]);

  function filterItems(array: PersonType[], query: string) {
    return array.filter((el: PersonType) => el.name.toLowerCase().includes(query.toLowerCase()));
  }

  function refreshRows(page: number, rowsPerPage: number) {
    let newRows: PersonType[] = []

    const start = page > 0 ? page + (page * rowsPerPage) - 1 : 0
    const end = (page + 1) * rowsPerPage
    const slicedArray = team.persons ? team.persons.slice(start, end) : []

    const arrayPersons = filterItems(slicedArray, filter)

    for (let i = 0; i < rowsPerPage; i++) {
      if (i < arrayPersons.length)
        newRows.push(arrayPersons[i])

      else if (personCount > rowsPerPage)
        newRows.push({ id: i, name: '', email: '', phone: '' } as PersonType)
    }

    setRows(newRows)

    const count = filterItems(team.persons, filter).length
    setPersonCount(count)

    let newPage = page

    if (count === 0)
      newPage = 0

    else
      while (newPage * rowsPerPage > Math.round(count / rowsPerPage) * rowsPerPage)
        newPage--

    setPage(newPage)
  }

  useEffect(() => {
    refreshRows(page, rowsPerPage)
  }, [])

  useEffect(() => {
    refreshRows(page, rowsPerPage)
  }, [team, filter, rows.length, page, rowsPerPage])

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
          <PopupEditPerson person={targetPerson} handleClose={handleShowEditPerson} />
        </>
      </PopupModal>

      <StyledTableContainer
        key={team.id}
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
              <StyledHeadTableCell style={{ width: '16%' }}>Options</StyledHeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 && rows.map((person) => (
              <StyledTableRow key={person.id}>
                <StyledBodyTableCell>{person.name}</StyledBodyTableCell>
                <StyledBodyTableCell>{person.email}</StyledBodyTableCell>
                <StyledBodyTableCell>{person.phone}</StyledBodyTableCell>

                {person.name !== '' ?

                  <StyledBodyTableCell>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0 8px' }}>
                      <EditButtonOutline size='small' style={{ height: 32 }} onClick={() => {
                        setTargetPerson(person)
                        handleShowEditPerson()
                      }}>EDIT</EditButtonOutline>
                      <DeleteButton size='small' style={{ height: 32 }} onClick={() => {
                        setTargetPerson(person)
                        handleShowRemovePersonFromTeam()
                      }}>REMOVE</DeleteButton>
                    </div>
                  </StyledBodyTableCell>

                  : <StyledBodyTableCell></StyledBodyTableCell>}
              </StyledTableRow>
            ))}

            {rows.length < 1 && <tr>
              <td colSpan={4}>
                <h1 style={{
                  margin: '16px 0',
                  textAlign: 'center',
                  fontSize: 23,
                }}>No persons found</h1>
              </td>
            </tr>}

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
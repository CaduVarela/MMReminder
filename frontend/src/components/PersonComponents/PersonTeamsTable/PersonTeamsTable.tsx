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


function PersonTeamsTable({ person, filter }: { person: PersonType, filter: string }) {
  const [personCount, setPersonCount] = useState(Object.keys(person.teams).length)

  // Table Manipulation
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [rowsPerPageOptions, setRowsPerPageOptions] = useState(
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
  const [rows, setRows] = useState<TeamType[]>([]);

  function filterItems(array: TeamType[], query: string) {
    return array.filter((el: TeamType) => el.name.toLowerCase().includes(query.toLowerCase()));
  }

  function refreshRows(page: number, rowsPerPage: number) {
    let newRows: TeamType[] = []
    const arrayTeams = person.teams ? filterItems(person.teams, filter) : [];
    setPersonCount(arrayTeams.length)

    for (let i = 0; i < rowsPerPage; i++) {
      const calc = i + (page) * rowsPerPage
      if (calc < arrayTeams.length)
        newRows.push(arrayTeams[calc])
      else if (personCount > 5) {
        newRows.push({ id: calc, name: '' } as TeamType)
      } else break
    }

    setRows(newRows)
  }

  useEffect(() => {
    refreshRows(page, rowsPerPage)
  }, [])

  useEffect(() => {
    refreshRows(page, rowsPerPage)
  }, [person, filter, rows.length])

  // Popup
  const [targetTeam, setTargetTeam] = useState<TeamType>({ id: -1, name: '' } as TeamType)

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
          <PopupRemovePersonFromTeam person={person} team={targetTeam} handleClose={handleShowRemovePersonFromTeam} />
        </>
      </PopupModal>

      <StyledTableContainer
        sx={{
          width: '95%',
          margin: '8px auto 0',
        }}>
        <Table size='small'>
          <TableHead sx={{ height: 48 }}>
            <TableRow >
              <StyledHeadTableCell>Name</StyledHeadTableCell>
              <StyledHeadTableCell style={{ width: '16%' }}>Options</StyledHeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 && rows.map((team) => (
              <StyledTableRow key={team.id}>
                <StyledBodyTableCell>{team.name}</StyledBodyTableCell>

                {team.name !== '' ?

                  <StyledBodyTableCell>
                    <div style={{ display: 'flex', justifyContent: 'left', gap: '0 8px' }}>
                      <DeleteButton size='small' style={{ height: 32 }} onClick={() => {
                        setTargetTeam(team)
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
                }}>No teams found</h1>
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

export default PersonTeamsTable
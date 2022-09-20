import { Backdrop, Checkbox, CircularProgress, Paper, Typography } from "@mui/material"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useGroupsSelectors } from "../../../../../services/Groups/GroupsSelectors"
import { useAppDispatch } from "../../../../../store/Store"
import { groupsActions } from "../../../../../services/Groups/GroupsSlice"


const Members = () => {

  const { group, status } = useGroupsSelectors()
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    let oldValues: any[] = group?.people.filter((member) => member.active === true).map(({ id }) => id) || []

    let newValues: string[] = []
    if (event.target.checked) {
      newValues = [...oldValues]
      newValues.push(event.target.name)
    } else {
      newValues = oldValues.filter((id) => id != event.target.name) || []
    }

    const data = {
      groupId: group?.id || '',
      oldValues,
      newValues
    }

    const onSuccess = () => { }

    dispatch(groupsActions.updateGroupMembers({ data, onSuccess }))
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Miembros</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Backdrop open={status.updateGroupMembers === 'loading'}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                <TableCell><Typography variant="h6">Activo</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {group?.people.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      name={member.id}
                      checked={member.active}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
export default Members
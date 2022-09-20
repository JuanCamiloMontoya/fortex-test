import { Checkbox, Paper, Typography } from "@mui/material"
import { useGroupsSelectors } from "../../../../../services/Groups/GroupsSelectors"
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
import { ChangeEvent, useState } from "react"

const Roles = () => {

  const { group, status } = useGroupsSelectors()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Roles</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                <TableCell><Typography variant="h6">Activo</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {group?.roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={role.active}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      name={role.id}
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
export default Roles
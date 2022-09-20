import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/Store'
import { groupsActions } from '../../../services/Groups/GroupsSlice'
import { useGroupsSelectors } from '../../../services/Groups/GroupsSelectors'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { Group } from '../../../services/Groups/GroupsInitialState'
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import CreateGroup from './CreateGroup/CreateGroup'

const Groups = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const { groups, status } = useGroupsSelectors()

  useEffect(() => {
    dispatch(groupsActions.getGroups())
  }, [])

  const showGroup = (group: Group) => {
    dispatch(groupsActions.setGroup(group))
    navigate('/group-detail')
  }

  return (
    <Box>
      <Backdrop open={status.getGroups === 'loading'}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h4">Grupos
        <IconButton color="primary" onClick={() => setOpenModalCreate(true)}>
          <AddCircleOutlinedIcon />
        </IconButton>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
              <TableCell><Typography variant="h6">Descripción</Typography></TableCell>
              <TableCell><Typography variant="h6">Ver</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group, i) => (
              <TableRow key={i}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => showGroup(group)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateGroup open={openModalCreate} setOpen={setOpenModalCreate} />
    </Box>
  )
}

export default Groups
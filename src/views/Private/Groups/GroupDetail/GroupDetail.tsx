import {
  Box, Button, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider, Grid, IconButton, Typography
} from "@mui/material"
import { useGroupsSelectors } from "../../../../services/Groups/GroupsSelectors"
import EditIcon from '@mui/icons-material/Edit'
import CreateGroup from "../CreateGroup/CreateGroup"
import { useState } from "react"
import { useAppDispatch } from "../../../../store/Store"
import { groupsActions } from "../../../../services/Groups/GroupsSlice"
import { useNavigate } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Members from "./Member/Member"
import Roles from "./Roles/Roles"

const GroupDetail = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [open, setOpen] = useState(false)
  const { group, status } = useGroupsSelectors()

  const onDeleteGroup = () => {
    setOpen(true)
  }

  const onConfirmDelete = () => {
    const onSuccess = () => {
      navigate('/')
    }
    group?.id && dispatch(groupsActions.deleteGroup({ id: group?.id, onSuccess }))
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Box>
        <Typography variant="h4">
          {group?.name}
          <IconButton color="primary" onClick={() => setOpenModalCreate(true)}>
            <EditIcon />
          </IconButton>
        </Typography>
        <Typography variant="subtitle1">
          {group?.description}
        </Typography>
      </Box>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <Members />
      <Roles />
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <Grid container justifyContent="center">
        <Button onClick={onDeleteGroup} color="error" variant="contained" startIcon={<DeleteForeverIcon />}>
          Eliminar grupo
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminar grupo
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estás seguro de eliminar el grupo {group?.name}?
            Esta acción no se podrá deshacer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <LoadingButton
            loading={status.deleteGroup === 'loading'}
            onClick={onConfirmDelete}
            color="error"
            autoFocus
            loadingPosition="start"
            startIcon={<DeleteForeverIcon />}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <CreateGroup
        open={openModalCreate}
        setOpen={setOpenModalCreate}
        isUpdate={true}
        group={group}
      />
    </div>
  )
}

export default GroupDetail
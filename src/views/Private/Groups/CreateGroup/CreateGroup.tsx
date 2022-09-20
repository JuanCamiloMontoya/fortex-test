import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useAppDispatch } from '../../../../store/Store'
import { Alert, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useGroupsSelectors } from '../../../../services/Groups/GroupsSelectors'
import { groupsActions } from '../../../../services/Groups/GroupsSlice'
import SaveIcon from '@mui/icons-material/Save'
import { Group } from '../../../../services/Groups/GroupsInitialState'

interface ICreateGroup {
  open: boolean,
  setOpen: (status: boolean) => void,
  isUpdate?: boolean,
  group?: Group | null | undefined
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  width: window.innerWidth < 300 ? '90%' : 400
}

const CreateGroup: FC<ICreateGroup> = ({ open, setOpen, isUpdate, group }) => {

  const dispatch = useAppDispatch()
  const [exists, setExists] = useState(false)

  const { status, error, groups } = useGroupsSelectors()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const formatData = {
      name: data.get('name')?.toString() || '',
      description: data.get('description')?.toString() || '',
    }

    const onSuccess = () => {
      setOpen(false)
    }

    if (isUpdate)
      dispatch(groupsActions.updateGroup({
        data: { ...formatData, id: group?.id || '' },
        onSuccess
      }))
    else
      dispatch(groupsActions.createGroup({
        data: formatData,
        onSuccess
      }))
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExists(groups.some(({ name }) => name === e.target.value && group?.name !== e.target.value))
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4">{isUpdate ? 'Modificar' : 'Crear'} grupo</Typography>
        {error.createGroup && (
          <Alert severity="error" onClose={() => dispatch(groupsActions.resetStatus('createGroup'))}>
            {error.createGroup}
          </Alert>
        )}
        {error.updateGroup && (
          <Alert severity="error" onClose={() => dispatch(groupsActions.resetStatus('updateGroup'))}>
            {error.updateGroup}
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre"
          name="name"
          defaultValue={group?.name || ''}
          error={exists}
          onChange={onChangeName}
          helperText={exists ? 'Ya existe un grupo con ese nombre!' : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Descripción"
          name="description"
          defaultValue={group?.description || ''}
          multiline
          rows={4}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isUpdate ? status.updateGroup === 'loading' : status.createGroup === 'loading'}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          sx={{ mt: 3, mb: 2 }}
          disabled={exists}
        >
          {isUpdate ? 'Modificar' : 'Crear'}  grupo
        </LoadingButton>
      </Box>
    </Modal>
  )
}

export default CreateGroup
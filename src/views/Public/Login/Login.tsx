import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoginIcon from '@mui/icons-material/Login'
import { LoadingButton } from '@mui/lab'
import { Alert, Container, Typography, Box, TextField, CssBaseline, Avatar } from '@mui/material'
import { useAuthSelectors } from '../../../services/Auth/AuthSelectors'
import { authActions } from '../../../services/Auth/AuthSlice'
import { useAppDispatch } from '../../../store/Store'

const Login = () => {

  const dispatch = useAppDispatch()
  const { status, error } = useAuthSelectors()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const formatData = {
      email: data.get('email')?.toString() || '',
      password: data.get('password')?.toString() || '',
    }

    dispatch(authActions.login(formatData))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error.login && (
            <Alert severity="error" onClose={() => dispatch(authActions.resetStatus('login'))}>
              {error.login}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={status.login === 'loading'}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
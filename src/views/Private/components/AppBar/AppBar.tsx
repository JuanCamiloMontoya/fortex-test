import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../../../store/Store'
import { useNavigate } from 'react-router-dom'

interface AppBarCProps extends MuiAppBarProps {
  open?: boolean
}

interface AppBarProps {
  open?: boolean,
  toggleDrawer: () => void
}

const drawerWidth: number = 240

const AppBar = ({ open, toggleDrawer }: AppBarProps) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'auth/logout' })
    navigate('/')
  }

  const AppBarC = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarCProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  return (
    <AppBarC position="absolute" open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <Button color="inherit" onClick={logout}>Cerrar sesión</Button>
      </Toolbar>
    </AppBarC>
  )
}

export default AppBar
import { Fragment } from "react"
import styled from "@emotion/styled"
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import GroupsIcon from '@mui/icons-material/Groups'
import { Theme } from '@mui/material/styles'
import { useNavigate } from "react-router-dom"

interface DrawerCProps extends MuiDrawerProps {
  open?: boolean
  theme?: Theme
}

interface DrawerProps {
  open: boolean,
  toggleDrawer: () => void
}

const drawerWidth: number = 240

const Drawer = ({ open, toggleDrawer }: DrawerProps) => {

  const navigate = useNavigate()

  const DrawerC = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
  })<DrawerCProps>(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }))

  const items = [
    {
      name: 'Grupos',
      icon: <GroupsIcon />
    }
  ]

  return (
    <DrawerC variant="permanent" open={open} >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <Fragment>
          {items.map(({ name, icon }) => (
            <ListItemButton key={name} onClick={() => navigate('/')}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </Fragment>
      </List>
    </DrawerC>
  )
}

export default Drawer
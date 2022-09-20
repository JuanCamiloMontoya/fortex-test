import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AppBar from './components/AppBar/AppBar'
import Drawer from './components/Drawer/Drawer'
import Groups from './Groups/Groups'
import GroupDetail from './Groups/GroupDetail/GroupDetail'

const theme = createTheme()

const Private = () => {

  const [open, setOpen] = useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar open={open} toggleDrawer={toggleDrawer} />
          <Drawer open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Routes>
                      <Route path="/" element={<Groups />} />
                      <Route path="/group-detail" element={<GroupDetail />} />
                    </Routes>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Private
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SchoolIcon from '@mui/icons-material/School';
function NavBar() {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <SchoolIcon fontSize='large' />
        <Typography variant="h6">
          ScholarSphere
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
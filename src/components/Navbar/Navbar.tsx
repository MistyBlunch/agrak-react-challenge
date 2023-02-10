import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.css'

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const location = useLocation()

  return (
    <Box mb={3}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Agrak Users
          </Typography>
          {location.pathname !== '/' && (
            <Link to={'/'} className="nav-link">
              <Button color="inherit">Users</Button>
            </Link>
          )}
          {location.pathname !== '/add' && (
            <Link to={'/add'} className="nav-link">
              <Button color="inherit">Add User</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

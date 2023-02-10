import { UserTable } from '@/components/UserTable'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" my={3} align="center">
        All Users
      </Typography>
      <Box mb={2}>
        <Link to={'/add'} className="nav-link">
          <Button variant="contained">Add User</Button>
        </Link>
      </Box>
      <UserTable />
    </Container>
  )
}

export default Home

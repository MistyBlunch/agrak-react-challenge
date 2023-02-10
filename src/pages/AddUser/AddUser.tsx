import { UserForm } from '@/components/UserForm'
import { User } from '@/interfaces/User'
import * as api from '@/lib/usersApi'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export interface AddUserInterface {}

const AddUser: React.FC<AddUserInterface> = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const createUserMutation = useMutation(api.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  // Add User
  const getData = (user: User) => {
    createUserMutation.mutate(user)
    return navigate('/')
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" my={3} align="center">
        Add User
      </Typography>
      <UserForm getData={getData} />
    </Box>
  )
}

export default AddUser

import { UserForm } from '@/components/UserForm'
import { User } from '@/interfaces/User'
import * as api from '@/lib/usersApi'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export interface EditUserInterface {}

const EditUser: React.FC<EditUserInterface> = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const updateUserMutation = useMutation(api.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  // Edit User
  const getData = (user: User) => {
    updateUserMutation.mutate(user)
    return navigate('/')
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" my={3} align="center">
        Edit User
      </Typography>
      <UserForm getData={getData} />
    </Box>
  )
}

export default EditUser

import { User } from '@/interfaces/User'
import * as api from '@/lib/usersApi'
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

export interface UserFormInterface {
  getData?: {}
}

const UserForm: React.FC<UserFormInterface> = (props: any) => {
  const AvatarAPI = 'https://api.multiavatar.com/'
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const locationData = JSON.parse(location.state) || {}
  const { handleSubmit, control, getValues, setValue, reset } =
    useForm()

  const deleteUserMutation = useMutation(api.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  const deleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
    return navigate('/')
  }

  const deleteUserFn = () => {
    deleteUser(locationData.id)
  }

  const onSubmit = (data: User) => {
    data.id = locationData.id
    props.getData(data)
  }

  const genAvatarLink = () => {
    setValue('avatar', `${AvatarAPI}${getValues('first_name')}.png`)
  }

  const cancel = () => {
    reset({
      first_name: '',
      second_name: '',
      email: '',
      avatar: '',
    })

    return navigate('/')
  }

  useEffect(() => {
    if (locationData) {
      setValue('first_name', locationData.first_name)
      setValue('second_name', locationData.second_name)
      setValue('email', locationData.email)
      setValue('avatar', locationData.avatar)
    }
  }, [locationData])

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '95%' },
        }}
      >
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name={'first_name'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: {
                    onChange,
                    value = location.state
                      ? locationData.first_name
                      : '',
                  },
                }) => (
                  <TextField
                    required
                    onChange={onChange}
                    value={value || ''}
                    label={'First Name'}
                  />
                )}
              />
              <Controller
                name={'second_name'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: {
                    onChange,
                    value = location.state
                      ? locationData.second_name
                      : '',
                  },
                }) => (
                  <TextField
                    required
                    onChange={onChange}
                    value={value || ''}
                    label={'Second Name'}
                  />
                )}
              />
              <Controller
                name={'email'}
                control={control}
                render={({
                  field: {
                    onChange,
                    value = location.state ? locationData.email : '',
                  },
                  fieldState: { error },
                }) => (
                  <TextField
                    required
                    onChange={onChange}
                    value={value || ''}
                    label={'Email'}
                    error={!!error}
                    type='email'
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Must use a valid email',
                  },
                }}
              />
              <Controller
                name={'avatar'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: {
                    onChange,
                    value = location.state ? locationData.avatar : '',
                  },
                }) => (
                  <TextField
                    required
                    onChange={onChange}
                    value={value || ''}
                    label={'Avatar'}
                  />
                )}
              />
              <Box
                mt={2}
                display="flex"
                justifyContent={{ xs: 'center' }}
                flexWrap="wrap"
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1, mx: 0.3 }}
                  type="submit"
                  color="success"
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1, mx: 0.3 }}
                  onClick={genAvatarLink}
                  color="secondary"
                >
                  Gen Avatar Link
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1, mx: 0.3 }}
                  onClick={cancel}
                >
                  Cancel
                </Button>
                {location.pathname === '/edit' && (
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1, mx: 0.3 }}
                    color="error"
                    onClick={deleteUserFn}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default UserForm

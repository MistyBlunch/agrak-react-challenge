import * as api from '@/lib/usersApi'
import { User } from '@/interfaces/User'
import { useQuery } from 'react-query'

export const GetAllUsers = () => {
  const {
    data: users,
    isLoading,
    isError
  } = useQuery<User[]>('users', api.getUsers)

  return { users, isLoading, isError }
}

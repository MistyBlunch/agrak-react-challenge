import axios from 'axios'
import { User } from '@/interfaces/User'

const BASE_URL =
  'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users'

const api = axios.create({
  baseURL: BASE_URL,
})

export const getUsers = async (): Promise<User[]> =>
  api.get('/').then((res) => res.data)

export const getUser = async (id: number): Promise<User> =>
  api.get(`/${id}`).then((res) => res.data)

export const createUser = async (user: User): Promise<User> =>
  api.post('/', user).then((res) => res.data)

export const updateUser = async (
  user: User
): Promise<User> => api.put(`/${user.id}`, user).then((res) => res.data)

export const deleteUser = async (
  id: number,
): Promise<User> => api.delete(`/${id}`).then((res) => res.data)

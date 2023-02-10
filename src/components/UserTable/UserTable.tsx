import * as api from '@/lib/usersApi'
import { GetAllUsers } from '@/queries/users/allUsers'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, CircularProgress, IconButton } from '@mui/material'
import { Stack } from '@mui/system'
import {
  DataGrid,
  GridApi,
  GridCellParams,
  GridRenderCellParams
} from '@mui/x-data-grid'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import './style.css'

export interface UserTableInterface {}

const UserTable: React.FC<UserTableInterface> = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { users, isLoading, isError } = GetAllUsers()

  const deleteUserMutation = useMutation(api.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  const deleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  }

  const pageSize = 10
  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      flex: 1,
      minWidth: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <img
            src={params.row.avatar}
            alt={params.row.avatar}
            className="avatar-img"
          />
        </>
      ),
    },
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
    },
    {
      field: 'second_name',
      headerName: 'Second Name',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      minWidth: 180,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        const goToEditView = () => {
          const api: GridApi = params.api
          const thisRow: Record<string, GridCellParams> = {}

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) =>
                (thisRow[c.field] = params.getValue(
                  params.id,
                  c.field
                ))
            )

          thisRow.id = params.id
          const user = JSON.stringify(thisRow)

          return navigate('/edit', {
            state: user,
          })
        }

        const deleteUserSelected = () => {
          deleteUser(params.id)
        }

        return (
          <Stack direction="row" spacing={2}>
            <IconButton aria-label="delete" onClick={goToEditView}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={deleteUserSelected}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  return (
    <div>
      {!isLoading && !isError ? (
        <DataGrid
          rows={users}
          columns={columns}
          disableColumnSelector
          disableSelectionOnClick
          autoHeight
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          getRowId={(row: any) => row.id}
        />
      ) : (
        <Box sx={{ display: 'flex' }} justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
    </div>
  )
}

export default UserTable

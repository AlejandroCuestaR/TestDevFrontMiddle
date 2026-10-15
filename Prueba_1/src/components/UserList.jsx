import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material'
import { fetchUsers, selectUser } from '../features/usersSlice'

// Contenedor: lee los usuarios del estado global y permite seleccionar uno.
export default function UserList() {
  const dispatch = useDispatch()
  const { items, selectedId, status, error } = useSelector((s) => s.users)

  useEffect(() => {
    // Carga inicial al montar, solo si aún no se han pedido.
    if (status === 'idle') dispatch(fetchUsers())
  }, [status, dispatch])

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Usuarios
      </Typography>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {status === 'failed' && <Alert severity="error">{error}</Alert>}

      <List dense>
        {items.map((user) => (
          <ListItemButton
            key={user.id}
            selected={user.id === selectedId}
            onClick={() => dispatch(selectUser(user.id))}
          >
            <ListItemText primary={user.name} secondary={`@${user.username}`} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}

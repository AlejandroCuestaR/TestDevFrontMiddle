import { useDispatch, useSelector } from 'react-redux'
import { Paper, Typography, Button, Stack, Box, Divider } from '@mui/material'
import { fetchPostsWithComments } from '../features/postsSlice'
import { fetchTodos } from '../features/todosSlice'

// Contenedor: muestra algunos campos del usuario elegido y los dos botones
// que disparan la carga de posts y todos mediante acciones de Redux.
export default function UserDetails({ view, onChangeView }) {
  const dispatch = useDispatch()
  const user = useSelector((s) =>
    s.users.items.find((u) => u.id === s.users.selectedId),
  )

  if (!user) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color="text.secondary">
          Selecciona un usuario para ver su detalle.
        </Typography>
      </Paper>
    )
  }

  const handlePosts = () => {
    dispatch(fetchPostsWithComments(user.id))
    onChangeView('posts')
  }

  const handleTodos = () => {
    dispatch(fetchTodos(user.id))
    onChangeView('todos')
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        @{user.username}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body2">
          <strong>Teléfono:</strong> {user.phone}
        </Typography>
        <Typography variant="body2">
          <strong>Sitio web:</strong> {user.website}
        </Typography>
        <Typography variant="body2">
          <strong>Empresa:</strong> {user.company?.name}
        </Typography>
        <Typography variant="body2">
          <strong>Ciudad:</strong> {user.address?.city}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Button
          variant={view === 'posts' ? 'contained' : 'outlined'}
          onClick={handlePosts}
        >
          Posts
        </Button>
        <Button
          variant={view === 'todos' ? 'contained' : 'outlined'}
          onClick={handleTodos}
        >
          Todos
        </Button>
      </Stack>
    </Paper>
  )
}

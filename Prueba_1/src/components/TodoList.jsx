import { useSelector } from 'react-redux'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from '@mui/material'
import TodoForm from './TodoForm'

// Contenedor: lista los todos (ya vienen ordenados desc. desde el reducer)
// e incluye el formulario para agregar uno nuevo.
export default function TodoList() {
  const { items, status, error } = useSelector((s) => s.todos)

  return (
    <Box>
      <TodoForm />

      <Divider sx={{ my: 2 }} />

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {status === 'failed' && <Alert severity="error">{error}</Alert>}

      {status === 'succeeded' && items.length === 0 && (
        <Typography color="text.secondary">Este usuario no tiene todos.</Typography>
      )}

      <List dense>
        {items.map((todo) => (
          <ListItem key={todo.id} disableGutters>
            <Checkbox edge="start" checked={todo.completed} disableRipple inputProps={{ readOnly: true }} />
            <ListItemText
              primary={todo.title}
              secondary={`#${todo.id}`}
              sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppBar, Toolbar, Typography, Container, Grid, Box } from '@mui/material'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import PostList from './components/PostList'
import TodoList from './components/TodoList'
import { clearPosts } from './features/postsSlice'
import { clearTodos } from './features/todosSlice'

// Contenedor raíz: arma el layout y decide qué sección mostrar (posts/todos).
export default function App() {
  const dispatch = useDispatch()
  const [view, setView] = useState(null) // null | 'posts' | 'todos'
  const selectedId = useSelector((s) => s.users.selectedId)

  // Al cambiar de usuario reiniciamos la vista y limpiamos datos previos.
  useEffect(() => {
    setView(null)
    dispatch(clearPosts())
    dispatch(clearTodos())
  }, [selectedId, dispatch])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Prueba 1 — Usuarios</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <UserList />
          </Grid>

          <Grid item xs={12} md={8}>
            <UserDetails view={view} onChangeView={setView} />

            {selectedId && (
              <Box sx={{ mt: 2 }}>
                {view === 'posts' && <PostList />}
                {view === 'todos' && <TodoList />}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = 'https://jsonplaceholder.typicode.com'

// Trae los todos del usuario seleccionado.
export const fetchTodos = createAsyncThunk('todos/fetch', async (userId) => {
  const res = await fetch(`${API}/users/${userId}/todos`)
  if (!res.ok) throw new Error('No se pudieron cargar los todos')
  return res.json()
})

// Crea un todo nuevo. La API responde { id: 201 } pero no persiste de verdad.
export const addTodo = createAsyncThunk('todos/add', async (todo) => {
  const res = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
  if (!res.ok) throw new Error('No se pudo guardar el todo')
  const saved = await res.json()
  // Combinamos lo enviado con el id que devuelve la API.
  return { ...todo, id: saved.id }
})

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    saving: false,
  },
  reducers: {
    clearTodos(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Orden por id descendente, como pide el requerimiento.
        state.items = [...action.payload].sort((a, b) => b.id - a.id)
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addTodo.pending, (state) => {
        state.saving = true
        state.error = null
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.saving = false
        // La API siempre responde id: 201, así que agregar varias tareas repetiría
        // el id (y la "key" de React). Derivamos un id local único, mayor al máximo
        // actual, para mantener la lista consistente y el orden descendente.
        const maxId = state.items.reduce((m, t) => Math.max(m, t.id), 0)
        const nuevo = { ...action.payload, id: Math.max(action.payload.id, maxId + 1) }
        state.items.unshift(nuevo)
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.saving = false
        state.error = action.error.message
      })
  },
})

export const { clearTodos } = todosSlice.actions
export default todosSlice.reducer

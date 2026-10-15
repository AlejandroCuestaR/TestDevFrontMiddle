import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = 'https://jsonplaceholder.typicode.com'

// Trae los primeros 10 usuarios y los deja en el estado global.
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch(`${API}/users?_limit=10`)
  if (!res.ok) throw new Error('No se pudieron cargar los usuarios')
  return res.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    selectedId: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // Guarda qué usuario está seleccionado.
    selectUser(state, action) {
      state.selectedId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { selectUser } = usersSlice.actions
export default usersSlice.reducer

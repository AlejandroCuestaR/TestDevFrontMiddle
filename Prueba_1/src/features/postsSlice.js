import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = 'https://jsonplaceholder.typicode.com'

// Trae los posts del usuario y, por cada post, anida sus comentarios.
export const fetchPostsWithComments = createAsyncThunk(
  'posts/fetchWithComments',
  async (userId) => {
    const res = await fetch(`${API}/users/${userId}/posts`)
    if (!res.ok) throw new Error('No se pudieron cargar los posts')
    const posts = await res.json()

    // Pedimos los comentarios de todos los posts en paralelo.
    const withComments = await Promise.all(
      posts.map(async (post) => {
        const cRes = await fetch(`${API}/posts/${post.id}/comments`)
        const comments = cRes.ok ? await cRes.json() : []
        return { ...post, comments }
      }),
    )
    return withComments
  },
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Limpia los posts (p. ej. al cambiar de usuario).
    clearPosts(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsWithComments.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostsWithComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPostsWithComments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { clearPosts } = postsSlice.actions
export default postsSlice.reducer

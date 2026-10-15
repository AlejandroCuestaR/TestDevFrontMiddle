import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/usersSlice'
import postsReducer from './features/postsSlice'
import todosReducer from './features/todosSlice'

// Store global de la app. Cada feature aporta su slice (patrón slice/ducks).
export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    todos: todosReducer,
  },
})

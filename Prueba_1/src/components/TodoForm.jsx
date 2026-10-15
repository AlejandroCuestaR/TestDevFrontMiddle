import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Alert,
} from '@mui/material'
import { addTodo } from '../features/todosSlice'

// Componente controlado: el valor vive en el estado local y se sincroniza en
// cada onChange. Al enviar hace POST /todos a través de la acción del slice.
export default function TodoForm() {
  const dispatch = useDispatch()
  const userId = useSelector((s) => s.users.selectedId)
  const saving = useSelector((s) => s.todos.saving)

  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    // Cuerpo con los tipos correctos: { userId:int, title:string, completed:bool }
    dispatch(addTodo({ userId, title: title.trim(), completed }))

    // Reiniciamos el formulario y mostramos la confirmación.
    setTitle('')
    setCompleted(false)
    setDone(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1.5}>
        <TextField
          label="Nuevo todo"
          size="small"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setDone(false)
          }}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Completado"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={saving || !title.trim()}
        >
          {saving ? 'Guardando…' : 'Guardar'}
        </Button>
        {done && (
          <Alert severity="success">Todo agregado (id simulado por la API).</Alert>
        )}
      </Stack>
    </form>
  )
}

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
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setSubmitError(null)
    setDone(false)
    try {
      // Cuerpo con los tipos correctos: { userId:int, title:string, completed:bool }.
      // .unwrap() hace que el await lance si el POST falla, para no mostrar un
      // "éxito" falso cuando en realidad la tarea no se guardó.
      await dispatch(addTodo({ userId, title: title.trim(), completed })).unwrap()
      setTitle('')
      setCompleted(false)
      setDone(true)
    } catch {
      setSubmitError('No se pudo guardar la tarea. Intenta de nuevo.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1.5}>
        <TextField
          label="Nueva tarea"
          size="small"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setDone(false)
            setSubmitError(null)
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
          <Alert severity="success">Tarea agregada (id simulado por la API).</Alert>
        )}
        {submitError && <Alert severity="error">{submitError}</Alert>}
      </Stack>
    </form>
  )
}

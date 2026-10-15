import { useSelector } from 'react-redux'
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

// Presentacional: pinta los posts del usuario con sus comentarios anidados.
export default function PostList() {
  const { items, status, error } = useSelector((s) => s.posts)

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'failed') return <Alert severity="error">{error}</Alert>

  if (status === 'succeeded' && items.length === 0) {
    return (
      <Typography color="text.secondary">Este usuario no tiene posts.</Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((post) => (
        <Card key={post.id} variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {post.body}
            </Typography>

            <Divider textAlign="left" sx={{ my: 1 }}>
              Comentarios ({post.comments.length})
            </Divider>

            {/* Comentarios anidados dentro de cada post. */}
            <List dense disablePadding>
              {post.comments.map((c) => (
                <ListItem key={c.id} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemText primary={`${c.name} — ${c.email}`} secondary={c.body} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

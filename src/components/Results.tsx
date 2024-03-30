import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useQuestionStore } from '../store/questions'
import { useQuestionData } from '../hooks/useQuestionData'

export default function Results (): JSX.Element {
  const { correct, incorrect } = useQuestionData()
  const reset = useQuestionStore((state) => state.reset)
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        bgcolor: 'darkslategrey'
      }}>
      <CardContent>
        <Typography
          variant='h3'
          component='h2'>
          ¡FIN DEL QUIZ!
        </Typography>
        <br />
        <Typography
          variant='h5'
          component='h2'>
          Estos son tus resultados
        </Typography>
        <strong>
          <p>Preguntas Correctas ✅: {correct}</p>
          <p>Preguntas Incorrectas ❌: {incorrect}</p>
        </strong>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          sx={{ color: 'white', bgcolor: 'darkslateblue', '&:hover': { bgcolor: 'darkcyan' } } }
          onClick={() => {
            reset()
          }}>
          Volver a intentar
        </Button>
      </CardActions>
    </Card>
  )
}

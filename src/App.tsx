import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { SqlLogo } from './components/SQLLogo'
import ButtonStart from './components/ButtonStart'
import { useQuestionStore } from './store/questions'
import Game from './components/Game'
import { useQuestionData } from './hooks/useQuestionData'
import Results from './components/Results'

function App (): JSX.Element {
  const questions = useQuestionStore((state) => state.questions)
  const { unasnwered } = useQuestionData()
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'>
          <SqlLogo />
          <Typography
            variant='h2'
            component='h1'>
            SQL Quiz
          </Typography>
        </Stack>
        <strong style={{ fontSize: '1.3rem', marginBottom: '3rem', display: 'block', marginTop: '1rem', textDecoration: 'underline yellow' }}>
          Pon a prueba tus conocimientos sobre SQL
        </strong>

        {questions.length === 0 && <ButtonStart />}
        {questions.length > 0 && unasnwered > 0 && <Game />}
        {questions.length > 0 && unasnwered === 0 && <Results />}

        <strong style={{ fontSize: '1rem', display: 'block', marginTop: '2rem', color: 'darkturquoise' }}>
          Desarrollado por Stefania Bruera
        </strong>
      </Container>
    </main>
  )
}

export default App

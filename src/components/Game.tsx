import {
  IconButton,
  Stack
} from '@mui/material'
import { useQuestionStore } from '../store/questions'

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import Footer from './Footer'
import { Question } from './Question'

export default function Game (): JSX.Element {
  const questions = useQuestionStore((state) => state.questions)
  const currentQuestion = useQuestionStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestionStore((state) => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Stack
        direction='row'
        gap={1}
        alignItems='center'
        justifyContent='center'>
        <IconButton
          onClick={goPrevQuestion}
          disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
          {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}

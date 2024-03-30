import { Button } from '@mui/material'
import { useQuestionStore } from '../store/questions'

const LIMIT_QUESTIONS = 10

export default function ButtonStart (): JSX.Element {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions)

  const handleClick = (): void => {
    fetchQuestions(LIMIT_QUESTIONS)
  }
  return (
    <Button onClick={handleClick} variant="contained" sx={{ color: 'white', bgcolor: 'darkslateblue', '&:hover': { bgcolor: 'darkcyan' } } }>
      ¡¡Comenzar!!
    </Button>
  )
}

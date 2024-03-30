import { useQuestionStore } from '../store/questions'

export const useQuestionData = (): { correct: number, incorrect: number, unasnwered: number } => {
  const questions = useQuestionStore((state) => state.questions)
  let correct = 0
  let incorrect = 0
  let unasnwered = 0

  questions.forEach((question) => {
    if (question.userSelectedAnswer == null) unasnwered++
    else if (question.userSelectedAnswer === question.correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unasnwered }
}

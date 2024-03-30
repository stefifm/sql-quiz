import { type Question as QuestionType } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionStore } from '../store/questions'
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
// getgetBackgroundColor va fuera del componente para que se crea una vez
// de lo contrario, estaría renderizandose cadaz vez que se renderiza el componente
const getBackgroundColor = (info: QuestionType, index: number): 'transparent' | 'green' | 'red' => {
  const { userSelectedAnswer, correctAnswer } = info

  //  si el usuario no ha seleccionado una respuesta
  if (userSelectedAnswer == null) return 'transparent'

  // si la respuesta seleccionada pero es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  // si la respuesta seleccionada es correcta
  if (index === correctAnswer) return 'green'

  // si la respuesta seleccionada es incorrecta
  if (index === userSelectedAnswer) return 'red'

  // si no es ninguna de las anteriores
  return 'transparent'
}

export const Question = ({ info }: { info: QuestionType }): JSX.Element => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card
      variant='outlined'
      sx={{ textAlign: 'left', bgcolor: '#222', padding: 2, marginTop: 5 }}>
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter
        language='sql'
        style={monokaiSublime}>
        {info.code}
      </SyntaxHighlighter>

      <List
        sx={{ bgcolor: 'darkcyan' }}
        disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
                '&.Mui-disabled': {
                  backgroundColor: getBackgroundColor(info, index),
                  opacity: 0.7
                }
              }}>
              <ListItemText
                primary={answer}
                sx={{ textAlign: 'center' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

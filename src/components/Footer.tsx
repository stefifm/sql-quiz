import { Button } from '@mui/material'
import { useQuestionData } from '../hooks/useQuestionData'
import { useQuestionStore } from '../store/questions'

export default function Footer (): JSX.Element {
  const { correct, incorrect, unasnwered } = useQuestionData()
  const reset = useQuestionStore(state => state.reset)
  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unasnwered} sin responder`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Reiniciar juego
        </Button>
      </div>
    </footer>
  )
}

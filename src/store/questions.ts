import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

const API_URL = 'https://api.jsonbin.io/v3/b/66088d3be41b4d34e4dc9898'
const API_KEY = '$2a$10$yJHqvHORCDvFPupHXLtqauX/HyXup4V9jjW2Rso1e0bW0eMeOxOaW'

export const useQuestionStore = create<State>()(persist(
  (set, get) => ({
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const res = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': API_KEY
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch questions')
      }

      const json = await res.json()
      const questions = json?.record.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // structuredClone es una función que clona un objeto
      const newQuestions = structuredClone(questions)
      // buscamos la pregunta con el índice
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // obtenemos la información de la pregunta encontrada
      const questionInfo = newQuestions[questionIndex]
      // vemos si la pregunta fue constestada correctamente
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      // si la respuesta es correcta, lanzamos un confetti
      if (isCorrectUserAnswer) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
      // cambiamos la información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      // actualizamos el estado con la nueva información
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1

      if (prevQuestion >= 0) {
        set({ currentQuestion: prevQuestion })
      }
    },
    reset: () => {
      set({
        questions: [],
        currentQuestion: 0
      })
    }
  }), {
    name: 'questions'
  }
))

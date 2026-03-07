import { useEffect, useState, startTransition } from 'react'
import type { InterviewQuestion } from '../types'

type QuestionLoadState =
  | {
      status: 'loading'
      questions: InterviewQuestion[]
      error: null
    }
  | {
      status: 'ready'
      questions: InterviewQuestion[]
      error: null
    }
  | {
      status: 'error'
      questions: InterviewQuestion[]
      error: Error
    }

const initialState: QuestionLoadState = {
  status: 'loading',
  questions: [],
  error: null,
}

export const useInterviewQuestions = () => {
  const [state, setState] = useState<QuestionLoadState>(initialState)

  useEffect(() => {
    let isActive = true

    void import('../data/interviewQuestions')
      .then((module) => {
        if (!isActive) return

        startTransition(() => {
          setState({
            status: 'ready',
            questions: module.interviewQuestions,
            error: null,
          })
        })
      })
      .catch((error: unknown) => {
        if (!isActive) return

        setState({
          status: 'error',
          questions: [],
          error: error instanceof Error ? error : new Error('Failed to load interview questions'),
        })
      })

    return () => {
      isActive = false
    }
  }, [])

  return state
}

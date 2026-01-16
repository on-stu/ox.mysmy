export type QuizAnswer = "O" | "X"

export interface QuizQuestion {
  question: string
  answer: QuizAnswer
  description: string
}

export interface UserAnswer {
  questionIndex: number
  userAnswer: QuizAnswer
  correctAnswer: QuizAnswer
  question: QuizQuestion
  isCorrect: boolean
}

export type QuizYear = "2024" | "2025"

export interface QuizState {
  year: QuizYear | null
  questions: QuizQuestion[]
  currentQuestionIndex: number
  userAnswers: UserAnswer[]
  isAnswerRevealed: boolean
  isQuizComplete: boolean
}

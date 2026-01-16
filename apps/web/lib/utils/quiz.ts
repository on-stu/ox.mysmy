import type { QuizQuestion, QuizYear } from "@/lib/types/quiz"
import data2024 from "@/lib/constants/2024_law.json"
import data2025 from "@/lib/constants/2025_law.json"

/**
 * Load questions for a specific year
 */
export function loadQuestions(year: QuizYear): QuizQuestion[] {
  const data = year === "2024" ? data2024 : data2025
  return data as QuizQuestion[]
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Load and shuffle questions for a specific year
 */
export function loadAndShuffleQuestions(year: QuizYear): QuizQuestion[] {
  const questions = loadQuestions(year)
  return shuffleArray(questions)
}

/**
 * Get total number of questions for a year
 */
export function getQuestionCount(year: QuizYear): number {
  return loadQuestions(year).length
}

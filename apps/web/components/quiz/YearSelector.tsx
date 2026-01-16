"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import type { QuizYear } from "@/lib/types/quiz"
import { getQuestionCount } from "@/lib/utils/quiz"

interface YearSelectorProps {
  onSelectYear: (year: QuizYear) => void
}

export function YearSelector({ onSelectYear }: YearSelectorProps) {
  const count2024 = getQuestionCount("2024")
  const count2025 = getQuestionCount("2025")

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 max-w-[480px] mx-auto w-full">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">OX 퀴즈</CardTitle>
          <CardDescription className="text-base">
            연도를 선택하여 퀴즈를 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button
            onClick={() => onSelectYear("2024")}
            size="lg"
            className="h-14 text-lg font-semibold w-full"
          >
            2024년 ({count2024}문제)
          </Button>
          <Button
            onClick={() => onSelectYear("2025")}
            size="lg"
            className="h-14 text-lg font-semibold w-full"
          >
            2025년 ({count2025}문제)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Progress } from "@workspace/ui/components/progress"
import { Badge } from "@workspace/ui/components/badge"

interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
}

export function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className="w-full space-y-2 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-sm">
          {currentQuestion} / {totalQuestions}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

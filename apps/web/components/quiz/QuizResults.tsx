"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Trophy, RotateCcw, Eye } from "lucide-react"

interface QuizResultsProps {
  totalQuestions: number
  correctAnswers: number
  onReview: () => void
  onRestart: () => void
}

export function QuizResults({
  totalQuestions,
  correctAnswers,
  onReview,
  onRestart,
}: QuizResultsProps) {
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const incorrectAnswers = totalQuestions - correctAnswers

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 max-w-[480px] mx-auto w-full">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl mb-2">퀴즈 완료!</CardTitle>
          <CardDescription className="text-base">
            결과를 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold">{score}점</div>
            <div className="text-lg text-muted-foreground">
              {correctAnswers} / {totalQuestions} 정답
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Badge variant="default" className="text-sm px-3 py-1">
              정답: {correctAnswers}
            </Badge>
            <Badge variant="destructive" className="text-sm px-3 py-1">
              오답: {incorrectAnswers}
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            {incorrectAnswers > 0 && (
              <Button
                onClick={onReview}
                size="lg"
                variant="outline"
                className="h-14 text-lg font-semibold w-full"
              >
                <Eye className="h-5 w-5 mr-2" />
                오답 보기
              </Button>
            )}
            <Button
              onClick={onRestart}
              size="lg"
              className="h-14 text-lg font-semibold w-full"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              다시 시작
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

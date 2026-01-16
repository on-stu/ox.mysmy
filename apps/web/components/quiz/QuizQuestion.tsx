"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import type { QuizQuestion as QuizQuestionType, QuizAnswer } from "@/lib/types/quiz"
import { CheckCircle2, XCircle } from "lucide-react"

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (answer: QuizAnswer) => void
  isAnswerRevealed: boolean
  userAnswer: QuizAnswer | null
}

export function QuizQuestion({
  question,
  onAnswer,
  isAnswerRevealed,
  userAnswer,
}: QuizQuestionProps) {
  const isCorrect = userAnswer === question.answer
  const showResult = isAnswerRevealed && userAnswer !== null

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-[480px] mx-auto w-full gap-4">
      <Card className="w-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed font-normal">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-end gap-4 pb-6">
          {showResult && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <Badge variant="default" className="bg-green-600 dark:bg-green-500">
                      정답입니다!
                    </Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <Badge variant="destructive">틀렸습니다</Badge>
                  </>
                )}
              </div>
              <div className="p-3 rounded-lg bg-muted space-y-2">
                <div className="text-sm font-medium">
                  정답: <span className="font-bold">{question.answer}</span>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {question.description}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={() => onAnswer("O")}
              disabled={isAnswerRevealed}
              size="lg"
              variant={showResult && userAnswer === "O" ? (isCorrect ? "default" : "destructive") : "outline"}
              className="flex-1 h-14 text-lg font-semibold"
            >
              O
            </Button>
            <Button
              onClick={() => onAnswer("X")}
              disabled={isAnswerRevealed}
              size="lg"
              variant={showResult && userAnswer === "X" ? (isCorrect ? "default" : "destructive") : "outline"}
              className="flex-1 h-14 text-lg font-semibold"
            >
              X
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

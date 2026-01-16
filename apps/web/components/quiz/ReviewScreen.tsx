"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import type { UserAnswer } from "@/lib/types/quiz"
import { XCircle, ArrowLeft } from "lucide-react"

interface ReviewScreenProps {
  incorrectAnswers: UserAnswer[]
  onBack: () => void
}

export function ReviewScreen({ incorrectAnswers, onBack }: ReviewScreenProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] p-4 max-w-[480px] mx-auto w-full">
      <div className="mb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          돌아가기
        </Button>
        <h2 className="text-xl font-semibold">오답 노트</h2>
        <p className="text-sm text-muted-foreground mt-1">
          총 {incorrectAnswers.length}개의 오답
        </p>
      </div>

      <div className="flex-1 space-y-4 pb-4">
        {incorrectAnswers.map((answer, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex items-start gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <CardTitle className="text-base leading-relaxed font-normal flex-1">
                  {answer.question.question}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="destructive" className="text-xs">
                  내 답: {answer.userAnswer}
                </Badge>
                <Badge variant="default" className="text-xs bg-green-600 dark:bg-green-500">
                  정답: {answer.correctAnswer}
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {answer.question.description}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

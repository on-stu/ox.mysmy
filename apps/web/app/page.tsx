"use client";

import { useState, useCallback } from "react";
import type { QuizYear, QuizAnswer, UserAnswer } from "@/lib/types/quiz";
import { loadAndShuffleQuestions } from "@/lib/utils/quiz";
import { Button } from "@workspace/ui/components/button";
import { YearSelector } from "@/components/quiz/YearSelector";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizResults } from "@/components/quiz/QuizResults";
import { ReviewScreen } from "@/components/quiz/ReviewScreen";

type Screen = "year-selection" | "quiz" | "results" | "review";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("year-selection");
  const [year, setYear] = useState<QuizYear | null>(null);
  const [questions, setQuestions] = useState(loadAndShuffleQuestions("2024"));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleSelectYear = useCallback((selectedYear: QuizYear) => {
    setYear(selectedYear);
    const shuffledQuestions = loadAndShuffleQuestions(selectedYear);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsAnswerRevealed(false);
    setScreen("quiz");
  }, []);

  const handleAnswer = useCallback(
    (answer: QuizAnswer) => {
      if (isAnswerRevealed) return;

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion?.answer;

      const userAnswer: UserAnswer = {
        questionIndex: currentQuestionIndex,
        userAnswer: answer,
        correctAnswer: currentQuestion?.answer || "O",
        question: currentQuestion || {
          question: "",
          answer: "O",
          description: "",
        },
        isCorrect,
      };

      setUserAnswers((prev) => [...prev, userAnswer]);
      setIsAnswerRevealed(true);
    },
    [currentQuestionIndex, questions, isAnswerRevealed]
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerRevealed(false);
    } else {
      setScreen("results");
    }
  }, [currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    if (year) {
      const shuffledQuestions = loadAndShuffleQuestions(year);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setIsAnswerRevealed(false);
      setScreen("quiz");
    } else {
      setScreen("year-selection");
    }
  }, [year]);

  const handleReview = useCallback(() => {
    setScreen("review");
  }, []);

  const handleBackFromReview = useCallback(() => {
    setScreen("results");
  }, []);

  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect);

  return (
    <div className="min-h-[100dvh] bg-background">
      {screen === "year-selection" && (
        <YearSelector onSelectYear={handleSelectYear} />
      )}

      {screen === "quiz" && (
        <div className="flex flex-col">
          <div className="pt-4">
            <QuizProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </div>
          <QuizQuestion
            question={
              questions[currentQuestionIndex] || {
                question: "",
                answer: "O",
                description: "",
              }
            }
            onAnswer={handleAnswer}
            isAnswerRevealed={isAnswerRevealed}
            userAnswer={userAnswers[currentQuestionIndex]?.userAnswer || null}
          />
          {isAnswerRevealed && (
            <div className="px-4 pb-4 max-w-[480px] mx-auto w-full">
              <Button
                onClick={handleNextQuestion}
                size="lg"
                className="w-full h-12 text-base font-semibold"
              >
                {currentQuestionIndex < questions.length - 1 ?
                  "다음 문제"
                : "결과 보기"}
              </Button>
            </div>
          )}
        </div>
      )}

      {screen === "results" && (
        <QuizResults
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          onReview={handleReview}
          onRestart={handleRestart}
        />
      )}

      {screen === "review" && (
        <ReviewScreen
          incorrectAnswers={incorrectAnswers}
          onBack={handleBackFromReview}
        />
      )}
    </div>
  );
}

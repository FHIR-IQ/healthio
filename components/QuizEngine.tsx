"use client";

import { useState, useEffect, useCallback } from "react";
import { Question, getQuizQuestions } from "@/lib/questions";
import {
  calculateBadgeTier,
  generateBadgeId,
  BadgeResult,
  badgeConfig,
} from "@/lib/badge";
import { saveBadgeResult } from "@/lib/storage";
import BadgeVisual from "./BadgeVisual";
import SharePanel from "./SharePanel";

interface QuizEngineProps {
  playerName: string;
  onRestart: () => void;
}

type QuizState = "playing" | "result";

export default function QuizEngine({ playerName, onRestart }: QuizEngineProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizState, setQuizState] = useState<QuizState>("playing");
  const [badgeResult, setBadgeResult] = useState<BadgeResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setQuestions(getQuizQuestions(10));
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0
    ? ((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100
    : 0;

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(answerIndex);
      setShowExplanation(true);

      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      if (isCorrect) setScore((s) => s + 1);
      setAnswers((a) => [...a, answerIndex]);
    },
    [selectedAnswer, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setIsTransitioning(false);
      }, 300);
    } else {
      // Quiz complete
      const finalScore = score;
      const tier = calculateBadgeTier(finalScore, questions.length);

      if (tier) {
        const result: BadgeResult = {
          tier,
          score: finalScore,
          totalQuestions: questions.length,
          percentage: Math.round((finalScore / questions.length) * 100),
          name: playerName,
          date: new Date().toISOString(),
          badgeId: generateBadgeId(),
        };
        setBadgeResult(result);
        saveBadgeResult(result);

        // Trigger confetti for gold
        if (tier === "gold" && typeof window !== "undefined") {
          import("canvas-confetti").then((confetti) => {
            const fire = confetti.default;
            fire({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            setTimeout(() => {
              fire({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
            }, 500);
          });
        }
      }

      setQuizState("result");
    }
  }, [currentIndex, questions.length, score, playerName]);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-fhir-flame border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (quizState === "result") {
    return (
      <ResultScreen
        badgeResult={badgeResult}
        score={score}
        total={questions.length}
        playerName={playerName}
        onRestart={onRestart}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/50 text-sm font-mono">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-fhir-flame text-sm font-bold">{score}</span>
            <span className="text-white/30 text-sm">correct</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fhir-flame to-fhir-accent rounded-full progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              currentQuestion.difficulty === "beginner"
                ? "bg-green-500/20 text-green-400"
                : currentQuestion.difficulty === "intermediate"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {currentQuestion.difficulty}
          </span>
          <span className="text-xs text-white/30">{currentQuestion.category}</span>
        </div>
      </div>

      {/* Question */}
      <div
        className={`transition-all duration-300 ${
          isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            const showResult = showExplanation;

            let optionStyle = "glass hover:bg-white/10 cursor-pointer";
            if (showResult) {
              if (isCorrect) {
                optionStyle =
                  "bg-green-500/20 border-green-500/50 border";
              } else if (isSelected && !isCorrect) {
                optionStyle =
                  "bg-red-500/20 border-red-500/50 border";
              } else {
                optionStyle = "glass opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${optionStyle} group`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      showResult && isCorrect
                        ? "bg-green-500 text-white"
                        : showResult && isSelected
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white/60 group-hover:bg-fhir-flame/20 group-hover:text-fhir-flame"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-white/90 pt-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="animate-slide-up">
            <div className="glass-strong rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl">
                  {selectedAnswer === currentQuestion.correctAnswer ? "✅" : "💡"}
                </span>
                <p className="text-white/70 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              {currentIndex < questions.length - 1
                ? "Next Question →"
                : "See Results 🏆"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultScreen({
  badgeResult,
  score,
  total,
  playerName,
  onRestart,
}: {
  badgeResult: BadgeResult | null;
  score: number;
  total: number;
  playerName: string;
  onRestart: () => void;
}) {
  const percentage = Math.round((score / total) * 100);

  if (!badgeResult) {
    // Below 50% - no badge earned
    return (
      <div className="max-w-lg mx-auto px-4 text-center animate-fade-in">
        <div className="glass-strong rounded-2xl p-8 mb-8">
          <span className="text-6xl mb-6 block">📚</span>
          <h2 className="text-2xl font-bold text-white mb-2">Keep Learning!</h2>
          <p className="text-white/60 mb-4">
            You scored {percentage}% ({score}/{total})
          </p>
          <p className="text-white/50 text-sm mb-6">
            You need 50% or higher to earn a FHIR IQ Badge. Check out the{" "}
            <a
              href="https://fhiriq.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fhir-accent hover:underline"
            >
              FHIR IQ Playbook
            </a>{" "}
            on Substack and the{" "}
            <a
              href="https://outofthefhir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fhir-flame hover:underline"
            >
              Out of the FHIR
            </a>{" "}
            podcast to level up!
          </p>
          <button
            onClick={onRestart}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-fhir-flame to-fhir-ember text-white font-bold hover:opacity-90 transition-opacity"
          >
            Try Again 🔥
          </button>
        </div>
      </div>
    );
  }

  const config = badgeConfig[badgeResult.tier];

  return (
    <div className="max-w-lg mx-auto px-4 text-center">
      <div className="animate-fade-in mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Badge Earned! 🎉
        </h2>
        <p className={`text-lg ${config.textColor}`}>{config.title}</p>
      </div>

      {/* Badge */}
      <div className="flex justify-center mb-8">
        <BadgeVisual
          tier={badgeResult.tier}
          name={badgeResult.name}
          score={badgeResult.score}
          total={badgeResult.totalQuestions}
          badgeId={badgeResult.badgeId}
          size="lg"
        />
      </div>

      {/* Description */}
      <div className="glass-strong rounded-2xl p-6 mb-6 animate-slide-up">
        <p className="text-white/70">{config.description}</p>
      </div>

      {/* Share panel */}
      <SharePanel badgeResult={badgeResult} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={onRestart}
          className="flex-1 py-3 rounded-xl glass hover:bg-white/10 text-white font-semibold transition-colors"
        >
          Retake Quiz
        </button>
        <a
          href="https://fhiriq.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fhir-purple to-fhir-accent text-white font-semibold hover:opacity-90 transition-opacity text-center"
        >
          FHIR IQ Playbook →
        </a>
      </div>
    </div>
  );
}

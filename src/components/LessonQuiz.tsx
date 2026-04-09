import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export function LessonQuiz({ questions, onComplete }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    new Array(questions.length).fill(null)
  );

  const q = questions[currentQuestion];
  const isCorrect = answered && Number(selectedAnswer) === q.correctIndex;

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const correct = Number(selectedAnswer) === q.correctIndex;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    setAnswered(true);
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestion] = correct;
      return copy;
    });

    if (correct) {
      toast("✅ Correto!", { description: q.explanation, duration: 4000 });
    } else {
      toast("❌ Incorreto!", {
        description: q.explanation,
        duration: 5000,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setAnswered(false);
    } else {
      setFinished(true);
      onComplete(score, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers(new Array(questions.length).fill(null));
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="border-accent/30 shadow-card">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
            Quiz Finalizado!
          </h3>
          <p className="text-foreground/80 mb-2">
            Você acertou <span className="font-bold text-progress">{score}</span> de{" "}
            <span className="font-bold">{questions.length}</span> questões ({percentage}%)
          </p>
          <p className="text-sm text-muted-foreground mb-1">
            {percentage >= 80
              ? "🎉 Excelente! O Prof. Diógenes está orgulhoso!"
              : percentage >= 50
              ? "👍 Bom trabalho! Revise os pontos que errou e tente novamente."
              : "📚 Continue estudando! Revise o conteúdo da aula e tente de novo."}
          </p>

          {/* Indicators */}
          <div className="flex justify-center gap-2 my-4">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  a === true
                    ? "bg-progress/20 text-progress"
                    : "bg-destructive/20 text-destructive"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <Button onClick={handleRetry} variant="outline" className="gap-2 mt-2">
            <RotateCcw className="h-4 w-4" />
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-accent/30 shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            📝 Quiz da Aula
          </h3>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentQuestion
                  ? answers[i]
                    ? "bg-progress"
                    : "bg-destructive"
                  : i === currentQuestion
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <p className="text-foreground font-medium mb-4">{q.question}</p>

        <RadioGroup
          value={selectedAnswer}
          onValueChange={(v) => !answered && setSelectedAnswer(v)}
          className="gap-3"
        >
          {q.options.map((option, i) => {
            const isThis = answered && Number(selectedAnswer) === i;
            const isCorrectOption = answered && i === q.correctIndex;
            return (
              <Label
                key={i}
                htmlFor={`q-${i}`}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  isCorrectOption
                    ? "border-progress bg-progress/10"
                    : isThis && !isCorrect
                    ? "border-destructive bg-destructive/10"
                    : answered
                    ? "opacity-60"
                    : "hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value={String(i)} id={`q-${i}`} disabled={answered} />
                <span className="text-sm text-foreground flex-1">{option}</span>
                {isCorrectOption && answered && <CheckCircle className="h-4 w-4 text-progress" />}
                {isThis && !isCorrect && answered && <XCircle className="h-4 w-4 text-destructive" />}
              </Label>
            );
          })}
        </RadioGroup>

        <div className="flex justify-end mt-6 gap-3">
          {!answered ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-primary text-primary-foreground"
            >
              Responder
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? "Próxima →" : "Ver Resultado"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

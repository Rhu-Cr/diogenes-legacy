import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useProgress } from "@/hooks/useProgress";
import { DiogenesChatbot } from "@/components/DiogenesChatbot";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Code, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import diogenesImg from "@/assets/diogenes.png";
import { LessonQuiz } from "@/components/LessonQuiz";
import { GlossarySidebar } from "@/components/GlossarySidebar";
import type { LessonData } from "@/data/lessonTypes";
import { algoritmosLessons } from "@/data/algoritmosLessons";
import { estruturasLessons } from "@/data/estruturasLessons";
import { engenhariaLessons } from "@/data/engenhariaLessons";

const lessons: Record<string, Record<string, LessonData>> = {
  algoritmos: algoritmosLessons,
  estruturas: estruturasLessons,
  engenharia: engenhariaLessons,
};

export default function Lesson() {
  const { pathId, lessonId } = useParams<{ pathId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { isLessonCompleted, completeLesson: saveLessonProgress } = useProgress();
  const lessonKey = `${pathId}-${lessonId}`;
  const completed = isLessonCompleted(lessonKey);

  useEffect(() => {
    const hasStudent = localStorage.getItem("student_id");
    if (!hasStudent) navigate("/cadastro");
  }, [navigate]);


  const lesson = lessons[pathId!]?.[lessonId!];
  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Aula não encontrada.</p>
      </div>
    );
  }

  const handleCompleteLesson = async (score = 0, total = 0) => {
    await saveLessonProgress(lessonKey, score, total);
    toast("🎉 Prof. Diógenes diz:", {
      description: "Excelente trabalho! Sua lógica está compilando perfeitamente! Continue assim!",
      duration: 6000,
    });
  };

  const handleQuizComplete = (score: number, total: number) => {
    if (score === total) {
      handleCompleteLesson(score, total);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{lesson.title}</span>
          </div>

          {/* Title + Difficulty */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{lesson.title}</h1>
            <Badge variant="outline" className={
              lesson.difficulty === "Iniciante" ? "bg-progress/10 text-progress border-progress/20" :
              lesson.difficulty === "Intermediário" ? "bg-accent/10 text-accent border-accent/20" :
              "bg-primary/10 text-primary border-primary/20"
            }>{lesson.difficulty}</Badge>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {lesson.content.split("\n").map((line, i) => {
              if (line.startsWith("### ")) return <h3 key={i} className="font-heading text-xl font-bold text-foreground mt-6 mb-3">{line.replace("### ", "")}</h3>;
              if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-foreground">{line.replace(/\*\*/g, "")}</p>;
              if (line.startsWith("- ")) return <li key={i} className="text-foreground/80 ml-4 list-disc">{line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
              if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ") || line.startsWith("6. ") || line.startsWith("7. ")) return <li key={i} className="text-foreground/80 ml-4 list-decimal">{line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-foreground/80 leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
            })}
          </div>

          {/* Code Example */}
          <Card className="mb-8 shadow-card overflow-hidden">
            <div className="bg-primary px-4 py-2 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Exemplo de Código</span>
            </div>
            <CardContent className="p-0">
              <pre className="bg-foreground/5 p-6 overflow-x-auto text-sm leading-relaxed">
                <code className="text-foreground/90">{lesson.codeExample}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Diógenes Tip */}
          <div className="flex gap-4 items-start bg-gold-light/30 border border-accent/20 rounded-xl p-6 mb-8" role="note">
            <img src={diogenesImg} alt="" className="w-12 h-12 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground flex items-center gap-2 mb-1">
                <Lightbulb className="h-4 w-4 text-accent" />
                Dica do Prof. Diógenes
              </p>
              <p className="text-foreground/80 text-sm italic">"{lesson.diogenesTip}"</p>
            </div>
          </div>

          {/* Quiz */}
          <div className="mb-8">
            <LessonQuiz questions={lesson.quiz} onComplete={handleQuizComplete} />
          </div>

          {/* Challenge */}
          <Card className="mb-8 border-accent/30 shadow-card">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                🏆 Desafio Prático
              </h3>
              <p className="text-foreground/80 mb-4">{lesson.challenge}</p>
              {!completed ? (
                <Button
                  onClick={() => handleCompleteLesson()}
                  className="bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90 gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Marcar como Concluído
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-progress font-semibold">
                  <CheckCircle className="h-5 w-5" />
                  Aula concluída! Parabéns! 🎉
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <GlossarySidebar />
      <DiogenesChatbot />
    </div>
  );
}

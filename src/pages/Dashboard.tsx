import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { DiogenesChatbot } from "@/components/DiogenesChatbot";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Code, Database, Layers, LogOut, BookOpen, Trophy, TrendingUp } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";
import { useProgress } from "@/hooks/useProgress";

const diogenesMessages = [
  "Que bom ver você por aqui! Vamos aprender algo novo hoje? 🚀",
  "Lembre-se: cada linha de código é um passo rumo à maestria! 💪",
  "A persistência é o melhor algoritmo para o sucesso! 🎯",
  "Errar faz parte — até meu primeiro programa deu segfault! 😄",
];

const paths = [
  {
    id: "algoritmos",
    icon: Code,
    title: "Algoritmos",
    description: "Busca, ordenação, recursão e programação dinâmica.",
    level: "Iniciante",
    modules: [
      { id: "intro", title: "Introdução a Algoritmos", duration: "15 min", difficulty: "Iniciante" },
      { id: "variaveis", title: "Variáveis e Tipos de Dados", duration: "15 min", difficulty: "Iniciante" },
      { id: "condicionais", title: "Condicionais (If/Else)", duration: "15 min", difficulty: "Iniciante" },
      { id: "loops", title: "Loops (Repetição)", duration: "15 min", difficulty: "Iniciante" },
      { id: "busca", title: "Algoritmos de Busca", duration: "20 min", difficulty: "Intermediário" },
      { id: "ordenacao", title: "Algoritmos de Ordenação", duration: "25 min", difficulty: "Intermediário" },
      { id: "recursao", title: "Recursão", duration: "20 min", difficulty: "Avançado" },
    ],
    color: "text-accent",
  },
  {
    id: "estruturas",
    icon: Database,
    title: "Estruturas de Dados",
    description: "Listas, pilhas, filas, árvores e grafos.",
    level: "Intermediário",
    modules: [
      { id: "listas", title: "Listas Encadeadas", duration: "20 min", difficulty: "Intermediário" },
      { id: "pilhas", title: "Pilhas e Filas", duration: "15 min", difficulty: "Intermediário" },
      { id: "arvores", title: "Árvores Binárias", duration: "25 min", difficulty: "Avançado" },
      { id: "grafos", title: "Grafos", duration: "30 min", difficulty: "Avançado" },
    ],
    color: "text-progress",
  },
  {
    id: "engenharia",
    icon: Layers,
    title: "Engenharia de Software",
    description: "Padrões de projeto, arquitetura e boas práticas.",
    level: "Avançado",
    modules: [
      { id: "solid", title: "Princípios SOLID", duration: "20 min", difficulty: "Avançado" },
      { id: "padroes", title: "Padrões de Projeto", duration: "25 min", difficulty: "Avançado" },
      { id: "testes", title: "Testes de Software", duration: "20 min", difficulty: "Intermediário" },
      { id: "arquitetura", title: "Arquitetura de Software", duration: "30 min", difficulty: "Avançado" },
    ],
    color: "text-navy-light",
  },
];

const levelColors: Record<string, string> = {
  Iniciante: "bg-progress/10 text-progress border-progress/20",
  Intermediário: "bg-accent/10 text-accent border-accent/20",
  Avançado: "bg-primary/10 text-primary border-primary/20",
};

const difficultyDot: Record<string, string> = {
  Iniciante: "bg-progress",
  Intermediário: "bg-accent",
  Avançado: "bg-primary",
};

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { completedLessonIds, totalLessonPoints, totalChallengePoints } = useProgress();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      const msg = diogenesMessages[Math.floor(Math.random() * diogenesMessages.length)];
      toast("Prof. Diógenes diz:", { description: msg, duration: 5000 });
    }
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Carregando...</p></div>;
  }

  if (!user) return null;

  const totalModules = paths.reduce((acc, p) => acc + p.modules.length, 0);
  const totalProgress = totalModules > 0 ? Math.round((completedLessonIds.length / totalModules) * 100) : 0;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Até logo! O Prof. Diógenes estará aqui quando você voltar! 👋");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-muted">
        <div
          className="h-full bg-gold-gradient transition-all duration-500"
          style={{ width: `${totalProgress}%` }}
          role="progressbar"
          aria-valuenow={totalProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso geral: ${totalProgress}%`}
        />
      </div>

      <Navbar />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back + Header */}
          <div className="mb-4">
            <BackButton label="Voltar ao Início" to="/" />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                Dashboard do Aluno
              </h1>
              <p className="text-muted-foreground">
                Olá, <span className="font-medium text-foreground">{user.email}</span>! Pronto para aprender?
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild className="gap-2">
                <Link to="/glossario">
                  <BookOpen className="h-4 w-4" />
                  Glossário
                </Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading text-foreground">{totalProgress}%</p>
                  <p className="text-sm text-muted-foreground">Progresso Geral</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-progress/10">
                  <BookOpen className="h-6 w-6 text-progress" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading text-foreground">{completedLessonIds.length}/{totalModules}</p>
                  <p className="text-sm text-muted-foreground">Aulas Concluídas</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-gold-light/30">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading text-foreground">{totalLessonPoints + totalChallengePoints}</p>
                  <p className="text-sm text-muted-foreground">Pontos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trilhas */}
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Suas Trilhas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {paths.map((path) => {
              const pathCompleted = path.modules.filter((m) =>
                completedLessonIds.includes(`${path.id}-${m.id}`)
              ).length;
              const pathProgress = Math.round((pathCompleted / path.modules.length) * 100);

              return (
                <Card key={path.id} className="shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl bg-muted ${path.color} mb-3`}>
                        <path.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className={levelColors[path.level]}>{path.level}</Badge>
                    </div>
                    <CardTitle className="text-lg font-heading">{path.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{pathCompleted}/{path.modules.length} módulos</span>
                        <span>{pathProgress}%</span>
                      </div>
                      <Progress value={pathProgress} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      {path.modules.map((mod) => {
                        const lessonId = `${path.id}-${mod.id}`;
                        const done = completedLessonIds.includes(lessonId);
                        return (
                          <Link
                            key={mod.id}
                            to={`/aula/${path.id}/${mod.id}`}
                            className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                              done ? "bg-progress/10 text-progress" : "bg-muted/50 text-foreground hover:bg-muted"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {done ? "✅" : "📖"} {mod.title}
                            </span>
                            <span className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${difficultyDot[mod.difficulty] || "bg-muted-foreground"}`} title={mod.difficulty} />
                              <span className="text-xs text-muted-foreground">{mod.duration}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <DiogenesChatbot />
    </div>
  );
}

import { Code, Database, GitBranch, Layers, Terminal, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const paths = [
  {
    icon: Code,
    title: "Algoritmos",
    description: "Busca, ordenação, recursão e programação dinâmica com exemplos práticos.",
    level: "Iniciante",
    modules: 12,
    progress: 0,
    color: "text-accent",
  },
  {
    icon: Database,
    title: "Estruturas de Dados",
    description: "Listas, pilhas, filas, árvores e grafos — a base de tudo.",
    level: "Intermediário",
    modules: 10,
    progress: 0,
    color: "text-success",
  },
  {
    icon: Layers,
    title: "Engenharia de Software",
    description: "Padrões de projeto, arquitetura e boas práticas de desenvolvimento.",
    level: "Avançado",
    modules: 8,
    progress: 0,
    color: "text-navy-light",
  },
  {
    icon: Terminal,
    title: "Lógica de Programação",
    description: "Fundamentos essenciais para começar a programar do zero.",
    level: "Iniciante",
    modules: 15,
    progress: 0,
    color: "text-accent",
  },
  {
    icon: GitBranch,
    title: "Controle de Versão",
    description: "Git, GitHub e fluxos de trabalho colaborativos.",
    level: "Iniciante",
    modules: 6,
    progress: 0,
    color: "text-accent",
  },
  {
    icon: Cpu,
    title: "Sistemas Operacionais",
    description: "Processos, threads, memória e gerenciamento de recursos.",
    level: "Avançado",
    modules: 9,
    progress: 0,
    color: "text-navy-light",
  },
];

const levelColors: Record<string, string> = {
  Iniciante: "bg-success/10 text-success border-success/20",
  Intermediário: "bg-accent/10 text-accent border-accent/20",
  Avançado: "bg-primary/10 text-primary border-primary/20",
};

export function LearningPaths() {
  return (
    <section id="trilhas" className="py-20 bg-background" aria-labelledby="paths-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 id="paths-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trilhas de Aprendizado
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            "Cada trilha é como um algoritmo: tem começo, meio e fim. Mas o conhecimento, esse é infinito!" — Prof. Diógenes
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <Card
              key={path.title}
              className="group shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50"
              style={{ animationDelay: `${i * 100}ms` }}
              tabIndex={0}
              role="article"
              aria-label={`Trilha: ${path.title} — ${path.level}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-muted ${path.color} mb-3`}>
                    <path.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <Badge variant="outline" className={levelColors[path.level]}>
                    {path.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-heading">{path.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{path.modules} módulos</span>
                    <span>{path.progress}% completo</span>
                  </div>
                  <Progress value={path.progress} className="h-1.5" aria-label={`Progresso: ${path.progress}%`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

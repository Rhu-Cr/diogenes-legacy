import { Trophy, Star, Clock, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const challenges = [
  {
    title: "Ordene o Array",
    description: "Implemente o algoritmo Bubble Sort e otimize sua performance.",
    difficulty: "Fácil",
    points: 100,
    time: "15 min",
    topic: "Algoritmos",
  },
  {
    title: "Árvore Binária de Busca",
    description: "Construa uma BST e implemente a busca, inserção e remoção.",
    difficulty: "Médio",
    points: 250,
    time: "30 min",
    topic: "Estruturas de Dados",
  },
  {
    title: "Padrão Observer",
    description: "Implemente o padrão Observer para um sistema de notificações.",
    difficulty: "Difícil",
    points: 500,
    time: "45 min",
    topic: "Engenharia de Software",
  },
];

const difficultyColors: Record<string, string> = {
  Fácil: "bg-success/10 text-success border-success/20",
  Médio: "bg-accent/10 text-accent border-accent/20",
  Difícil: "bg-destructive/10 text-destructive border-destructive/20",
};

export function ChallengesSection() {
  return (
    <section id="desafios" className="py-20 bg-muted/50" aria-labelledby="challenges-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-accent" aria-hidden="true" />
          </div>
          <h2 id="challenges-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Desafios do Professor
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            "Programação sem desafio é como um laço sem condição de parada — não leva a lugar nenhum!" — Prof. Diógenes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {challenges.map((challenge) => (
            <Card key={challenge.title} className="shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className={difficultyColors[challenge.difficulty]}>
                    {challenge.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                    <span className="text-sm font-semibold">{challenge.points} pts</span>
                  </div>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {challenge.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                      {challenge.topic}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90 transition-opacity" size="sm">
                  Aceitar Desafio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

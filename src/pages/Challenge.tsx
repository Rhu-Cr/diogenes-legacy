import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { DiogenesChatbot } from "@/components/DiogenesChatbot";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Clock, Play, RotateCcw, CheckCircle, Star, Lightbulb, Send } from "lucide-react";
import { toast } from "sonner";
import diogenesImg from "@/assets/diogenes.png";
import { useProgress } from "@/hooks/useProgress";

interface ChallengeData {
  title: string;
  description: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  points: number;
  timeMinutes: number;
  topic: string;
  instructions: string;
  starterCode: string;
  hints: string[];
  expectedOutput: string;
  diogenesTip: string;
}

const challengesData: Record<string, ChallengeData> = {
  "ordene-array": {
    title: "Ordene o Array",
    description: "Implemente o algoritmo Bubble Sort e otimize sua performance.",
    difficulty: "Fácil",
    points: 100,
    timeMinutes: 15,
    topic: "Algoritmos",
    instructions: `## Objetivo\nImplemente o algoritmo **Bubble Sort** para ordenar um array de números inteiros.\n\n### Requisitos:\n1. A função deve receber um array de números\n2. Retornar o array ordenado em ordem crescente\n3. **Bônus**: Otimize para parar cedo se o array já estiver ordenado\n\n### Exemplo:\n- Entrada: [64, 34, 25, 12, 22, 11, 90]\n- Saída: [11, 12, 22, 25, 34, 64, 90]`,
    starterCode: `function bubbleSort(arr) {
  // Seu código aqui!
  // Dica: use dois loops aninhados
  // Compare elementos adjacentes e troque se necessário
  
  return arr;
}

// Teste sua solução:
const resultado = bubbleSort([64, 34, 25, 12, 22, 11, 90]);
console.log(resultado);
// Esperado: [11, 12, 22, 25, 34, 64, 90]`,
    hints: [
      "Use dois loops: o externo controla as passadas, o interno compara os pares.",
      "Para trocar dois elementos, use destructuring: [arr[j], arr[j+1]] = [arr[j+1], arr[j]]",
      "Para otimizar: adicione uma flag 'trocou'. Se em uma passada não houve troca, o array já está ordenado!"
    ],
    expectedOutput: "[11, 12, 22, 25, 34, 64, 90]",
    diogenesTip: "Bubble Sort é como organizar cartas na mão: você compara duas vizinhas e troca se estiverem fora de ordem. Simples, mas eficaz para começar!"
  },
  "arvore-binaria": {
    title: "Árvore Binária de Busca",
    description: "Construa uma BST e implemente a busca, inserção e remoção.",
    difficulty: "Médio",
    points: 250,
    timeMinutes: 30,
    topic: "Estruturas de Dados",
    instructions: `## Objetivo\nImplemente uma **Árvore Binária de Busca (BST)** com as operações fundamentais.\n\n### Requisitos:\n1. Implemente o método \`inserir(valor)\` para adicionar nós\n2. Implemente o método \`buscar(valor)\` que retorna true/false\n3. Implemente o método \`emOrdem()\` que retorna os valores em ordem crescente\n\n### Exemplo:\n- Inserir: 8, 3, 10, 1, 6, 14\n- emOrdem(): [1, 3, 6, 8, 10, 14]\n- buscar(6): true\n- buscar(7): false`,
    starterCode: `class No {
  constructor(valor) {
    this.valor = valor;
    this.esquerda = null;
    this.direita = null;
  }
}

class BST {
  constructor() {
    this.raiz = null;
  }

  inserir(valor) {
    // Seu código aqui!
  }

  buscar(valor) {
    // Seu código aqui!
    return false;
  }

  emOrdem() {
    const resultado = [];
    // Seu código aqui!
    return resultado;
  }
}

// Teste:
const arvore = new BST();
[8, 3, 10, 1, 6, 14].forEach(v => arvore.inserir(v));
console.log("Em ordem:", arvore.emOrdem());
console.log("Buscar 6:", arvore.buscar(6));
console.log("Buscar 7:", arvore.buscar(7));`,
    hints: [
      "Na inserção: se o valor é menor que o nó atual, vá para a esquerda; se maior, vá para a direita.",
      "Na busca: use a mesma lógica — compare e escolha o lado. Se chegou a null, o valor não existe.",
      "Para emOrdem: faça recursão esquerda → adicione o valor → recursão direita."
    ],
    expectedOutput: "Em ordem: [1, 3, 6, 8, 10, 14]\nBuscar 6: true\nBuscar 7: false",
    diogenesTip: "Uma BST é como um organograma: cada decisão te leva para esquerda ou direita. Se você seguir a lógica, encontra qualquer coisa rapidinho!"
  },
  "padrao-observer": {
    title: "Padrão Observer",
    description: "Implemente o padrão Observer para um sistema de notificações.",
    difficulty: "Difícil",
    points: 500,
    timeMinutes: 45,
    topic: "Engenharia de Software",
    instructions: `## Objetivo\nImplemente o **Padrão Observer** para criar um sistema de notificações.\n\n### Requisitos:\n1. Crie uma classe \`EventEmitter\` (o Subject)\n2. Implemente \`subscribe(evento, callback)\` para registrar observers\n3. Implemente \`emit(evento, dados)\` para notificar observers\n4. Implemente \`unsubscribe(evento, callback)\` para remover observers\n\n### Exemplo:\n- Um sistema de loja online notifica quando um produto fica disponível\n- Diferentes serviços (email, SMS, push) reagem ao evento`,
    starterCode: `class EventEmitter {
  constructor() {
    // Seu código aqui - inicialize a estrutura de dados
  }

  subscribe(evento, callback) {
    // Registrar um observer para um evento
  }

  unsubscribe(evento, callback) {
    // Remover um observer de um evento
  }

  emit(evento, dados) {
    // Notificar todos os observers de um evento
  }
}

// Teste:
const loja = new EventEmitter();

const emailService = (dados) => 
  console.log(\`📧 Email: "\${dados.produto}" disponível!\`);

const smsService = (dados) => 
  console.log(\`📱 SMS: "\${dados.produto}" em estoque!\`);

loja.subscribe("produtoDisponivel", emailService);
loja.subscribe("produtoDisponivel", smsService);

loja.emit("produtoDisponivel", { produto: "RTX 5090" });

loja.unsubscribe("produtoDisponivel", smsService);

loja.emit("produtoDisponivel", { produto: "PS6" });`,
    hints: [
      "Use um Map ou objeto para armazenar arrays de callbacks por nome de evento.",
      "No subscribe: crie o array se não existir, depois adicione o callback.",
      "No emit: itere sobre os callbacks do evento e execute cada um com os dados."
    ],
    expectedOutput: '📧 Email: "RTX 5090" disponível!\n📱 SMS: "RTX 5090" em estoque!\n📧 Email: "PS6" disponível!',
    diogenesTip: "O Observer é como um grupo de WhatsApp: quando alguém manda mensagem, todos que estão no grupo recebem. E quem sai do grupo, para de receber!"
  },
};

const difficultyColors: Record<string, string> = {
  Fácil: "bg-success/10 text-success border-success/20",
  Médio: "bg-accent/10 text-accent border-accent/20",
  Difícil: "bg-destructive/10 text-destructive border-destructive/20",
};

const Challenge = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { completeChallenge: saveChallengeProgress, getChallengeProgress } = useProgress();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const challenge = challengeId ? challengesData[challengeId] : null;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode);
      setTimeLeft(challenge.timeMinutes * 60);
    }
  }, [challenge]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          toast.error("⏰ Tempo esgotado! Mas não desista, tente novamente!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const runCode = () => {
    if (!isRunning) {
      startTimer();
    }

    try {
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: unknown[]) => {
          logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
      };

      // eslint-disable-next-line no-new-func
      const fn = new Function("console", code);
      fn(mockConsole);

      setOutput(logs.join("\n"));

      if (challenge && logs.join("\n").includes(challenge.expectedOutput.split("\n")[0])) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        setCompleted(true);

        const penalty = hintsUsed * 10;
        const finalPoints = Math.max(challenge.points - penalty, Math.floor(challenge.points * 0.5));

        const elapsedSeconds = challenge.timeMinutes * 60 - timeLeft;
        saveChallengeProgress(challengeId!, finalPoints, elapsedSeconds);

        toast.success(`🏆 Desafio concluído! Você ganhou ${finalPoints} pontos!`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setOutput(`❌ Erro: ${errorMessage}`);
      toast.error("Ops! Seu código tem um erro. Revise e tente novamente!");
    }
  };

  const resetChallenge = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setCompleted(false);
    setOutput("");
    setHintsUsed(0);
    setShowHint(false);
    if (challenge) {
      setCode(challenge.starterCode);
      setTimeLeft(challenge.timeMinutes * 60);
    }
  };

  const useHint = () => {
    if (challenge && hintsUsed < challenge.hints.length) {
      setHintsUsed((prev) => prev + 1);
      setShowHint(true);
      toast.info(`💡 Dica ${hintsUsed + 1} revelada! (-10 pontos)`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      setCode(code.substring(0, start) + "  " + code.substring(end));
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Desafio não encontrado</h1>
            <Button onClick={() => navigate("/#desafios")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar aos Desafios
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate("/#desafios")} variant="ghost" size="icon" aria-label="Voltar">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{challenge.title}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="outline" className={difficultyColors[challenge.difficulty]}>
                    {challenge.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{challenge.topic}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 text-lg font-mono font-bold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
              <div className="flex items-center gap-1 text-accent">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold">{challenge.points} pts</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Instructions */}
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="font-heading text-lg font-bold text-foreground mb-3">📋 Instruções</h2>
                  <div className="prose prose-sm text-muted-foreground max-w-none">
                    {challenge.instructions.split("\n").map((line, i) => {
                      if (line.startsWith("## ")) return <h3 key={i} className="text-foreground font-bold text-base mt-3 mb-1">{line.replace("## ", "")}</h3>;
                      if (line.startsWith("### ")) return <h4 key={i} className="text-foreground font-semibold text-sm mt-2 mb-1">{line.replace("### ", "")}</h4>;
                      if (line.startsWith("- ")) return <p key={i} className="ml-4 text-sm">• {line.replace("- ", "")}</p>;
                      if (line.match(/^\d+\./)) return <p key={i} className="ml-4 text-sm">{line}</p>;
                      return line ? <p key={i} className="text-sm">{line}</p> : <br key={i} />;
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Diogenes Tip */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4 flex items-start gap-3">
                  <img src={diogenesImg} alt="Prof. Diógenes" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Dica do Prof. Diógenes:</p>
                    <p className="text-sm text-muted-foreground">{challenge.diogenesTip}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Hints */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-accent" /> Dicas ({hintsUsed}/{challenge.hints.length})
                    </h3>
                    <Button
                      onClick={useHint}
                      variant="outline"
                      size="sm"
                      disabled={hintsUsed >= challenge.hints.length}
                      className="text-xs"
                    >
                      Revelar Dica (-10 pts)
                    </Button>
                  </div>
                  {showHint && (
                    <div className="space-y-2 mt-3">
                      {challenge.hints.slice(0, hintsUsed).map((hint, i) => (
                        <div key={i} className="bg-accent/10 rounded-md p-3 text-sm text-muted-foreground">
                          <span className="font-semibold text-accent">Dica {i + 1}:</span> {hint}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right: Code Editor */}
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border/50">
                    <span className="text-sm font-mono text-muted-foreground">editor.js</span>
                    <div className="flex items-center gap-2">
                      <Button onClick={resetChallenge} variant="ghost" size="sm" className="text-xs">
                        <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reiniciar
                      </Button>
                      <Button onClick={runCode} size="sm" className="bg-success text-success-foreground hover:bg-success/90 text-xs">
                        <Play className="h-3.5 w-3.5 mr-1" /> Executar
                      </Button>
                    </div>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full min-h-[350px] p-4 font-mono text-sm bg-card text-foreground resize-y focus:outline-none"
                    spellCheck={false}
                    aria-label="Editor de código"
                  />
                </CardContent>
              </Card>

              {/* Output */}
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <div className="bg-muted/50 px-4 py-2 border-b border-border/50">
                    <span className="text-sm font-mono text-muted-foreground">console</span>
                  </div>
                  <pre className="p-4 font-mono text-sm min-h-[100px] text-foreground whitespace-pre-wrap">
                    {output || "// A saída do seu código aparecerá aqui..."}
                  </pre>
                </CardContent>
              </Card>

              {/* Completion Card */}
              {completed && (
                <Card className="border-success/30 bg-success/5">
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 text-accent mx-auto mb-3" />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Desafio Concluído! 🎉
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      "Seu código compilou, executou e retornou o resultado certo. Isso é o que eu chamo de pensamento computacional!" — Prof. Diógenes
                    </p>
                    <div className="flex items-center justify-center gap-2 text-accent font-bold text-lg">
                      <Star className="h-5 w-5 fill-current" />
                      {Math.max(challenge.points - hintsUsed * 10, Math.floor(challenge.points * 0.5))} pontos conquistados
                    </div>
                    <Button onClick={() => navigate("/#desafios")} variant="outline" className="mt-4">
                      Voltar aos Desafios
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <DiogenesChatbot />
    </div>
  );
};

export default Challenge;

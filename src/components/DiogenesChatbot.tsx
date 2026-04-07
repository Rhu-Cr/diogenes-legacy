import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import diogenesImg from "@/assets/diogenes.png";

interface Message {
  role: "diogenes" | "user";
  text: string;
}

const greetings = [
  "Olá, jovem aprendiz! 👋 Sou o Professor Diógenes. Como posso ajudar na sua jornada de aprendizado hoje?",
];

const responses: Record<string, string> = {
  algoritmo: "Ah, algoritmos! São como receitas de bolo: passo a passo, você chega ao resultado. Comece pela trilha de Algoritmos — lá eu explico tudo desde o começo! 🎯",
  estrutura: "Estruturas de dados são o esqueleto de qualquer software! Uma boa pilha ou fila pode salvar seu programa. Veja a trilha de Estruturas de Dados! 📚",
  engenharia: "Engenharia de Software é a arte de construir software que não vira uma 'bola de lama'. Padrões de projeto são seus melhores amigos! 🏗️",
  ajuda: "Claro que ajudo! Navegue pelas trilhas de aprendizado acima, ou me pergunte sobre qualquer tema: algoritmos, estruturas de dados, engenharia de software... 💡",
  olá: "Olá! Que bom ter você aqui! Pronto para aprender? Pergunte-me sobre qualquer assunto de computação! 😊",
  oi: "Oi! Bem-vindo à plataforma! Estou aqui para guiar você. O que gostaria de aprender hoje? 🚀",
  desafio: "Gosta de desafios? Excelente! Role até a seção de Desafios e escolha um para testar suas habilidades. Lembre-se: errar faz parte do aprendizado! 💪",
  dica: "Aqui vai uma dica de ouro: sempre decomponha problemas grandes em problemas menores. Isso vale para algoritmos e para a vida! ✨",
  obrigado: "Imagina! Ensinar é minha maior alegria. Continue estudando e praticando — o sucesso é consequência! 🌟",
};

const defaultResponse = "Boa pergunta! Como digo aos meus alunos: 'a curiosidade é o primeiro passo do conhecimento'. Explore as trilhas acima ou tente me perguntar sobre algoritmos, estruturas de dados, ou engenharia de software! 🤔";

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lower.includes(key)) return value;
  }
  return defaultResponse;
}

export function DiogenesChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "diogenes", text: greetings[0] },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", text };
    const botMsg: Message = { role: "diogenes", text: getResponse(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gold-gradient shadow-gold text-secondary-foreground font-semibold rounded-full pl-4 pr-5 py-3 hover:opacity-90 transition-opacity animate-bounce-in"
          aria-label="Abrir chat com o Professor Diógenes"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Falar com Diógenes</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-bounce-in"
          role="dialog"
          aria-label="Chat com o Professor Diógenes"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-hero-gradient p-4 flex items-center gap-3">
            <img src={diogenesImg} alt="" className="w-10 h-10 rounded-full border-2 border-accent/40" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="text-primary-foreground font-semibold text-sm">Prof. Diógenes</h3>
              <p className="text-primary-foreground/60 text-xs">Online — pronto para ensinar!</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="p-3 border-t flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ao Prof. Diógenes..."
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Sua mensagem"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-gold-gradient text-secondary-foreground hover:opacity-90 rounded-xl"
              aria-label="Enviar mensagem"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import diogenesImg from "@/assets/diogenes.png";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Olá, jovem aprendiz! 👋 Sou o **Professor Diógenes**, seu mentor virtual em TI.\n\nPergunte-me sobre algoritmos, estruturas de dados, programação, redes, bancos de dados, carreira em tecnologia... estou aqui para te guiar!",
};

const STORAGE_KEY = "diogenes-chat-history";
const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diogenes-chat`;

const suggestions = [
  "O que é um algoritmo?",
  "Diferença entre pilha e fila?",
  "Como começar em programação?",
  "O que é Git?",
];

export function DiogenesChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [INITIAL_MESSAGE];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [INITIAL_MESSAGE];
    } catch {
      return [INITIAL_MESSAGE];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (open && !loading) inputRef.current?.focus();
  }, [open, loading, messages.length]);

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(FUNCTIONS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        let errMsg = "Falha ao falar com o Diógenes.";
        try {
          const data = await resp.json();
          if (data?.error) errMsg = data.error;
        } catch {}
        toast.error(errMsg);
        setMessages(history);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const data = trimmedLine.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: acc };
                return next;
              });
            }
          } catch {}
        }
      }

      if (!acc) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: "Hmm, fiquei sem palavras. Pode reformular a pergunta? 🤔",
          };
          return next;
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão com o Diógenes.");
      setMessages(history);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
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

      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-bounce-in"
          role="dialog"
          aria-label="Chat com o Professor Diógenes"
          style={{ height: "min(600px, calc(100vh - 3rem))" }}
        >
          <div className="bg-hero-gradient p-4 flex items-center gap-3">
            <img
              src={diogenesImg}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-accent/40"
              aria-hidden="true"
            />
            <div className="flex-1">
              <h3 className="text-primary-foreground font-semibold text-sm">Prof. Diógenes</h3>
              <p className="text-primary-foreground/60 text-xs">
                {loading ? "Pensando…" : "IA online — especialista em TI"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={clearChat}
              aria-label="Limpar conversa"
              title="Limpar conversa"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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

          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    msg.content ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2 prose-pre:bg-background prose-pre:text-foreground prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-headings:my-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && !loading && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs bg-muted hover:bg-muted/70 text-foreground rounded-full px-3 py-1.5 transition-colors border"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre TI..."
              disabled={loading}
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
              aria-label="Sua mensagem"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="bg-gold-gradient text-secondary-foreground hover:opacity-90 rounded-xl disabled:opacity-50"
              aria-label="Enviar mensagem"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

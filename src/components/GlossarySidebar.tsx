import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Search } from "lucide-react";

interface Term {
  term: string;
  definition: string;
  analogy?: string;
  category: "algoritmo" | "estrutura" | "engenharia" | "geral";
}

const categories: Record<Term["category"], string> = {
  algoritmo: "Algoritmos",
  estrutura: "Estruturas de Dados",
  engenharia: "Engenharia de Software",
  geral: "Conceitos Gerais",
};

const glossary: Term[] = [
  { term: "Variável", definition: "Um espaço na memória onde você guarda um valor.", analogy: "Uma caixa etiquetada: a etiqueta é o nome, o conteúdo é o valor.", category: "geral" },
  { term: "Função", definition: "Um bloco de código com nome que executa uma tarefa específica.", analogy: "Uma receita que você pode seguir quantas vezes quiser.", category: "geral" },
  { term: "Parâmetro", definition: "Um valor que você passa para uma função.", analogy: "O ingrediente que você entrega para a receita.", category: "geral" },
  { term: "Condicional (if/else)", definition: "Estrutura que permite ao programa tomar decisões.", analogy: "Um semáforo: verde = anda, vermelho = para.", category: "geral" },
  { term: "Loop", definition: "Estrutura que repete um bloco de código várias vezes.", analogy: "Uma esteira de fábrica que continua rodando.", category: "geral" },
  { term: "Array", definition: "Uma lista ordenada de valores acessados por posição.", analogy: "Uma fileira de armários numerados.", category: "geral" },
  { term: "String", definition: "Tipo de dado que representa texto.", analogy: "Um colar de letras formando palavras.", category: "geral" },
  { term: "Bug", definition: "Um erro no código que causa comportamento inesperado.", analogy: "Um erro de digitação numa receita.", category: "geral" },
  { term: "Algoritmo", definition: "Sequência de passos para resolver um problema.", analogy: "Uma receita de bolo: passo a passo.", category: "algoritmo" },
  { term: "Big O", definition: "Notação que descreve o desempenho de um algoritmo.", analogy: "Uma nota de velocidade: O(1) é rápido, O(n²) é lento.", category: "algoritmo" },
  { term: "Bubble Sort", definition: "Algoritmo que compara pares vizinhos e troca se fora de ordem.", analogy: "Bolhas subindo: maiores valores vão ao topo.", category: "algoritmo" },
  { term: "Busca Binária", definition: "Busca eficiente que divide a lista ao meio repetidamente.", analogy: "Abrir dicionário no meio e decidir metade certa.", category: "algoritmo" },
  { term: "Recursão", definition: "Quando uma função chama a si mesma.", analogy: "Bonecas russas: cada uma contém uma menor.", category: "algoritmo" },
  { term: "Pilha (Stack)", definition: "Estrutura onde o último adicionado é o primeiro removido.", analogy: "Pilha de pratos: pega-se do topo.", category: "estrutura" },
  { term: "Fila (Queue)", definition: "Estrutura onde o primeiro adicionado é o primeiro removido.", analogy: "Fila do banco: primeiro a chegar, primeiro atendido.", category: "estrutura" },
  { term: "Lista Ligada", definition: "Elementos encadeados onde cada um aponta para o próximo.", analogy: "Vagões de trem conectados.", category: "estrutura" },
  { term: "Árvore Binária", definition: "Estrutura hierárquica onde cada nó tem até dois filhos.", analogy: "Galhos que se dividem em no máximo dois.", category: "estrutura" },
  { term: "Hash Table", definition: "Estrutura que associa chaves a valores com busca rápida.", analogy: "Dicionário: busca pela palavra, acha o significado.", category: "estrutura" },
  { term: "Git", definition: "Sistema que registra todas as alterações no código.", analogy: "Ctrl+Z do projeto inteiro.", category: "engenharia" },
  { term: "API", definition: "Interface para dois sistemas se comunicarem.", analogy: "Garçom: leva pedido à cozinha e traz resultado.", category: "engenharia" },
  { term: "Deploy", definition: "Publicar o código para usuários acessarem.", analogy: "Inaugurar uma loja.", category: "engenharia" },
  { term: "SQL", definition: "Linguagem para consultar bancos de dados.", analogy: "Perguntar ao bibliotecário: 'traga livros de ficção de 2024'.", category: "engenharia" },
];

export function GlossarySidebar() {
  const [search, setSearch] = useState("");

  const filtered = glossary.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 fixed bottom-24 right-6 z-50 shadow-lg bg-card border-accent/30 hover:bg-accent/10"
        >
          <BookOpen className="h-4 w-4 text-accent" />
          <span className="hidden sm:inline">Glossário</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[340px] sm:w-[400px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2 font-heading">
            <BookOpen className="h-5 w-5 text-accent" />
            Glossário Rápido
          </SheetTitle>
        </SheetHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar termo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            Nenhum termo encontrado 🤔
          </p>
        )}

        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.term} className="border border-border/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-foreground">{t.term}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {categories[t.category]}
                </Badge>
              </div>
              <p className="text-xs text-foreground/80">{t.definition}</p>
              {t.analogy && (
                <p className="text-xs text-muted-foreground italic mt-1">💡 {t.analogy}</p>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

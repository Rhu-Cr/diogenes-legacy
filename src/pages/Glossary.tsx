import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/BackButton";
import { Search, BookOpen } from "lucide-react";

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

const categoryColors: Record<Term["category"], string> = {
  algoritmo: "bg-primary/10 text-primary border-primary/20",
  estrutura: "bg-accent/10 text-accent-foreground border-accent/20",
  engenharia: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  geral: "bg-muted text-muted-foreground border-muted-foreground/20",
};

const glossary: Term[] = [
  // Conceitos Gerais
  { term: "Variável", definition: "Um espaço na memória do computador onde você guarda um valor, como um número ou texto.", analogy: "Pense numa caixa etiquetada: a etiqueta é o nome da variável e o conteúdo dentro é o valor.", category: "geral" },
  { term: "Tipo de dado", definition: "Indica que tipo de informação uma variável guarda — número inteiro, número decimal, texto ou verdadeiro/falso.", analogy: "É como a forma de um recipiente: uma garrafa guarda líquido, uma caixa guarda objetos sólidos.", category: "geral" },
  { term: "Função", definition: "Um bloco de código com um nome que executa uma tarefa específica. Você pode chamá-la sempre que precisar dela.", analogy: "É como uma receita: você escreve uma vez e pode seguir quantas vezes quiser.", category: "geral" },
  { term: "Parâmetro", definition: "Um valor que você passa para uma função para que ela use durante sua execução.", analogy: "É o ingrediente que você entrega para a receita funcionar.", category: "geral" },
  { term: "Retorno", definition: "O resultado que uma função devolve depois de executar.", analogy: "É o prato pronto que sai da receita.", category: "geral" },
  { term: "Condicional (if/else)", definition: "Uma estrutura que permite ao programa tomar decisões: 'se isso acontecer, faça X; senão, faça Y'.", analogy: "É como um semáforo: se está verde, você anda; se está vermelho, você para.", category: "geral" },
  { term: "Loop (laço de repetição)", definition: "Uma estrutura que repete um bloco de código várias vezes, enquanto uma condição for verdadeira.", analogy: "É como uma esteira de fábrica: ela continua rodando até que todos os produtos passem.", category: "geral" },
  { term: "Array (vetor)", definition: "Uma lista ordenada de valores guardados em uma única variável, acessados por posição (índice).", analogy: "É como uma fileira de armários numerados: você abre o armário pelo número.", category: "geral" },
  { term: "String", definition: "Um tipo de dado que representa texto — uma sequência de caracteres.", analogy: "É um colar de letras: cada letra é uma conta, e juntas formam uma palavra.", category: "geral" },
  { term: "Bug", definition: "Um erro no código que faz o programa se comportar de forma inesperada.", analogy: "É como um erro de digitação numa receita: 'adicione 10 kg de sal' em vez de '10 g'.", category: "geral" },
  { term: "Debug", definition: "O processo de encontrar e corrigir bugs no código.", analogy: "É ser um detetive procurando onde a receita deu errado.", category: "geral" },
  { term: "Compilar", definition: "Traduzir o código que você escreveu para uma linguagem que o computador entende.", analogy: "É como traduzir um livro do português para o idioma que a máquina lê.", category: "geral" },
  { term: "Sintaxe", definition: "As regras de escrita de uma linguagem de programação — como as palavras e símbolos devem ser organizados.", analogy: "É a gramática da linguagem: assim como o português tem regras, o código também.", category: "geral" },

  // Algoritmos
  { term: "Algoritmo", definition: "Uma sequência finita de passos bem definidos para resolver um problema ou realizar uma tarefa.", analogy: "É uma receita de bolo: passo a passo do início ao fim.", category: "algoritmo" },
  { term: "Complexidade de tempo", definition: "Uma medida de quanto tempo um algoritmo leva para executar, dependendo do tamanho da entrada.", analogy: "Se você precisa encontrar um nome numa lista, procurar um por um (O(n)) é mais lento que usar busca binária (O(log n)).", category: "algoritmo" },
  { term: "Big O", definition: "Uma notação que descreve o desempenho de um algoritmo no pior caso. Ex.: O(n), O(n²), O(log n).", analogy: "É como uma 'nota de velocidade' para algoritmos: O(1) é o mais rápido, O(n²) é bem lento para listas grandes.", category: "algoritmo" },
  { term: "Ordenação (Sorting)", definition: "O processo de organizar elementos em uma ordem específica (crescente, decrescente, alfabética).", analogy: "É como organizar cartas de baralho em ordem numérica na sua mão.", category: "algoritmo" },
  { term: "Bubble Sort", definition: "Um algoritmo de ordenação simples que compara pares vizinhos e os troca se estiverem fora de ordem, repetindo até tudo estar ordenado.", analogy: "É como bolhas subindo na água: os maiores valores vão 'borbulhando' para o topo.", category: "algoritmo" },
  { term: "Busca Linear", definition: "Procurar um item verificando cada elemento da lista, um por um, do início ao fim.", analogy: "É procurar seu nome numa lista de chamada lendo todos os nomes de cima a baixo.", category: "algoritmo" },
  { term: "Busca Binária", definition: "Um método eficiente de busca que divide a lista ao meio repetidamente, descartando metade a cada passo. Funciona apenas em listas ordenadas.", analogy: "É como abrir um dicionário no meio e decidir se a palavra está na metade esquerda ou direita.", category: "algoritmo" },
  { term: "Recursão", definition: "Quando uma função chama a si mesma para resolver versões menores do mesmo problema.", analogy: "É como bonecas russas (matrioscas): cada boneca contém uma menor dentro, até chegar na menor de todas.", category: "algoritmo" },

  // Estruturas de Dados
  { term: "Estrutura de dados", definition: "Uma forma organizada de guardar e acessar dados no computador.", analogy: "É como escolher entre uma estante, uma gaveta ou uma caixa — cada uma organiza as coisas de um jeito.", category: "estrutura" },
  { term: "Pilha (Stack)", definition: "Uma estrutura onde o último elemento adicionado é o primeiro a ser removido (LIFO).", analogy: "É como uma pilha de pratos: você sempre pega o prato do topo.", category: "estrutura" },
  { term: "Fila (Queue)", definition: "Uma estrutura onde o primeiro elemento adicionado é o primeiro a ser removido (FIFO).", analogy: "É como a fila do banco: quem chega primeiro é atendido primeiro.", category: "estrutura" },
  { term: "Lista Ligada (Linked List)", definition: "Uma sequência de elementos onde cada um aponta para o próximo, formando uma cadeia.", analogy: "É como vagões de um trem: cada vagão está conectado ao próximo.", category: "estrutura" },
  { term: "Árvore (Tree)", definition: "Uma estrutura hierárquica com um elemento raiz que se ramifica em filhos, que podem ter mais filhos.", analogy: "É como uma árvore genealógica: avós → pais → filhos.", category: "estrutura" },
  { term: "Árvore Binária", definition: "Uma árvore onde cada elemento tem no máximo dois filhos (esquerdo e direito).", analogy: "É como uma árvore onde cada galho se divide em no máximo dois.", category: "estrutura" },
  { term: "Hash Table (Tabela Hash)", definition: "Uma estrutura que associa chaves a valores, permitindo busca muito rápida.", analogy: "É como um dicionário: você procura pela palavra (chave) e encontra o significado (valor) quase instantaneamente.", category: "estrutura" },
  { term: "Grafo", definition: "Uma estrutura formada por pontos (vértices) conectados por linhas (arestas), representando relações.", analogy: "É como um mapa de metrô: as estações são os pontos e as linhas conectam elas.", category: "estrutura" },

  // Engenharia de Software
  { term: "Git", definition: "Um sistema de controle de versão que registra todas as alterações feitas no código ao longo do tempo.", analogy: "É como o 'Ctrl+Z' do seu projeto inteiro — você pode voltar para qualquer versão anterior.", category: "engenharia" },
  { term: "Commit", definition: "Um 'ponto de salvamento' no Git que registra as alterações feitas até aquele momento.", analogy: "É como salvar o jogo: você pode voltar a esse ponto se algo der errado.", category: "engenharia" },
  { term: "Branch", definition: "Uma ramificação do código principal que permite trabalhar em uma funcionalidade sem afetar o resto.", analogy: "É como fazer um rascunho separado antes de passar a limpo no caderno principal.", category: "engenharia" },
  { term: "Merge", definition: "Unir as alterações de uma branch de volta ao código principal.", analogy: "É passar o rascunho a limpo: integrar o trabalho separado ao caderno oficial.", category: "engenharia" },
  { term: "API", definition: "Uma interface que permite que dois sistemas se comuniquem — um pede dados e o outro responde.", analogy: "É como um garçom no restaurante: você faz o pedido, ele leva à cozinha e traz o resultado.", category: "engenharia" },
  { term: "Teste unitário", definition: "Um teste automático que verifica se uma pequena parte do código (como uma função) funciona corretamente.", analogy: "É como provar cada ingrediente antes de misturar tudo na receita.", category: "engenharia" },
  { term: "Refatoração", definition: "Melhorar a organização do código sem mudar o que ele faz — torná-lo mais limpo e fácil de entender.", analogy: "É como arrumar o quarto: tudo funciona igual, mas fica mais organizado.", category: "engenharia" },
  { term: "Deploy", definition: "Publicar seu código para que os usuários possam acessá-lo na internet.", analogy: "É como inaugurar uma loja: o produto está pronto e agora o público pode usar.", category: "engenharia" },
  { term: "Banco de dados", definition: "Um sistema organizado para armazenar grandes quantidades de informação de forma estruturada.", analogy: "É como um arquivo de escritório gigante com pastas organizadas por categoria.", category: "engenharia" },
  { term: "SQL", definition: "Uma linguagem usada para consultar e manipular dados em bancos de dados relacionais.", analogy: "É como fazer perguntas a um bibliotecário: 'me traga todos os livros de ficção de 2024'.", category: "engenharia" },
];

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Term["category"] | "all">("all");

  const filtered = glossary.filter((t) => {
    const matchesSearch =
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const grouped = filtered.reduce<Record<string, Term[]>>((acc, t) => {
    const cat = categories[t.category];
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(t);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/dashboard" label="Voltar ao Dashboard" />

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-8 w-8 text-accent" />
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Glossário
            </h1>
          </div>
          <p className="text-muted-foreground">
            Termos técnicos explicados de forma simples — sem medo de palavras difíceis! 🧠
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar termo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge
            variant={activeCategory === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory("all")}
          >
            Todos ({glossary.length})
          </Badge>
          {(Object.keys(categories) as Term["category"][]).map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(cat)}
            >
              {categories[cat]} ({glossary.filter((t) => t.category === cat).length})
            </Badge>
          ))}
        </div>

        {/* Terms */}
        {Object.entries(grouped).length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum termo encontrado para "{search}" 🤔
          </p>
        )}

        {Object.entries(grouped).map(([category, terms]) => (
          <div key={category} className="mb-8">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
              {category}
            </h2>
            <div className="grid gap-3">
              {terms.map((t) => (
                <Card key={t.term} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground">{t.term}</h3>
                          <Badge variant="outline" className={`text-xs ${categoryColors[t.category]}`}>
                            {categories[t.category]}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80 mb-1">{t.definition}</p>
                        {t.analogy && (
                          <p className="text-sm text-muted-foreground italic">
                            💡 Analogia: {t.analogy}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

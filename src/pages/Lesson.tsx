import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useProgress } from "@/hooks/useProgress";
import { DiogenesChatbot } from "@/components/DiogenesChatbot";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Code, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import diogenesImg from "@/assets/diogenes.png";
import { LessonQuiz, type QuizQuestion } from "@/components/LessonQuiz";

interface LessonData {
  title: string;
  content: string;
  codeExample: string;
  challenge: string;
  diogenesTip: string;
  quiz: QuizQuestion[];
}

const lessons: Record<string, Record<string, LessonData>> = {
  algoritmos: {
    intro: {
      title: "Introdução a Algoritmos",
      content: `Um **algoritmo** é uma sequência finita de instruções bem definidas para resolver um problema. Pense nele como uma receita de bolo: cada passo é claro, tem uma ordem, e no final você obtém o resultado desejado.\n\n### Características de um bom algoritmo:\n- **Finitude**: Deve terminar após um número finito de passos\n- **Definição**: Cada passo deve ser claro e sem ambiguidade\n- **Entrada**: Pode ter zero ou mais entradas\n- **Saída**: Deve produzir pelo menos uma saída\n- **Efetividade**: Cada passo deve ser suficientemente básico`,
      codeExample: `// Exemplo: Algoritmo para encontrar o maior número
function encontrarMaior(numeros) {
  let maior = numeros[0];
  
  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
      maior = numeros[i];
    }
  }
  
  return maior;
}

// Teste
console.log(encontrarMaior([3, 7, 2, 9, 1])); // 9`,
      challenge: "Modifique o algoritmo acima para encontrar tanto o maior quanto o menor número do array. Retorne um objeto com ambos os valores.",
      diogenesTip: "Lembre-se: antes de programar, pense no passo a passo em português! Um algoritmo bem pensado é metade do código pronto.",
      quiz: [
        { question: "O que é um algoritmo?", options: ["Um tipo de linguagem de programação", "Uma sequência finita de instruções para resolver um problema", "Um software de computador", "Um banco de dados"], correctIndex: 1, explanation: "Um algoritmo é uma sequência finita de instruções bem definidas para resolver um problema." },
        { question: "Qual NÃO é uma característica de um bom algoritmo?", options: ["Finitude", "Ambiguidade", "Efetividade", "Saída"], correctIndex: 1, explanation: "Um bom algoritmo deve ter definição clara — sem ambiguidade!" },
        { question: "Qual é a saída de encontrarMaior([3, 7, 2, 9, 1])?", options: ["3", "7", "9", "1"], correctIndex: 2, explanation: "O algoritmo percorre o array e retorna o maior valor, que é 9." },
      ],
    },
    busca: {
      title: "Algoritmos de Busca",
      content: `Algoritmos de busca são fundamentais na computação. Os dois mais comuns são a **Busca Linear** e a **Busca Binária**.\n\n### Busca Linear\nPercorre cada elemento sequencialmente. Complexidade: **O(n)**\n\n### Busca Binária\nDivide o espaço de busca pela metade a cada iteração. Requer lista ordenada. Complexidade: **O(log n)**`,
      codeExample: `// Busca Binária
function buscaBinaria(arr, alvo) {
  let inicio = 0;
  let fim = arr.length - 1;
  
  while (inicio <= fim) {
    let meio = Math.floor((inicio + fim) / 2);
    
    if (arr[meio] === alvo) return meio;
    if (arr[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  
  return -1; // não encontrado
}

console.log(buscaBinaria([1, 3, 5, 7, 9], 7)); // 3`,
      challenge: "Implemente uma busca binária recursiva e compare com a versão iterativa.",
      diogenesTip: "A busca binária é como procurar uma palavra no dicionário: você não começa da primeira página, vai direto ao meio!",
      quiz: [
        { question: "Qual a complexidade da busca linear?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctIndex: 2, explanation: "A busca linear percorre cada elemento, logo é O(n)." },
        { question: "A busca binária exige que a lista esteja:", options: ["Vazia", "Ordenada", "Com números pares", "Sem repetições"], correctIndex: 1, explanation: "A busca binária só funciona em listas ordenadas, pois depende de comparar com o elemento do meio." },
        { question: "Qual o resultado de buscaBinaria([1,3,5,7,9], 7)?", options: ["7", "4", "3", "-1"], correctIndex: 2, explanation: "O valor 7 está no índice 3 do array." },
      ],
    },
    ordenacao: {
      title: "Algoritmos de Ordenação",
      content: `Ordenar dados é uma das operações mais comuns em computação.\n\n### Bubble Sort\nCompara pares adjacentes e troca se estiverem fora de ordem. Simples mas lento: **O(n²)**\n\n### Quick Sort\nEscolhe um pivô e particiona o array. Muito eficiente: **O(n log n)** no caso médio.`,
      codeExample: `// Bubble Sort
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22]));
// [12, 22, 25, 34, 64]`,
      challenge: "Implemente o Quick Sort e conte quantas comparações cada algoritmo faz para ordenar o mesmo array.",
      diogenesTip: "Bubble Sort é como organizar cartas: simples, mas imagine fazer isso com mil cartas! Por isso existem algoritmos melhores.",
      quiz: [
        { question: "Qual a complexidade do Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctIndex: 2, explanation: "O Bubble Sort usa dois loops aninhados, resultando em O(n²)." },
        { question: "Qual a complexidade média do Quick Sort?", options: ["O(n²)", "O(n)", "O(n log n)", "O(log n)"], correctIndex: 2, explanation: "O Quick Sort tem complexidade média de O(n log n) graças à partição eficiente." },
        { question: "O que o Bubble Sort faz em cada iteração?", options: ["Divide o array ao meio", "Compara pares adjacentes e troca se necessário", "Seleciona o menor elemento", "Insere em posição correta"], correctIndex: 1, explanation: "O Bubble Sort compara elementos adjacentes e os troca se estiverem fora de ordem." },
      ],
    },
    recursao: {
      title: "Recursão",
      content: `**Recursão** é quando uma função chama a si mesma para resolver um subproblema menor.\n\n### Elementos da recursão:\n1. **Caso base**: Condição de parada\n2. **Caso recursivo**: Chamada a si mesma com entrada reduzida\n\nSem o caso base, a recursão vira um loop infinito!`,
      codeExample: `// Fatorial recursivo
function fatorial(n) {
  // Caso base
  if (n <= 1) return 1;
  // Caso recursivo
  return n * fatorial(n - 1);
}

// Fibonacci recursivo
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fatorial(5));    // 120
console.log(fibonacci(10));  // 55`,
      challenge: "Implemente a sequência de Fibonacci com memoização para melhorar a performance.",
      diogenesTip: "Recursão é como bonecas russas: cada uma contém uma versão menor de si mesma, até chegar na menor!",
      quiz: [
        { question: "O que acontece se uma recursão não tiver caso base?", options: ["Retorna undefined", "Entra em loop infinito (stack overflow)", "Retorna 0", "Funciona normalmente"], correctIndex: 1, explanation: "Sem caso base, a função se chama infinitamente até estourar a pilha de chamadas." },
        { question: "Qual o valor de fatorial(5)?", options: ["25", "120", "60", "24"], correctIndex: 1, explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120." },
        { question: "Quais são os dois elementos essenciais da recursão?", options: ["Loop e condição", "Caso base e caso recursivo", "Input e output", "Variável e constante"], correctIndex: 1, explanation: "Toda recursão precisa de um caso base (parada) e um caso recursivo (chamada a si mesma)." },
      ],
    },
  },
  estruturas: {
    listas: {
      title: "Listas Encadeadas",
      content: `Uma **lista encadeada** é uma estrutura onde cada elemento (nó) contém um valor e uma referência para o próximo nó.\n\n### Vantagens:\n- Inserção e remoção eficientes: **O(1)** com referência\n- Tamanho dinâmico\n\n### Desvantagens:\n- Acesso sequencial: **O(n)**\n- Usa mais memória (ponteiros)`,
      codeExample: `class Node {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}

class ListaEncadeada {
  constructor() {
    this.cabeca = null;
  }

  inserir(valor) {
    const novoNo = new Node(valor);
    novoNo.proximo = this.cabeca;
    this.cabeca = novoNo;
  }

  imprimir() {
    let atual = this.cabeca;
    const valores = [];
    while (atual) {
      valores.push(atual.valor);
      atual = atual.proximo;
    }
    console.log(valores.join(" -> "));
  }
}`,
      challenge: "Adicione um método 'remover(valor)' que remove a primeira ocorrência do valor na lista.",
      diogenesTip: "Listas encadeadas são como um trem: cada vagão sabe qual é o próximo, mas não tem ideia de quem está lá no final!",
      quiz: [
        { question: "Qual a complexidade de acesso a um elemento em uma lista encadeada?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctIndex: 2, explanation: "Listas encadeadas exigem percorrer os nós sequencialmente, logo O(n)." },
        { question: "O que cada nó de uma lista encadeada contém?", options: ["Apenas um valor", "Um valor e uma referência ao próximo nó", "Um índice e um valor", "Dois valores"], correctIndex: 1, explanation: "Cada nó armazena um valor e um ponteiro para o próximo nó da lista." },
        { question: "Qual é uma vantagem da lista encadeada sobre arrays?", options: ["Acesso direto por índice", "Inserção e remoção eficientes", "Menor uso de memória", "Ordenação automática"], correctIndex: 1, explanation: "Inserção e remoção em listas encadeadas são O(1) quando se tem a referência." },
      ],
    },
    pilhas: {
      title: "Pilhas e Filas",
      content: `### Pilha (Stack)\nEstrutura **LIFO** (Last In, First Out). Como uma pilha de pratos.\n\n### Fila (Queue)\nEstrutura **FIFO** (First In, First Out). Como uma fila de banco.\n\nAmbas são fundamentais em muitos algoritmos!`,
      codeExample: `// Pilha
class Pilha {
  constructor() {
    this.itens = [];
  }
  empilhar(item) { this.itens.push(item); }
  desempilhar() { return this.itens.pop(); }
  topo() { return this.itens[this.itens.length - 1]; }
  vazia() { return this.itens.length === 0; }
}

// Fila
class Fila {
  constructor() {
    this.itens = [];
  }
  enfileirar(item) { this.itens.push(item); }
  desenfileirar() { return this.itens.shift(); }
  frente() { return this.itens[0]; }
  vazia() { return this.itens.length === 0; }
}`,
      challenge: "Use uma pilha para verificar se uma expressão com parênteses está balanceada. Ex: '((()))' → true, '(()' → false",
      diogenesTip: "Pilha é como desfazer no editor: o último comando que você fez é o primeiro a ser desfeito! Ctrl+Z puro!",
      quiz: [
        { question: "O que significa LIFO?", options: ["Last In, First Out", "Last In, Fast Out", "Linear Input, First Output", "Linked In, First Out"], correctIndex: 0, explanation: "LIFO = Last In, First Out — o último a entrar é o primeiro a sair." },
        { question: "Qual estrutura segue o princípio FIFO?", options: ["Pilha", "Fila", "Árvore", "Grafo"], correctIndex: 1, explanation: "Fila (Queue) segue FIFO: First In, First Out." },
        { question: "Qual operação remove o elemento do topo da pilha?", options: ["enfileirar", "empilhar", "desempilhar", "desenfileirar"], correctIndex: 2, explanation: "Desempilhar (pop) remove o elemento do topo da pilha." },
      ],
    },
    arvores: {
      title: "Árvores Binárias",
      content: `Uma **árvore binária** é uma estrutura hierárquica onde cada nó tem no máximo dois filhos.\n\n### Árvore Binária de Busca (BST)\nPara cada nó: valores menores ficam à esquerda, maiores à direita.\n\n### Complexidade:\n- Busca, inserção, remoção: **O(log n)** no caso médio`,
      codeExample: `class NoArvore {
  constructor(valor) {
    this.valor = valor;
    this.esquerda = null;
    this.direita = null;
  }
}

class BST {
  constructor() { this.raiz = null; }

  inserir(valor) {
    const novoNo = new NoArvore(valor);
    if (!this.raiz) { this.raiz = novoNo; return; }
    
    let atual = this.raiz;
    while (true) {
      if (valor < atual.valor) {
        if (!atual.esquerda) { atual.esquerda = novoNo; return; }
        atual = atual.esquerda;
      } else {
        if (!atual.direita) { atual.direita = novoNo; return; }
        atual = atual.direita;
      }
    }
  }
}`,
      challenge: "Implemente os três percursos da árvore: em-ordem, pré-ordem e pós-ordem.",
      diogenesTip: "Uma árvore binária é como uma árvore genealógica invertida: começa por um ancestral e vai ramificando!",
      quiz: [
        { question: "Quantos filhos no máximo um nó de árvore binária pode ter?", options: ["1", "2", "3", "Ilimitado"], correctIndex: 1, explanation: "Uma árvore binária permite no máximo dois filhos por nó." },
        { question: "Em uma BST, onde ficam os valores menores que o nó?", options: ["À direita", "À esquerda", "No topo", "Na raiz"], correctIndex: 1, explanation: "Na BST, valores menores ficam à esquerda e maiores à direita." },
        { question: "Qual a complexidade média de busca em uma BST?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], correctIndex: 2, explanation: "A BST divide o espaço de busca pela metade, resultando em O(log n) no caso médio." },
      ],
    },
    grafos: {
      title: "Grafos",
      content: `Um **grafo** é uma estrutura que modela relações entre objetos. Composto por vértices (nós) e arestas (conexões).\n\n### Tipos:\n- **Direcionado**: Arestas têm direção\n- **Não-direcionado**: Arestas são bidirecionais\n\n### Representação:\n- Lista de adjacência (mais comum)\n- Matriz de adjacência`,
      codeExample: `class Grafo {
  constructor() {
    this.adjacencia = new Map();
  }

  adicionarVertice(v) {
    if (!this.adjacencia.has(v)) {
      this.adjacencia.set(v, []);
    }
  }

  adicionarAresta(v1, v2) {
    this.adjacencia.get(v1).push(v2);
    this.adjacencia.get(v2).push(v1);
  }

  bfs(inicio) {
    const visitados = new Set();
    const fila = [inicio];
    visitados.add(inicio);
    
    while (fila.length > 0) {
      const vertice = fila.shift();
      console.log(vertice);
      
      for (const vizinho of this.adjacencia.get(vertice)) {
        if (!visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push(vizinho);
        }
      }
    }
  }
}`,
      challenge: "Implemente a busca em profundidade (DFS) tanto iterativa quanto recursiva.",
      diogenesTip: "Grafos estão em todo lugar: redes sociais, mapas, internet. Se você entende grafos, entende o mundo digital!",
      quiz: [
        { question: "O que compõe um grafo?", options: ["Arrays e loops", "Vértices e arestas", "Nós e folhas", "Pilhas e filas"], correctIndex: 1, explanation: "Um grafo é formado por vértices (nós) e arestas (conexões entre eles)." },
        { question: "Em um grafo não-direcionado, as arestas são:", options: ["Unidirecionais", "Bidirecionais", "Ponderadas", "Cíclicas"], correctIndex: 1, explanation: "Grafos não-direcionados têm arestas bidirecionais — a conexão vai nos dois sentidos." },
        { question: "BFS usa qual estrutura auxiliar?", options: ["Pilha", "Árvore", "Fila", "Grafo"], correctIndex: 2, explanation: "A BFS (Busca em Largura) utiliza uma fila para explorar os vizinhos nível por nível." },
      ],
    },
  },
  engenharia: {
    solid: {
      title: "Princípios SOLID",
      content: `Os princípios **SOLID** são cinco diretrizes para criar software manutenível:\n\n1. **S** — Single Responsibility: Uma classe, uma responsabilidade\n2. **O** — Open/Closed: Aberto para extensão, fechado para modificação\n3. **L** — Liskov Substitution: Subtipos devem ser substituíveis\n4. **I** — Interface Segregation: Interfaces específicas > genéricas\n5. **D** — Dependency Inversion: Dependa de abstrações, não implementações`,
      codeExample: `// Princípio da Responsabilidade Única
// ❌ Errado: classe faz tudo
class Usuario {
  salvar() { /* salva no banco */ }
  enviarEmail() { /* envia email */ }
  gerarRelatorio() { /* gera PDF */ }
}

// ✅ Correto: cada classe tem uma responsabilidade
class UsuarioRepository {
  salvar(usuario) { /* salva no banco */ }
}

class EmailService {
  enviar(destinatario, mensagem) { /* envia email */ }
}

class RelatorioService {
  gerar(dados) { /* gera PDF */ }
}`,
      challenge: "Refatore uma classe 'Pedido' que calcula total, aplica desconto, salva no banco e envia notificação, aplicando o princípio S do SOLID.",
      diogenesTip: "SOLID não é só teoria — é a diferença entre código que dura anos e código que vira legado problemático em meses!",
      quiz: [
        { question: "O que significa o 'S' em SOLID?", options: ["Simple Responsibility", "Single Responsibility", "Software Reliability", "System Requirements"], correctIndex: 1, explanation: "O S de SOLID é Single Responsibility — cada classe deve ter apenas uma responsabilidade." },
        { question: "O princípio Open/Closed diz que código deve ser:", options: ["Aberto para modificação, fechado para extensão", "Aberto para extensão, fechado para modificação", "Sempre aberto", "Sempre fechado"], correctIndex: 1, explanation: "Open/Closed: aberto para extensão (adicionar funcionalidade) mas fechado para modificação do código existente." },
        { question: "O princípio 'D' recomenda depender de:", options: ["Implementações concretas", "Abstrações", "Banco de dados", "Classes finais"], correctIndex: 1, explanation: "Dependency Inversion: dependa de abstrações (interfaces), não de implementações concretas." },
      ],
    },
    padroes: {
      title: "Padrões de Projeto",
      content: `**Padrões de projeto** são soluções reutilizáveis para problemas comuns.\n\n### Categorias:\n- **Criacionais**: Factory, Singleton, Builder\n- **Estruturais**: Adapter, Decorator, Facade\n- **Comportamentais**: Observer, Strategy, Command`,
      codeExample: `// Padrão Observer
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(evento, callback) {
    if (!this.listeners[evento]) {
      this.listeners[evento] = [];
    }
    this.listeners[evento].push(callback);
  }

  emit(evento, dados) {
    if (this.listeners[evento]) {
      this.listeners[evento].forEach(cb => cb(dados));
    }
  }
}

// Uso
const emitter = new EventEmitter();
emitter.on('novaVenda', (venda) => {
  console.log('Notificação:', venda);
});
emitter.emit('novaVenda', { produto: 'Livro', valor: 49.90 });`,
      challenge: "Implemente o padrão Strategy para um sistema de cálculo de frete com diferentes estratégias (Sedex, PAC, Expresso).",
      diogenesTip: "Padrões de projeto são como peças de LEGO: você aprende a usar cada peça e depois constrói o que quiser!",
      quiz: [
        { question: "O padrão Observer pertence a qual categoria?", options: ["Criacional", "Estrutural", "Comportamental", "Arquitetural"], correctIndex: 2, explanation: "Observer é um padrão comportamental — define como objetos se comunicam." },
        { question: "Qual padrão garante que apenas uma instância de uma classe exista?", options: ["Factory", "Observer", "Singleton", "Strategy"], correctIndex: 2, explanation: "O Singleton restringe a criação de uma classe a uma única instância." },
        { question: "O padrão Factory é do tipo:", options: ["Comportamental", "Estrutural", "Criacional", "Nenhum"], correctIndex: 2, explanation: "Factory é um padrão criacional — lida com a criação de objetos." },
      ],
    },
    testes: {
      title: "Testes de Software",
      content: `Testes garantem que seu software funciona como esperado.\n\n### Tipos:\n- **Unitários**: Testam funções isoladas\n- **Integração**: Testam componentes juntos\n- **E2E**: Testam o sistema completo\n\n### Princípio AAA:\n1. **Arrange**: Preparar os dados\n2. **Act**: Executar a ação\n3. **Assert**: Verificar o resultado`,
      codeExample: `// Exemplo com vitest/jest
import { describe, it, expect } from 'vitest';

function somar(a, b) {
  return a + b;
}

describe('somar', () => {
  it('deve somar dois números positivos', () => {
    // Arrange
    const a = 2, b = 3;
    // Act
    const resultado = somar(a, b);
    // Assert
    expect(resultado).toBe(5);
  });

  it('deve lidar com números negativos', () => {
    expect(somar(-1, -2)).toBe(-3);
  });

  it('deve retornar zero quando ambos são zero', () => {
    expect(somar(0, 0)).toBe(0);
  });
});`,
      challenge: "Escreva testes unitários para uma função 'validarEmail' que verifica se um email é válido.",
      diogenesTip: "Código sem teste é como avião sem checklist pré-voo: pode até funcionar, mas você quer arriscar? 🛫",
      quiz: [
        { question: "O que o 'A' de Arrange no princípio AAA significa?", options: ["Analisar o código", "Preparar os dados de teste", "Executar a ação", "Verificar o resultado"], correctIndex: 1, explanation: "Arrange = preparar os dados e o cenário para o teste." },
        { question: "Testes unitários testam:", options: ["O sistema inteiro", "Componentes integrados", "Funções isoladas", "A interface do usuário"], correctIndex: 2, explanation: "Testes unitários focam em testar funções ou métodos de forma isolada." },
        { question: "Testes E2E significam:", options: ["Error to Error", "End to End", "Entry to Exit", "Execute to Evaluate"], correctIndex: 1, explanation: "E2E = End to End, testam o sistema completo do início ao fim." },
      ],
    },
    arquitetura: {
      title: "Arquitetura de Software",
      content: `A **arquitetura de software** define a estrutura de alto nível do sistema.\n\n### Padrões comuns:\n- **MVC**: Model-View-Controller\n- **Microserviços**: Serviços independentes\n- **Monolítico**: Aplicação unificada\n- **Clean Architecture**: Camadas com regras de dependência`,
      codeExample: `// Clean Architecture - Exemplo de camadas

// 1. Entidade (regras de negócio)
class Produto {
  constructor(nome, preco) {
    if (preco < 0) throw new Error('Preço inválido');
    this.nome = nome;
    this.preco = preco;
  }
}

// 2. Caso de Uso (lógica da aplicação)
class CriarProdutoUseCase {
  constructor(produtoRepository) {
    this.repo = produtoRepository;
  }
  async executar(nome, preco) {
    const produto = new Produto(nome, preco);
    return await this.repo.salvar(produto);
  }
}

// 3. Adaptador (interface externa)
class ProdutoController {
  constructor(criarProduto) {
    this.criarProduto = criarProduto;
  }
  async criar(req) {
    return await this.criarProduto.executar(
      req.body.nome, req.body.preco
    );
  }
}`,
      challenge: "Projete a arquitetura de um sistema de e-commerce simples usando Clean Architecture. Defina as camadas e suas responsabilidades.",
      diogenesTip: "Boa arquitetura é como um bom alicerce: invisível para o usuário, mas essencial para o prédio não cair!",
      quiz: [
        { question: "O que significa MVC?", options: ["Model-View-Controller", "Main-Virtual-Component", "Module-Version-Control", "Managed-View-Class"], correctIndex: 0, explanation: "MVC = Model-View-Controller, um dos padrões arquiteturais mais usados." },
        { question: "Na Clean Architecture, as dependências apontam para:", options: ["As camadas externas", "As camadas internas (regras de negócio)", "O banco de dados", "A interface do usuário"], correctIndex: 1, explanation: "Na Clean Architecture, as dependências sempre apontam para dentro — as regras de negócio não dependem de nada externo." },
        { question: "Microserviços são:", options: ["Uma aplicação monolítica grande", "Serviços independentes e distribuídos", "Um tipo de banco de dados", "Uma linguagem de programação"], correctIndex: 1, explanation: "Microserviços são serviços pequenos e independentes que se comunicam entre si." },
      ],
    },
  },
};

export default function Lesson() {
  const { pathId, lessonId } = useParams<{ pathId: string; lessonId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { isLessonCompleted, completeLesson: saveLessonProgress } = useProgress();
  const lessonKey = `${pathId}-${lessonId}`;
  const completed = isLessonCompleted(lessonKey);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  if (authLoading || !user) return null;

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

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">{lesson.title}</h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {lesson.content.split("\n").map((line, i) => {
              if (line.startsWith("### ")) return <h3 key={i} className="font-heading text-xl font-bold text-foreground mt-6 mb-3">{line.replace("### ", "")}</h3>;
              if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-foreground">{line.replace(/\*\*/g, "")}</p>;
              if (line.startsWith("- ")) return <li key={i} className="text-foreground/80 ml-4 list-disc">{line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
              if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) return <li key={i} className="text-foreground/80 ml-4 list-decimal">{line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
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
      <DiogenesChatbot />
    </div>
  );
}

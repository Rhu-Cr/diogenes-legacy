import type { LessonData } from "./lessonTypes";

export const estruturasLessons: Record<string, LessonData> = {
  arrays: {
    title: "Arrays e Strings",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nComo usar arrays (listas) e strings (textos), as estruturas de dados mais básicas e usadas em toda a programação!\n\n### 📋 Pré-requisitos\n- Variáveis e tipos de dados\n- Loops básicos\n\n### 📦 O que é um Array?\nUm **array** é como um **armário com gavetas numeradas**. Cada gaveta tem um número (índice) e guarda um valor.\n\n**Importante:** A contagem começa do ZERO!\n- Gaveta 0 → primeiro item\n- Gaveta 1 → segundo item\n\n### 🔤 O que é uma String?\nUma **string** é um texto — na verdade, é um array de caracteres!\n- "Olá" = ['O', 'l', 'á']\n\n### 🛠️ Métodos úteis de Array\n- **push()** → Adiciona no final\n- **pop()** → Remove do final\n- **shift()** → Remove do início\n- **unshift()** → Adiciona no início\n- **slice()** → Copia uma fatia\n- **map()** → Transforma cada item\n- **filter()** → Filtra por condição\n- **find()** → Encontra o primeiro que atende à condição\n- **reduce()** → Reduz a um único valor\n\n### 🔤 Métodos úteis de String\n- **length** → Tamanho\n- **toUpperCase()** / **toLowerCase()** → Maiúsculas / minúsculas\n- **split()** → Divide em array\n- **includes()** → Verifica se contém\n- **trim()** → Remove espaços extras`,
    codeExample: `// ========================================
// ARRAYS — Operações essenciais
// ========================================

let frutas = ["maçã", "banana", "laranja"];

// Acessar por índice
console.log(frutas[0]); // "maçã"
console.log(frutas[2]); // "laranja"

// Adicionar e remover
frutas.push("uva");        // Adiciona no final
frutas.unshift("morango");  // Adiciona no início
console.log(frutas); // ["morango", "maçã", "banana", "laranja", "uva"]

// Map — transformar cada item
const maiusculas = frutas.map(f => f.toUpperCase());
console.log(maiusculas); // ["MORANGO", "MAÇÃ", ...]

// Filter — filtrar
const comA = frutas.filter(f => f.includes("a"));
console.log(comA); // frutas que contêm "a"

// Reduce — somar valores
const numeros = [10, 20, 30, 40];
const total = numeros.reduce((soma, num) => soma + num, 0);
console.log(total); // 100

// ========================================
// STRINGS — Manipulação de texto
// ========================================

let frase = "  Olá, Mundo!  ";
console.log(frase.trim());         // "Olá, Mundo!"
console.log(frase.includes("Mundo")); // true

let palavras = "um,dois,três".split(",");
console.log(palavras); // ["um", "dois", "três"]

// Inverter uma string
function inverter(str) {
  return str.split("").reverse().join("");
}
console.log(inverter("algoritmo")); // "omtirogla"`,
    challenge: "Crie uma função que recebe uma frase e retorna a palavra mais longa. Ex: 'O gato dormiu' → 'dormiu'. Dica: use split() para separar as palavras!",
    diogenesTip: "Arrays e strings são o pão com manteiga da programação. Domine map, filter e reduce — eles aparecem em TODA entrevista técnica! 🍞",
    quiz: [
      { question: "Qual o índice do primeiro elemento de um array?", options: ["1", "0", "-1", "Depende"], correctIndex: 1, explanation: "Arrays começam no índice 0! O primeiro item está na posição 0." },
      { question: "O que o método filter() faz?", options: ["Remove todos os itens", "Cria um novo array com itens que passam no teste", "Ordena o array", "Inverte o array"], correctIndex: 1, explanation: "filter() cria um novo array contendo apenas os itens que atendem à condição." },
      { question: "Como transformar 'olá' em 'OLÁ'?", options: [".toUpperCase()", ".toLowerCase()", ".trim()", ".split()"], correctIndex: 0, explanation: "toUpperCase() converte todos os caracteres para maiúsculas." },
    ],
  },
  listas: {
    title: "Listas Encadeadas",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nO que são listas encadeadas, como funcionam e quando usá-las.\n\n### 🚂 O que é uma Lista Encadeada?\nImagine um trem: cada vagão sabe qual é o PRÓXIMO vagão.\n\nCada elemento (nó) contém:\n- Um **valor**\n- Uma **referência** para o próximo nó\n\n### 🆚 Lista vs Array\n- **Array**: Acesso direto por índice, inserção no meio é lenta\n- **Lista**: Precisa percorrer, mas inserção/remoção é rápida`,
    codeExample: `class No {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}

class ListaEncadeada {
  constructor() {
    this.cabeca = null;
    this.tamanho = 0;
  }

  inserirNoInicio(valor) {
    const novoNo = new No(valor);
    novoNo.proximo = this.cabeca;
    this.cabeca = novoNo;
    this.tamanho++;
  }

  inserirNoFinal(valor) {
    const novoNo = new No(valor);
    if (!this.cabeca) {
      this.cabeca = novoNo;
    } else {
      let atual = this.cabeca;
      while (atual.proximo) atual = atual.proximo;
      atual.proximo = novoNo;
    }
    this.tamanho++;
  }

  imprimir() {
    let atual = this.cabeca;
    const valores = [];
    while (atual) {
      valores.push(atual.valor);
      atual = atual.proximo;
    }
    console.log(valores.join(" → ") + " → null");
  }
}

const lista = new ListaEncadeada();
lista.inserirNoInicio(3);
lista.inserirNoInicio(2);
lista.inserirNoInicio(1);
lista.inserirNoFinal(4);
lista.imprimir(); // 1 → 2 → 3 → 4 → null`,
    challenge: "Adicione um método 'remover(valor)' que remove a primeira ocorrência do valor na lista.",
    diogenesTip: "Listas encadeadas são como um trem: cada vagão sabe qual é o próximo, mas não tem ideia de quem está lá no final!",
    quiz: [
      { question: "Qual a principal diferença entre array e lista encadeada?", options: ["Array é maior", "Array tem acesso direto por índice, lista precisa percorrer", "Lista é sempre mais rápida", "Não há diferença"], correctIndex: 1, explanation: "Arrays permitem acesso direto, listas precisam percorrer nó por nó." },
      { question: "O que cada nó contém?", options: ["Apenas um valor", "Um valor e uma referência ao próximo nó", "Um índice e um valor", "Dois valores"], correctIndex: 1, explanation: "Cada nó armazena um valor e um ponteiro para o próximo nó." },
      { question: "Quando usar lista encadeada?", options: ["Quando precisa acessar por índice", "Quando faz muitas inserções e remoções", "Quando a lista é pequena", "Sempre"], correctIndex: 1, explanation: "Listas são melhores quando há muitas inserções/remoções, pois só mudam referências." },
    ],
  },
  pilhas: {
    title: "Pilhas e Filas",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nDuas estruturas super importantes: Pilhas (LIFO) e Filas (FIFO).\n\n### 📚 Pilha (Stack) — LIFO\nÚltimo a Entrar, Primeiro a Sair. Como uma pilha de pratos!\n- **push**: Coloca no topo\n- **pop**: Remove do topo\n\n### 🧑‍🤝‍🧑 Fila (Queue) — FIFO\nPrimeiro a Entrar, Primeiro a Sair. Como fila de banco!\n- **enqueue**: Coloca no final\n- **dequeue**: Remove do início`,
    codeExample: `// PILHA
class Pilha {
  constructor() { this.itens = []; }
  empilhar(item) { this.itens.push(item); }
  desempilhar() { return this.itens.pop(); }
  topo() { return this.itens[this.itens.length - 1]; }
  vazia() { return this.itens.length === 0; }
}

const historico = new Pilha();
historico.empilhar("Digitou 'Olá'");
historico.empilhar("Colocou negrito");
historico.empilhar("Mudou a cor");
historico.desempilhar(); // Desfaz: "Mudou a cor"

// FILA
class Fila {
  constructor() { this.itens = []; }
  enfileirar(item) { this.itens.push(item); }
  desenfileirar() { return this.itens.shift(); }
  frente() { return this.itens[0]; }
  vazia() { return this.itens.length === 0; }
}

const fila = new Fila();
fila.enfileirar("João");
fila.enfileirar("Maria");
fila.desenfileirar(); // Atendido: João`,
    challenge: "Use uma pilha para verificar se parênteses estão balanceados. Ex: '((()))' → true, '(()' → false.",
    diogenesTip: "Pilha é o Ctrl+Z: o último é desfeito primeiro! Fila é como o SUS: quem chegou primeiro é atendido primeiro. 😅",
    quiz: [
      { question: "O que significa LIFO?", options: ["Last In, First Out", "Last In, Fast Out", "Linear Input, First Output", "Linked In, First Out"], correctIndex: 0, explanation: "LIFO = Last In, First Out — último a entrar, primeiro a sair." },
      { question: "Ctrl+Z usa qual estrutura?", options: ["Fila", "Pilha", "Array", "Grafo"], correctIndex: 1, explanation: "Desfazer usa uma pilha: a última ação é desfeita primeiro!" },
      { question: "Em uma fila, quem é atendido primeiro?", options: ["O último", "Quem tem pressa", "O primeiro a chegar", "Qualquer um"], correctIndex: 2, explanation: "FIFO: First In, First Out!" },
    ],
  },
  hashtable: {
    title: "Tabelas Hash",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo funcionam as tabelas hash (hash tables), a estrutura de dados que permite buscar, inserir e remover em O(1)!\n\n### 📋 Pré-requisitos\n- Arrays\n- Conceito de funções\n\n### 📚 O que é uma Tabela Hash?\nImagine um **dicionário**: você não lê página por página para encontrar "zebra". Você vai direto ao "Z"!\n\nUma tabela hash funciona assim:\n1. Recebe uma **chave** (ex: "nome")\n2. Aplica uma **função hash** que transforma a chave em um **índice**\n3. Guarda o valor nesse índice\n\n### 🔑 Função Hash\nÉ uma função que transforma uma chave em um número (índice). Uma boa função hash:\n- É rápida de calcular\n- Distribui bem os valores (evita "colisões")\n\n### 💥 O que são Colisões?\nQuando duas chaves diferentes geram o mesmo índice. Soluções:\n- **Encadeamento**: Cada posição tem uma lista\n- **Endereçamento aberto**: Procura a próxima posição livre\n\n### 📊 Onde são usadas?\n- Objetos/dicionários em JavaScript ({ chave: valor })\n- Caches e memoização\n- Bancos de dados (índices)\n- Verificação de duplicatas\n\n### ⚡ Complexidade\n- Busca: O(1) em média\n- Inserção: O(1) em média\n- Remoção: O(1) em média\n- Pior caso (muitas colisões): O(n)`,
    codeExample: `// ========================================
// TABELA HASH — Implementação simples
// ========================================

class TabelaHash {
  constructor(tamanho = 53) {
    this.tabela = new Array(tamanho);
    this.tamanho = tamanho;
  }

  // Função hash: transforma string em índice
  _hash(chave) {
    let total = 0;
    const PRIMO = 31; // Número primo melhora distribuição
    for (let i = 0; i < Math.min(chave.length, 100); i++) {
      const charCode = chave.charCodeAt(i) - 96;
      total = (total * PRIMO + charCode) % this.tamanho;
    }
    return total;
  }

  // Inserir (com encadeamento para colisões)
  inserir(chave, valor) {
    const indice = this._hash(chave);
    if (!this.tabela[indice]) {
      this.tabela[indice] = [];
    }
    // Verifica se a chave já existe
    const existente = this.tabela[indice].find(p => p[0] === chave);
    if (existente) {
      existente[1] = valor; // Atualiza
    } else {
      this.tabela[indice].push([chave, valor]);
    }
  }

  // Buscar
  buscar(chave) {
    const indice = this._hash(chave);
    if (this.tabela[indice]) {
      const par = this.tabela[indice].find(p => p[0] === chave);
      return par ? par[1] : undefined;
    }
    return undefined;
  }
}

const agenda = new TabelaHash();
agenda.inserir("Ana", "9999-1111");
agenda.inserir("Bob", "9999-2222");
agenda.inserir("Carol", "9999-3333");

console.log(agenda.buscar("Ana"));   // "9999-1111"
console.log(agenda.buscar("Bob"));   // "9999-2222"
console.log(agenda.buscar("Zé"));    // undefined

// Em JavaScript, objetos JÁ SÃO tabelas hash!
const mapa = { nome: "Ana", idade: 25 };
console.log(mapa["nome"]); // "Ana" — acesso O(1)!`,
    challenge: "Adicione um método 'remover(chave)' e um método 'chaves()' que retorna todas as chaves armazenadas na tabela hash.",
    diogenesTip: "Em JavaScript, objetos e Maps já são tabelas hash! Entender como funcionam por dentro te dá um superpoder na hora de escolher a estrutura certa. 🗝️",
    quiz: [
      { question: "Qual a complexidade média de busca em uma tabela hash?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correctIndex: 2, explanation: "Tabelas hash oferecem busca em O(1) — tempo constante, independente do tamanho!" },
      { question: "O que é uma colisão em tabela hash?", options: ["Quando dois valores são iguais", "Quando duas chaves geram o mesmo índice", "Quando a tabela fica cheia", "Quando a função hash falha"], correctIndex: 1, explanation: "Colisão acontece quando chaves diferentes são mapeadas para o mesmo índice." },
      { question: "Em JavaScript, qual estrutura usa tabela hash?", options: ["Arrays", "Strings", "Objetos e Maps", "Numbers"], correctIndex: 2, explanation: "Objetos ({}) e Maps são implementados como tabelas hash internamente!" },
    ],
  },
  conjuntos: {
    title: "Conjuntos (Sets)",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nO que são conjuntos (Sets), como usá-los e por que são perfeitos para evitar duplicatas e fazer operações matemáticas!\n\n### 📋 Pré-requisitos\n- Arrays\n- Conceito de tabelas hash (aula anterior)\n\n### 🎯 O que é um Set?\nUm **Set** é como uma **coleção de figurinhas**: cada uma aparece NO MÁXIMO uma vez! Se você tentar adicionar uma repetida, ela é ignorada.\n\n### 🆚 Set vs Array\n- **Array**: Permite duplicatas, tem ordem, acessa por índice\n- **Set**: SEM duplicatas, sem índice, busca ultra-rápida O(1)\n\n### 🔧 Operações de Conjuntos\n- **União**: Todos os elementos de A e B juntos\n- **Interseção**: Apenas os elementos que estão em A E em B\n- **Diferença**: Elementos que estão em A mas NÃO em B\n\n### 📊 Quando usar Sets?\n- Remover duplicatas de uma lista\n- Verificar se um item existe rapidamente\n- Operações matemáticas de conjuntos\n- Contar elementos únicos`,
    codeExample: `// ========================================
// SETS — Conjuntos sem duplicatas
// ========================================

// Criar um Set
const frutas = new Set(["maçã", "banana", "maçã", "laranja"]);
console.log(frutas); // Set {"maçã", "banana", "laranja"} — sem duplicata!
console.log(frutas.size); // 3

// Adicionar e verificar
frutas.add("uva");
frutas.add("maçã"); // Ignorado, já existe!
console.log(frutas.has("banana")); // true — busca O(1)!
console.log(frutas.has("abacaxi")); // false

// Remover duplicatas de um array
const numeros = [1, 2, 3, 2, 1, 4, 5, 4];
const unicos = [...new Set(numeros)];
console.log(unicos); // [1, 2, 3, 4, 5]

// ========================================
// OPERAÇÕES DE CONJUNTOS
// ========================================

const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([4, 5, 6, 7, 8]);

// UNIÃO: todos os elementos
const uniao = new Set([...A, ...B]);
console.log([...uniao]); // [1, 2, 3, 4, 5, 6, 7, 8]

// INTERSEÇÃO: elementos em comum
const intersecao = new Set([...A].filter(x => B.has(x)));
console.log([...intersecao]); // [4, 5]

// DIFERENÇA: em A mas não em B
const diferenca = new Set([...A].filter(x => !B.has(x)));
console.log([...diferenca]); // [1, 2, 3]`,
    challenge: "Crie uma função que recebe dois arrays e retorna: a união, a interseção e a diferença simétrica (elementos que estão em A OU B, mas NÃO em ambos).",
    diogenesTip: "Sets são como coleções de figurinhas: nada repete! Use para remover duplicatas em uma linha: [...new Set(array)]. Simples e elegante! ✨",
    quiz: [
      { question: "O que acontece ao adicionar um valor duplicado a um Set?", options: ["Erro", "O valor é adicionado duas vezes", "O valor é ignorado", "O Set é limpo"], correctIndex: 2, explanation: "Sets não permitem duplicatas — valores repetidos são simplesmente ignorados." },
      { question: "Qual a forma mais rápida de remover duplicatas de um array?", options: ["Usar dois loops", "[...new Set(array)]", "Usar sort()", "Usar filter()"], correctIndex: 1, explanation: "Converter para Set e voltar para array remove duplicatas em uma linha!" },
      { question: "A interseção de {1,2,3} e {2,3,4} é:", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "{1}"], correctIndex: 1, explanation: "Interseção são os elementos que aparecem em AMBOS os conjuntos: 2 e 3." },
    ],
  },
  arvores: {
    title: "Árvores Binárias",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nO que são árvores binárias e como elas organizam dados eficientemente.\n\n### 🌳 O que é uma Árvore Binária?\nComo uma árvore genealógica invertida:\n- **Nó raiz** no topo\n- Cada nó tem **no máximo 2 filhos**\n- Nós sem filhos = **folhas**\n\n### 🔍 BST (Binary Search Tree)\n- Menores ficam à ESQUERDA\n- Maiores ficam à DIREITA\n- Busca em O(log n) — elimina metade a cada passo!`,
    codeExample: `class NoArvore {
  constructor(valor) {
    this.valor = valor;
    this.esquerda = null;
    this.direita = null;
  }
}

class ArvoreBST {
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

  buscar(valor) {
    let atual = this.raiz;
    while (atual) {
      if (valor === atual.valor) return true;
      atual = valor < atual.valor ? atual.esquerda : atual.direita;
    }
    return false;
  }
}

const arvore = new ArvoreBST();
[8, 3, 10, 1, 6, 14].forEach(v => arvore.inserir(v));
console.log(arvore.buscar(6));  // true
console.log(arvore.buscar(99)); // false`,
    challenge: "Implemente um método 'emOrdem()' que visita todos os nós em ordem crescente usando recursão.",
    diogenesTip: "Uma BST é como um jogo de 'maior ou menor': a cada nó, decide esquerda ou direita. Em poucos passos, encontra o que procura!",
    quiz: [
      { question: "Na BST, onde ficam os valores menores?", options: ["À direita", "À esquerda", "No topo", "Aleatório"], correctIndex: 1, explanation: "Menores à esquerda, maiores à direita — regra fundamental!" },
      { question: "Quantos filhos um nó pode ter em árvore BINÁRIA?", options: ["1", "2", "3", "Ilimitado"], correctIndex: 1, explanation: "Binária = dois. No máximo 2 filhos." },
      { question: "Por que a busca em BST é eficiente?", options: ["Olha todos os nós", "Elimina metade a cada passo", "Usa arrays", "É aleatória"], correctIndex: 1, explanation: "A cada comparação, descarta metade da árvore → O(log n)." },
    ],
  },
  heap: {
    title: "Heap (Fila de Prioridade)",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nO que é um Heap e como implementar uma fila de prioridade — uma estrutura onde o elemento mais importante é sempre atendido primeiro!\n\n### 📋 Pré-requisitos\n- Árvores binárias (conceito)\n- Arrays\n\n### 🏥 O que é um Heap?\nImagine o **pronto-socorro**: não é quem chegou primeiro que é atendido, mas sim quem está em pior estado (maior prioridade)!\n\nUm **Heap** é uma árvore binária especial onde:\n- **Max-Heap**: O pai é sempre MAIOR que os filhos\n- **Min-Heap**: O pai é sempre MENOR que os filhos\n\n### 💡 Truque genial: Heap em Array!\nNão precisamos de nós e ponteiros. Usamos um array simples!\n- Pai do nó i → Math.floor((i-1)/2)\n- Filho esquerdo → 2*i + 1\n- Filho direito → 2*i + 2\n\n### ⚡ Complexidade\n- Inserir: O(log n)\n- Remover o topo: O(log n)\n- Ver o topo: O(1)\n\n### 📊 Onde são usados?\n- Filas de prioridade (processos do SO, impressão)\n- Algoritmo de Dijkstra (menor caminho)\n- Heap Sort\n- Sistemas de agendamento`,
    codeExample: `// ========================================
// MIN-HEAP — Fila de Prioridade
// ========================================

class MinHeap {
  constructor() { this.heap = []; }

  // Inserir mantendo a propriedade do heap
  inserir(valor) {
    this.heap.push(valor);
    this._subirNo(this.heap.length - 1);
  }

  // Remover o menor (topo)
  removerMinimo() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const ultimo = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = ultimo;
      this._descerNo(0);
    }
    return min;
  }

  _subirNo(indice) {
    while (indice > 0) {
      const paiIdx = Math.floor((indice - 1) / 2);
      if (this.heap[paiIdx] <= this.heap[indice]) break;
      [this.heap[paiIdx], this.heap[indice]] = 
        [this.heap[indice], this.heap[paiIdx]];
      indice = paiIdx;
    }
  }

  _descerNo(indice) {
    const n = this.heap.length;
    while (true) {
      let menor = indice;
      const esq = 2 * indice + 1;
      const dir = 2 * indice + 2;
      if (esq < n && this.heap[esq] < this.heap[menor]) menor = esq;
      if (dir < n && this.heap[dir] < this.heap[menor]) menor = dir;
      if (menor === indice) break;
      [this.heap[indice], this.heap[menor]] = 
        [this.heap[menor], this.heap[indice]];
      indice = menor;
    }
  }
}

// Simulando pronto-socorro (menor = mais urgente)
const ps = new MinHeap();
ps.inserir(5); // Dor de cabeça
ps.inserir(1); // Infarto! 🚨
ps.inserir(3); // Fratura
ps.inserir(2); // Falta de ar

console.log(ps.removerMinimo()); // 1 (Infarto — prioridade máxima!)
console.log(ps.removerMinimo()); // 2 (Falta de ar)
console.log(ps.removerMinimo()); // 3 (Fratura)`,
    challenge: "Implemente um MaxHeap (o maior no topo) e use-o para encontrar os 3 maiores valores de um array de 1000 números aleatórios.",
    diogenesTip: "Heap é o pronto-socorro dos dados: quem tem mais prioridade é atendido primeiro, independente de quando chegou! Essencial para sistemas reais. 🏥",
    quiz: [
      { question: "Em um Min-Heap, onde está o menor valor?", options: ["No final", "No meio", "Na raiz (topo)", "Em qualquer lugar"], correctIndex: 2, explanation: "No Min-Heap, o menor valor está sempre na raiz (topo) — acessível em O(1)!" },
      { question: "Como representamos um Heap em um array?", options: ["Não é possível", "Filho esquerdo = 2*i + 1, filho direito = 2*i + 2", "Cada nó tem um ponteiro", "Usando uma lista encadeada"], correctIndex: 1, explanation: "Usamos fórmulas matemáticas para encontrar pai e filhos sem precisar de ponteiros!" },
      { question: "Qual a complexidade de inserir em um Heap?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctIndex: 2, explanation: "Ao inserir, o elemento pode 'subir' no máximo log n níveis até a raiz." },
    ],
  },
  trie: {
    title: "Trie (Árvore de Prefixos)",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nO que é uma Trie e como ela permite buscar palavras instantaneamente — a estrutura por trás do autocompletar!\n\n### 📋 Pré-requisitos\n- Conceito de árvores\n- Strings\n- Objetos/Maps\n\n### 🔤 O que é uma Trie?\nÉ uma árvore onde cada caminho da raiz até um nó forma uma palavra ou prefixo. O nome vem de "re**TRIE**val" (recuperação).\n\n**Analogia:** Imagine um catálogo telefônico organizado letra por letra:\n- Para encontrar "café": vá em C → A → F → É\n- Para encontrar "casa": vá em C → A → S → A\n- Note que "ca" é compartilhado!\n\n### 🚀 Por que usar Trie?\n- **Autocompletar**: Digite "pro" → sugere "programação", "projeto", "professor"\n- **Corretor ortográfico**: Verifica se a palavra existe\n- **Busca por prefixo**: Encontre todas as palavras que começam com X\n\n### ⚡ Complexidade\n- Inserir/Buscar: O(m) onde m é o comprimento da palavra\n- Independe de quantas palavras existem!\n\n### 📊 Onde são usadas?\n- Google Search (sugestões ao digitar)\n- IDEs (autocompletar código)\n- Dicionários e corretores\n- Roteamento de IP em redes`,
    codeExample: `// ========================================
// TRIE — Árvore de Prefixos
// ========================================

class NoTrie {
  constructor() {
    this.filhos = {};       // { letra: NoTrie }
    this.fimDePalavra = false; // Marca fim de palavra completa
  }
}

class Trie {
  constructor() {
    this.raiz = new NoTrie();
  }

  // Inserir uma palavra
  inserir(palavra) {
    let atual = this.raiz;
    for (const letra of palavra) {
      if (!atual.filhos[letra]) {
        atual.filhos[letra] = new NoTrie();
      }
      atual = atual.filhos[letra];
    }
    atual.fimDePalavra = true;
  }

  // Buscar uma palavra completa
  buscar(palavra) {
    let atual = this.raiz;
    for (const letra of palavra) {
      if (!atual.filhos[letra]) return false;
      atual = atual.filhos[letra];
    }
    return atual.fimDePalavra;
  }

  // Autocompletar: retorna palavras com o prefixo
  autocompletar(prefixo) {
    let atual = this.raiz;
    for (const letra of prefixo) {
      if (!atual.filhos[letra]) return [];
      atual = atual.filhos[letra];
    }
    // Coletar todas as palavras a partir deste nó
    const resultados = [];
    this._coletar(atual, prefixo, resultados);
    return resultados;
  }

  _coletar(no, prefixo, resultados) {
    if (no.fimDePalavra) resultados.push(prefixo);
    for (const [letra, filho] of Object.entries(no.filhos)) {
      this._coletar(filho, prefixo + letra, resultados);
    }
  }
}

const dicionario = new Trie();
["programação", "programa", "projeto", "professor", "produto"].forEach(
  p => dicionario.inserir(p)
);

console.log(dicionario.buscar("programa"));     // true
console.log(dicionario.buscar("prog"));          // false
console.log(dicionario.autocompletar("pro"));    // ["programação", "programa", "projeto", "professor", "produto"]
console.log(dicionario.autocompletar("prog"));   // ["programação", "programa"]`,
    challenge: "Adicione um método 'remover(palavra)' que remove uma palavra da Trie sem afetar outras que compartilham o mesmo prefixo.",
    diogenesTip: "Toda vez que o Google sugere algo enquanto você digita, uma Trie está trabalhando! É a estrutura perfeita para buscas por prefixo. 🔍",
    quiz: [
      { question: "O que é uma Trie?", options: ["Um tipo de array", "Uma árvore onde cada caminho forma uma palavra/prefixo", "Um grafo circular", "Uma tabela hash"], correctIndex: 1, explanation: "Trie é uma árvore onde caminhos da raiz representam palavras ou prefixos compartilhados." },
      { question: "Qual a principal aplicação de uma Trie?", options: ["Ordenação", "Autocompletar e busca por prefixo", "Cálculos matemáticos", "Compressão de vídeo"], correctIndex: 1, explanation: "Tries são perfeitas para autocompletar — encontrar todas as palavras que começam com um prefixo!" },
      { question: "A busca em uma Trie depende de:", options: ["Número total de palavras armazenadas", "Comprimento da palavra buscada", "Tamanho da memória", "Velocidade do processador"], correctIndex: 1, explanation: "A busca é O(m) onde m é o comprimento da palavra — independe de quantas palavras existem!" },
    ],
  },
  grafos: {
    title: "Grafos",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nO que são grafos, como representá-los e como percorrê-los.\n\n### 🕸️ O que é um Grafo?\nModela **conexões entre coisas**: pessoas em redes sociais, cidades em mapas, sites na internet.\n\n### 📂 Tipos\n- **Não-direcionado**: Conexão nos dois sentidos (amizade)\n- **Direcionado**: Conexão com direção (seguir no Instagram)\n- **Ponderado**: Conexões com peso (distância)\n\n### 🔍 Percorrendo\n- **BFS** (Largura): Visita vizinhos primeiro. Usa FILA.\n- **DFS** (Profundidade): Vai fundo antes de voltar. Usa PILHA.`,
    codeExample: `class Grafo {
  constructor() { this.adjacencia = new Map(); }

  adicionarVertice(v) {
    if (!this.adjacencia.has(v)) this.adjacencia.set(v, []);
  }

  adicionarAresta(v1, v2) {
    this.adjacencia.get(v1).push(v2);
    this.adjacencia.get(v2).push(v1);
  }

  bfs(inicio) {
    const visitados = new Set();
    const fila = [inicio];
    visitados.add(inicio);
    const ordem = [];
    while (fila.length > 0) {
      const vertice = fila.shift();
      ordem.push(vertice);
      for (const vizinho of this.adjacencia.get(vertice)) {
        if (!visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push(vizinho);
        }
      }
    }
    return ordem;
  }
}

const rede = new Grafo();
["Ana", "Bob", "Carol", "Diana"].forEach(v => rede.adicionarVertice(v));
rede.adicionarAresta("Ana", "Bob");
rede.adicionarAresta("Ana", "Carol");
rede.adicionarAresta("Bob", "Diana");
console.log(rede.bfs("Ana")); // ["Ana", "Bob", "Carol", "Diana"]`,
    challenge: "Implemente DFS (busca em profundidade) usando uma pilha ao invés de fila.",
    diogenesTip: "Grafos estão em todo lugar: redes sociais, GPS, internet. Se você entende grafos, entende como o mundo digital se conecta! 🌐",
    quiz: [
      { question: "O que compõe um grafo?", options: ["Arrays e loops", "Vértices e arestas", "Nós e folhas", "Pilhas e filas"], correctIndex: 1, explanation: "Grafo = vértices (nós) + arestas (conexões)." },
      { question: "Instagram (seguir) é um grafo:", options: ["Não-direcionado", "Direcionado", "Ponderado", "Desconectado"], correctIndex: 1, explanation: "A pode seguir B sem B seguir A — conexão com direção!" },
      { question: "BFS usa qual estrutura?", options: ["Pilha", "Árvore", "Fila", "Array simples"], correctIndex: 2, explanation: "BFS usa fila para visitar vizinhos nível por nível." },
    ],
  },
  matrices: {
    title: "Matrizes e Tabelas",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo trabalhar com matrizes (arrays 2D) — dados organizados em linhas e colunas, como planilhas do Excel!\n\n### 📋 Pré-requisitos\n- Arrays\n- Loops aninhados\n\n### 📊 O que é uma Matriz?\nUma **matriz** é um array de arrays — ou seja, uma **tabela** com linhas e colunas.\n\n**Analogia:** Pense numa planilha do Excel:\n- Cada linha é um array\n- Todas as linhas juntas formam a matriz\n\n### 📍 Acessando Elementos\nmatriz[linha][coluna]\n- matriz[0][0] → primeiro elemento (canto superior esquerdo)\n- matriz[1][2] → segunda linha, terceira coluna\n\n### 🔧 Operações Comuns\n- Percorrer todos os elementos (dois loops)\n- Transpor (trocar linhas por colunas)\n- Somar matrizes\n- Multiplicar matrizes\n- Buscar um valor\n\n### 📊 Onde são usadas?\n- Jogos (tabuleiros, mapas)\n- Imagens (cada pixel é uma posição)\n- Planilhas e tabelas de dados\n- Inteligência artificial (redes neurais)\n- GPS (mapas de grade)`,
    codeExample: `// ========================================
// MATRIZES — Arrays bidimensionais
// ========================================

// Criando uma matriz 3x3
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Acessando elementos
console.log(matriz[0][0]); // 1 (linha 0, coluna 0)
console.log(matriz[1][2]); // 6 (linha 1, coluna 2)

// Percorrendo toda a matriz
console.log("--- Percorrendo ---");
for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    process.stdout.write(matriz[i][j] + " ");
  }
  console.log(); // Nova linha
}

// Somar duas matrizes
function somarMatrizes(a, b) {
  const resultado = [];
  for (let i = 0; i < a.length; i++) {
    resultado[i] = [];
    for (let j = 0; j < a[i].length; j++) {
      resultado[i][j] = a[i][j] + b[i][j];
    }
  }
  return resultado;
}

const m1 = [[1, 2], [3, 4]];
const m2 = [[5, 6], [7, 8]];
console.log(somarMatrizes(m1, m2));
// [[6, 8], [10, 12]]

// Transpor uma matriz (trocar linhas por colunas)
function transpor(matriz) {
  const linhas = matriz.length;
  const colunas = matriz[0].length;
  const resultado = [];
  for (let j = 0; j < colunas; j++) {
    resultado[j] = [];
    for (let i = 0; i < linhas; i++) {
      resultado[j][i] = matriz[i][j];
    }
  }
  return resultado;
}

console.log(transpor([[1, 2, 3], [4, 5, 6]]));
// [[1, 4], [2, 5], [3, 6]]`,
    challenge: "Crie um jogo da velha (tic-tac-toe) usando uma matriz 3x3. Implemente funções para: colocar peça, verificar vitória e imprimir o tabuleiro.",
    diogenesTip: "Matrizes são a base de MUITAS coisas: jogos, imagens, IA. Se você domina loops aninhados, domina matrizes. Pense em 'linha-coluna' como 'andar-apartamento'! 🏢",
    quiz: [
      { question: "Como acessar o elemento da 2ª linha, 3ª coluna?", options: ["matriz[2][3]", "matriz[1][2]", "matriz[3][2]", "matriz[2,3]"], correctIndex: 1, explanation: "Índices começam em 0! Linha 2 = índice 1, coluna 3 = índice 2 → matriz[1][2]." },
      { question: "Quantos loops são necessários para percorrer uma matriz?", options: ["1", "2", "3", "Depende do tamanho"], correctIndex: 1, explanation: "Dois loops: um para linhas, outro para colunas dentro de cada linha." },
      { question: "O que é transpor uma matriz?", options: ["Deletar a matriz", "Trocar linhas por colunas", "Inverter a ordem", "Multiplicar por -1"], correctIndex: 1, explanation: "Transpor significa trocar linhas por colunas: o que era linha vira coluna e vice-versa." },
    ],
  },
};

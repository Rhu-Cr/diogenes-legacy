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
      content: `### 🎯 O que você vai aprender\nNesta aula, você vai entender o que é um algoritmo e por que ele é a base de toda a programação. Não se preocupe se nunca programou antes — vamos começar do zero!\n\n### 📖 O que é um Algoritmo?\nUm **algoritmo** é simplesmente uma sequência de passos para resolver um problema. Você já usa algoritmos no dia a dia sem perceber!\n\n**Exemplo do cotidiano — Fazer um café:**\n1. Pegar a xícara\n2. Colocar água na chaleira\n3. Esquentar a água\n4. Colocar o pó de café no filtro\n5. Despejar a água quente\n6. Servir o café na xícara\n\nIsso é um algoritmo! Cada passo é claro, tem uma ordem, e no final você obtém o resultado.\n\n### ✅ Características de um bom algoritmo\n- **Finitude**: Deve terminar em algum momento (não pode rodar para sempre)\n- **Clareza**: Cada passo deve ser simples e sem dúvidas\n- **Entrada**: Os dados que o algoritmo recebe (ex: uma lista de números)\n- **Saída**: O resultado que ele produz (ex: o maior número)\n- **Efetividade**: Cada passo deve ser possível de executar\n\n### 🧠 Por que algoritmos são importantes?\nTodo programa de computador é, no fundo, um conjunto de algoritmos. Quando você pesquisa no Google, assiste um vídeo no YouTube ou pede comida por app — algoritmos estão trabalhando por trás!\n\n### 📝 Passo a passo para criar um algoritmo\n1. **Entenda o problema**: O que preciso resolver?\n2. **Identifique as entradas**: Quais dados eu tenho?\n3. **Defina a saída**: O que quero como resultado?\n4. **Escreva os passos**: Em português simples, descreva cada ação\n5. **Teste mentalmente**: Simule com exemplos para ver se funciona\n6. **Traduza para código**: Agora sim, programe!`,
      codeExample: `// PASSO A PASSO: Encontrar o maior número de uma lista
// 
// Problema: Dada uma lista de números, qual é o maior?
// Entrada: Uma lista como [3, 7, 2, 9, 1]
// Saída esperada: 9
//
// Raciocínio em português:
// 1. Comece assumindo que o primeiro número é o maior
// 2. Compare com cada número seguinte
// 3. Se encontrar um maior, atualize
// 4. No final, você terá o maior número

function encontrarMaior(numeros) {
  // Passo 1: Assumir que o primeiro é o maior
  let maior = numeros[0];
  
  // Passo 2 e 3: Percorrer e comparar
  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
      maior = numeros[i]; // Encontrou um maior! Atualiza.
    }
  }
  
  // Passo 4: Retornar o resultado
  return maior;
}

// Teste com exemplos:
console.log(encontrarMaior([3, 7, 2, 9, 1])); // 9
console.log(encontrarMaior([10, 5, 20, 3]));   // 20
console.log(encontrarMaior([1]));               // 1 (só tem um!)`,
      challenge: "Modifique o algoritmo acima para encontrar tanto o maior quanto o menor número do array. Dica: crie duas variáveis (maior e menor) e compare cada número com ambas.",
      diogenesTip: "Antes de programar, escreva o passo a passo em português! Se você consegue explicar para uma criança de 10 anos, você entendeu. Se não consegue, simplifique mais!",
      quiz: [
        { question: "O que é um algoritmo?", options: ["Um tipo de linguagem de programação", "Uma sequência finita de instruções para resolver um problema", "Um software de computador", "Um banco de dados"], correctIndex: 1, explanation: "Um algoritmo é uma sequência finita de instruções bem definidas para resolver um problema — como uma receita!" },
        { question: "Qual NÃO é uma característica de um bom algoritmo?", options: ["Finitude (deve terminar)", "Ambiguidade (passos confusos)", "Efetividade (passos executáveis)", "Saída (produz resultado)"], correctIndex: 1, explanation: "Um bom algoritmo deve ter clareza — sem ambiguidade! Cada passo precisa ser claro." },
        { question: "Qual é a saída de encontrarMaior([3, 7, 2, 9, 1])?", options: ["3", "7", "9", "1"], correctIndex: 2, explanation: "O algoritmo percorre o array comparando cada número e retorna o maior valor, que é 9." },
      ],
    },
    busca: {
      title: "Algoritmos de Busca",
      content: `### 🎯 O que você vai aprender\nComo encontrar um item específico dentro de uma lista de dados. Vamos ver duas formas: a simples e a inteligente!\n\n### 📋 Pré-requisitos\nAntes de começar, é bom que você saiba:\n- O que é um array (lista de dados)\n- O que é um loop/laço de repetição\n- Conceito básico de algoritmo (aula anterior)\n\n### 🔍 Busca Linear — A forma simples\nImagine que você perdeu suas chaves e precisa procurar em todas as gavetas, uma por uma, até encontrar. Isso é **busca linear**!\n\n**Como funciona:**\n1. Comece pelo primeiro elemento\n2. Compare com o que está procurando\n3. Se for igual, encontrou! Retorne a posição\n4. Se não, vá para o próximo\n5. Se chegou ao final sem encontrar, retorne "não encontrado"\n\n**Velocidade:** O(n) — no pior caso, olha todos os elementos\n\n### 🚀 Busca Binária — A forma inteligente\nAgora imagine que você está procurando uma palavra no dicionário. Você não começa da página 1, certo? Você abre no meio e vai direcionando!\n\n**Requisito importante:** A lista PRECISA estar ordenada (em ordem)!\n\n**Como funciona:**\n1. Olhe o elemento do meio da lista\n2. Se for o que procura, encontrou!\n3. Se o que procura é MENOR, descarte a metade direita\n4. Se o que procura é MAIOR, descarte a metade esquerda\n5. Repita com a metade restante\n\n**Velocidade:** O(log n) — muito mais rápido! Em uma lista de 1.000.000 de itens, precisa de apenas ~20 comparações!\n\n### 📊 Comparação\n- Lista com 100 itens: Linear = até 100 comparações | Binária = até 7\n- Lista com 1.000 itens: Linear = até 1.000 | Binária = até 10\n- Lista com 1.000.000: Linear = até 1.000.000 | Binária = até 20`,
      codeExample: `// ========================================
// BUSCA LINEAR — passo a passo
// ========================================
// Procura um valor percorrendo um por um

function buscaLinear(lista, alvo) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === alvo) {
      return i; // Encontrou! Retorna a posição
    }
  }
  return -1; // Não encontrou (convenção: -1)
}

// Teste:
console.log(buscaLinear([4, 2, 7, 1, 9], 7)); // 2 (posição do 7)
console.log(buscaLinear([4, 2, 7, 1, 9], 5)); // -1 (não existe)

// ========================================
// BUSCA BINÁRIA — passo a passo
// ========================================
// IMPORTANTE: a lista PRECISA estar ordenada!

function buscaBinaria(lista, alvo) {
  let inicio = 0;              // Começo da região de busca
  let fim = lista.length - 1;  // Final da região de busca
  
  while (inicio <= fim) {
    // Passo 1: Encontrar o meio
    let meio = Math.floor((inicio + fim) / 2);
    
    // Passo 2: Comparar
    if (lista[meio] === alvo) {
      return meio; // Encontrou!
    }
    
    // Passo 3: Descartar metade
    if (lista[meio] < alvo) {
      inicio = meio + 1; // Alvo está na metade direita
    } else {
      fim = meio - 1;    // Alvo está na metade esquerda
    }
  }
  
  return -1; // Não encontrou
}

// Teste (lista DEVE estar ordenada):
console.log(buscaBinaria([1, 3, 5, 7, 9], 7)); // 3 (posição do 7)
console.log(buscaBinaria([1, 3, 5, 7, 9], 4)); // -1 (não existe)`,
      challenge: "Implemente uma busca binária recursiva (a função chama ela mesma em vez de usar while). Dica: em vez de mover inicio/fim, chame a função passando a nova faixa.",
      diogenesTip: "A busca binária é como procurar uma palavra no dicionário: você não começa da primeira página, vai direto ao meio! Mas lembre-se: só funciona se estiver em ordem alfabética!",
      quiz: [
        { question: "Qual a diferença principal entre busca linear e binária?", options: ["A linear é mais rápida", "A binária funciona em qualquer lista", "A binária exige lista ordenada mas é muito mais rápida", "Não há diferença"], correctIndex: 2, explanation: "A busca binária é muito mais rápida (O(log n) vs O(n)), mas exige que a lista esteja ordenada." },
        { question: "Em uma lista com 1.000.000 de itens, quantas comparações a busca binária precisa no máximo?", options: ["1.000.000", "500.000", "Cerca de 20", "100"], correctIndex: 2, explanation: "log₂(1.000.000) ≈ 20. A busca binária corta pela metade a cada passo!" },
        { question: "O que significa retornar -1 em uma busca?", options: ["Encontrou no início", "Encontrou no final", "O elemento não foi encontrado", "Erro no programa"], correctIndex: 2, explanation: "Retornar -1 é uma convenção para indicar que o elemento não existe na lista." },
      ],
    },
    ordenacao: {
      title: "Algoritmos de Ordenação",
      content: `### 🎯 O que você vai aprender\nComo organizar dados em ordem (crescente ou decrescente). Ordenar é uma das tarefas mais importantes na computação!\n\n### 📋 Pré-requisitos\n- Saber o que são arrays\n- Entender loops e condições\n- Conceito de troca de valores entre variáveis\n\n### 🫧 Bubble Sort — Ordenação por bolha\nO algoritmo mais simples de entender! Imagine bolhas subindo na água — os maiores valores "sobem" para o final.\n\n**Como funciona (pense em cartas na mão):**\n1. Compare o 1º com o 2º elemento. Se estiverem fora de ordem, troque.\n2. Compare o 2º com o 3º. Se fora de ordem, troque.\n3. Continue até o final da lista.\n4. Repita tudo de novo (o maior já está no final, ignore ele).\n5. Continue até não precisar mais trocar.\n\n**Exemplo visual com [5, 3, 8, 1]:**\n- Rodada 1: [3, 5, 1, 8] → o 8 chegou ao final\n- Rodada 2: [3, 1, 5, 8] → o 5 está no lugar\n- Rodada 3: [1, 3, 5, 8] → ordenado!\n\n**Velocidade:** O(n²) — lento para listas grandes, mas ótimo para aprender!\n\n### ⚡ Quick Sort — Ordenação rápida\nMuito mais eficiente! Usa a estratégia "dividir para conquistar".\n\n**Como funciona:**\n1. Escolha um elemento como "pivô" (geralmente o último)\n2. Separe: menores que o pivô vão para a esquerda, maiores para a direita\n3. Repita o processo em cada metade\n4. Junte tudo!\n\n**Velocidade:** O(n log n) no caso médio — MUITO mais rápido!`,
      codeExample: `// ========================================
// BUBBLE SORT — passo a passo explicado
// ========================================

function bubbleSort(arr) {
  // Cria uma cópia para não alterar o original
  const lista = [...arr];
  const n = lista.length;
  
  // Loop externo: quantas rodadas precisamos
  for (let i = 0; i < n - 1; i++) {
    // Loop interno: compara pares vizinhos
    // Note: (n - i - 1) porque os últimos já estão ordenados!
    for (let j = 0; j < n - i - 1; j++) {
      // Se o atual é MAIOR que o próximo, troque!
      if (lista[j] > lista[j + 1]) {
        // Truque para trocar dois valores em JavaScript:
        [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
      }
    }
  }
  
  return lista;
}

// Teste:
console.log(bubbleSort([64, 34, 25, 12, 22]));
// Resultado: [12, 22, 25, 34, 64]

// Vamos ver o passo a passo com [5, 3, 8, 1]:
// Rodada 1: compara (5,3)→troca, (5,8)→ok, (8,1)→troca → [3, 5, 1, 8]
// Rodada 2: compara (3,5)→ok, (5,1)→troca → [3, 1, 5, 8]
// Rodada 3: compara (3,1)→troca → [1, 3, 5, 8] ✅ Ordenado!`,
      challenge: "Modifique o Bubble Sort para parar mais cedo se a lista já estiver ordenada. Dica: use uma variável 'trocou' — se em uma rodada não houve nenhuma troca, a lista já está pronta!",
      diogenesTip: "Bubble Sort é como organizar cartas na mão: você compara duas vizinhas, troca se preciso, e repete. Simples? Sim! Rápido? Nem tanto... mas é o melhor para começar!",
      quiz: [
        { question: "Por que o Bubble Sort se chama 'bolha'?", options: ["Porque é redondo", "Porque os maiores valores 'sobem' para o final como bolhas", "Porque usa bolhas de memória", "Porque foi inventado em um banho de espuma"], correctIndex: 1, explanation: "Os elementos maiores vão 'subindo' para o final da lista, como bolhas na água!" },
        { question: "Qual a velocidade do Bubble Sort?", options: ["O(n) — muito rápido", "O(n log n) — eficiente", "O(n²) — lento para listas grandes", "O(1) — instantâneo"], correctIndex: 2, explanation: "O Bubble Sort usa dois loops, um dentro do outro, resultando em O(n²)." },
        { question: "O que o Quick Sort faz de diferente?", options: ["Compara pares vizinhos", "Escolhe um pivô e divide a lista em menores e maiores", "Percorre a lista de trás para frente", "Ordena apenas números pares"], correctIndex: 1, explanation: "O Quick Sort escolhe um pivô e separa: menores à esquerda, maiores à direita. Depois repete em cada parte." },
      ],
    },
    recursao: {
      title: "Recursão",
      content: `### 🎯 O que você vai aprender\nO conceito de recursão — quando uma função chama a si mesma. Parece estranho? Vamos simplificar!\n\n### 📋 Pré-requisitos\n- Saber criar funções\n- Entender retorno de funções\n- Conceito de condição (if/else)\n\n### 🪆 O que é Recursão?\nImagine bonecas russas (Matryoshka): você abre uma e dentro tem outra menor, que tem outra menor, até chegar na menorzinha que não abre mais.\n\n**Recursão é exatamente isso:** uma função que resolve um problema chamando a si mesma com um problema menor, até chegar no problema tão pequeno que a resposta é óbvia.\n\n### 🧩 Dois ingredientes obrigatórios\n1. **Caso base** (condição de parada): Quando parar de se chamar\n2. **Caso recursivo**: A chamada a si mesma com entrada MENOR\n\n⚠️ **ATENÇÃO:** Sem caso base, a recursão nunca para e seu programa trava! (Stack Overflow)\n\n### 🔢 Exemplo: Fatorial\nO fatorial de 5 (escrito 5!) é: 5 × 4 × 3 × 2 × 1 = 120\n\nPerceba o padrão:\n- 5! = 5 × 4!\n- 4! = 4 × 3!\n- 3! = 3 × 2!\n- 2! = 2 × 1!\n- 1! = 1 ← CASO BASE! Sabemos a resposta sem calcular mais.\n\n### 🆚 Recursão vs Loop\nTudo que se faz com recursão, pode ser feito com loop (e vice-versa). Recursão é mais elegante em problemas que naturalmente se dividem em subproblemas (árvores, fractais, divisão e conquista).`,
      codeExample: `// ========================================
// FATORIAL — Entendendo recursão passo a passo
// ========================================

// Versão com LOOP (para comparar):
function fatorialLoop(n) {
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado = resultado * i;
  }
  return resultado;
}

// Versão RECURSIVA:
function fatorial(n) {
  // CASO BASE: sabemos que 1! = 1 (e 0! = 1)
  if (n <= 1) return 1;
  
  // CASO RECURSIVO: n! = n × (n-1)!
  return n * fatorial(n - 1);
}

// O que acontece quando chamamos fatorial(4):
// fatorial(4) → 4 * fatorial(3)
//   fatorial(3) → 3 * fatorial(2)
//     fatorial(2) → 2 * fatorial(1)
//       fatorial(1) → 1  ← CASO BASE! Para aqui.
//     fatorial(2) → 2 * 1 = 2
//   fatorial(3) → 3 * 2 = 6
// fatorial(4) → 4 * 6 = 24 ✅

console.log(fatorial(5));    // 120
console.log(fatorial(1));    // 1
console.log(fatorial(0));    // 1

// ========================================
// FIBONACCI — outro clássico recursivo
// ========================================
// Sequência: 0, 1, 1, 2, 3, 5, 8, 13, 21...
// Cada número = soma dos dois anteriores

function fibonacci(n) {
  if (n <= 0) return 0;  // Caso base 1
  if (n === 1) return 1; // Caso base 2
  return fibonacci(n - 1) + fibonacci(n - 2); // Recursivo
}

console.log(fibonacci(7));  // 13
console.log(fibonacci(10)); // 55`,
      challenge: "Implemente a sequência de Fibonacci com memoização (cache) para evitar recalcular valores. Dica: use um objeto para guardar resultados já calculados.",
      diogenesTip: "Recursão é como olhar entre dois espelhos paralelos: a imagem se repete infinitamente! Mas no código, precisamos do caso base para parar — senão... Stack Overflow! 💥",
      quiz: [
        { question: "O que acontece se uma recursão não tiver caso base?", options: ["Retorna undefined", "Entra em loop infinito e trava (Stack Overflow)", "Retorna 0", "Funciona normalmente"], correctIndex: 1, explanation: "Sem caso base, a função se chama infinitamente até estourar a pilha de chamadas (Stack Overflow)." },
        { question: "Qual o valor de fatorial(5)?", options: ["25", "120", "60", "24"], correctIndex: 1, explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120." },
        { question: "Quais são os dois ingredientes obrigatórios da recursão?", options: ["Loop e condição", "Caso base e caso recursivo", "Input e output", "Variável e constante"], correctIndex: 1, explanation: "Toda recursão precisa de um caso base (quando parar) e um caso recursivo (chamar a si mesma com entrada menor)." },
      ],
    },
  },
  estruturas: {
    listas: {
      title: "Listas Encadeadas",
      content: `### 🎯 O que você vai aprender\nO que são listas encadeadas, como funcionam e quando usá-las. Vamos comparar com arrays para você entender as diferenças!\n\n### 📋 Pré-requisitos\n- Saber o que é um array\n- Conceito básico de objetos/classes\n- Entender referências/ponteiros (vamos explicar!)\n\n### 🚂 O que é uma Lista Encadeada?\nImagine um trem: cada vagão sabe qual é o PRÓXIMO vagão, mas não sabe o que tem lá no final. É exatamente assim!\n\nCada elemento (chamado de **nó**) contém:\n- Um **valor** (o dado em si)\n- Uma **referência** (endereço) para o próximo nó\n\n### 🆚 Lista Encadeada vs Array\n**Array [1, 2, 3]:**\n- Dados ficam lado a lado na memória\n- Acesso direto por índice: array[2] → instantâneo!\n- Inserir no meio é lento (precisa empurrar tudo)\n\n**Lista Encadeada 1 → 2 → 3:**\n- Dados podem estar em qualquer lugar da memória\n- Para acessar o 3º, precisa passar pelo 1º e 2º\n- Inserir no meio é rápido (só muda as referências)\n\n### 📊 Quando usar cada um?\n- **Array**: Quando precisa acessar elementos por posição\n- **Lista**: Quando faz muitas inserções e remoções\n\n### 🔗 Como funciona a inserção no início\n1. Crie um novo nó\n2. Faça ele apontar para o primeiro nó atual\n3. Atualize a "cabeça" da lista para ser o novo nó\n\nÉ como adicionar um vagão na frente do trem!`,
      codeExample: `// ========================================
// LISTA ENCADEADA — construindo do zero
// ========================================

// Primeiro, criamos o "vagão" (nó)
class No {
  constructor(valor) {
    this.valor = valor;      // O dado guardado
    this.proximo = null;     // Referência para o próximo nó
    // null = "não tem próximo" (fim da lista)
  }
}

// Agora, criamos o "trem" (lista)
class ListaEncadeada {
  constructor() {
    this.cabeca = null;  // Lista começa vazia
    this.tamanho = 0;
  }

  // Inserir no INÍCIO (mais rápido!)
  inserirNoInicio(valor) {
    const novoNo = new No(valor);
    novoNo.proximo = this.cabeca; // Novo nó aponta para o antigo primeiro
    this.cabeca = novoNo;          // Novo nó vira o primeiro
    this.tamanho++;
  }

  // Inserir no FINAL
  inserirNoFinal(valor) {
    const novoNo = new No(valor);
    
    // Se a lista está vazia, o novo é o primeiro
    if (!this.cabeca) {
      this.cabeca = novoNo;
    } else {
      // Percorre até o último nó
      let atual = this.cabeca;
      while (atual.proximo) {
        atual = atual.proximo;
      }
      atual.proximo = novoNo; // Último aponta para o novo
    }
    this.tamanho++;
  }

  // Imprimir a lista (para visualizar)
  imprimir() {
    let atual = this.cabeca;
    const valores = [];
    while (atual) {
      valores.push(atual.valor);
      atual = atual.proximo;
    }
    console.log(valores.join(" → ") + " → null");
    console.log("Tamanho:", this.tamanho);
  }
}

// Teste:
const lista = new ListaEncadeada();
lista.inserirNoInicio(3);  // 3 → null
lista.inserirNoInicio(2);  // 2 → 3 → null
lista.inserirNoInicio(1);  // 1 → 2 → 3 → null
lista.inserirNoFinal(4);   // 1 → 2 → 3 → 4 → null
lista.imprimir();`,
      challenge: "Adicione um método 'remover(valor)' que remove a primeira ocorrência do valor na lista. Dica: você precisa encontrar o nó ANTERIOR ao que quer remover e fazer ele apontar para o nó DEPOIS.",
      diogenesTip: "Listas encadeadas são como um trem: cada vagão sabe qual é o próximo, mas não tem ideia de quem está lá no final! Para saber, precisa percorrer vagão por vagão.",
      quiz: [
        { question: "Qual a principal diferença entre array e lista encadeada?", options: ["Array é maior", "Array tem acesso direto por índice, lista precisa percorrer", "Lista é sempre mais rápida", "Não há diferença"], correctIndex: 1, explanation: "Arrays permitem acesso direto (array[5]), enquanto listas encadeadas precisam percorrer nó por nó." },
        { question: "O que cada nó de uma lista encadeada contém?", options: ["Apenas um valor", "Um valor e uma referência ao próximo nó", "Um índice e um valor", "Dois valores"], correctIndex: 1, explanation: "Cada nó armazena um valor e um ponteiro (referência) para o próximo nó da lista." },
        { question: "Quando é melhor usar uma lista encadeada ao invés de um array?", options: ["Quando precisa acessar por índice", "Quando faz muitas inserções e remoções", "Quando a lista é pequena", "Sempre"], correctIndex: 1, explanation: "Listas encadeadas são melhores quando há muitas inserções e remoções, pois só mudam referências." },
      ],
    },
    pilhas: {
      title: "Pilhas e Filas",
      content: `### 🎯 O que você vai aprender\nDuas estruturas super importantes e simples: Pilhas e Filas. Você já usa elas todo dia!\n\n### 📋 Pré-requisitos\n- Saber o que é um array\n- Conceito de adicionar e remover itens\n\n### 📚 Pilha (Stack) — LIFO\n**LIFO** = Last In, First Out (Último a Entrar, Primeiro a Sair)\n\n**Analogias do dia a dia:**\n- Uma pilha de pratos: você lava o de cima primeiro (o último colocado)\n- O botão "Desfazer" (Ctrl+Z): desfaz a ÚLTIMA ação que você fez\n- Navegador: botão "Voltar" vai para a ÚLTIMA página visitada\n\n**Operações:**\n- **push** (empilhar): Coloca um item no topo\n- **pop** (desempilhar): Remove e retorna o item do topo\n- **peek** (espiar): Olha o topo sem remover\n\n### 🧑‍🤝‍🧑 Fila (Queue) — FIFO\n**FIFO** = First In, First Out (Primeiro a Entrar, Primeiro a Sair)\n\n**Analogias do dia a dia:**\n- Fila do banco: quem chegou primeiro, é atendido primeiro\n- Fila de impressão: primeiro documento enviado, primeiro a imprimir\n- Fila de mensagens: primeira mensagem enviada, primeira a ser processada\n\n**Operações:**\n- **enqueue** (enfileirar): Coloca no final da fila\n- **dequeue** (desenfileirar): Remove e retorna do início da fila\n- **front** (frente): Olha o primeiro sem remover\n\n### 💡 Dica para lembrar\n- **Pilha** = pense em uma PILHA de livros (tira de cima)\n- **Fila** = pense em uma FILA de supermercado (atende da frente)`,
      codeExample: `// ========================================
// PILHA (Stack) — Último a entrar, primeiro a sair
// ========================================

class Pilha {
  constructor() {
    this.itens = [];
  }

  // Coloca no topo
  empilhar(item) {
    this.itens.push(item);
    console.log(\`📥 Empilhou: \${item}\`);
  }

  // Remove do topo
  desempilhar() {
    if (this.vazia()) {
      console.log("⚠️ Pilha vazia!");
      return null;
    }
    const item = this.itens.pop();
    console.log(\`📤 Desempilhou: \${item}\`);
    return item;
  }

  // Espia o topo
  topo() {
    return this.itens[this.itens.length - 1];
  }

  vazia() { return this.itens.length === 0; }
}

// Simulando Ctrl+Z (desfazer):
const historico = new Pilha();
historico.empilhar("Digitou 'Olá'");
historico.empilhar("Colocou negrito");
historico.empilhar("Mudou a cor");
historico.desempilhar(); // Desfaz: "Mudou a cor"
historico.desempilhar(); // Desfaz: "Colocou negrito"

// ========================================
// FILA (Queue) — Primeiro a entrar, primeiro a sair
// ========================================

class Fila {
  constructor() {
    this.itens = [];
  }

  enfileirar(item) {
    this.itens.push(item);
    console.log(\`🔚 Entrou na fila: \${item}\`);
  }

  desenfileirar() {
    if (this.vazia()) {
      console.log("⚠️ Fila vazia!");
      return null;
    }
    const item = this.itens.shift();
    console.log(\`🔜 Atendido: \${item}\`);
    return item;
  }

  frente() { return this.itens[0]; }
  vazia() { return this.itens.length === 0; }
}

// Simulando fila de atendimento:
const fila = new Fila();
fila.enfileirar("João");    // João chegou
fila.enfileirar("Maria");   // Maria chegou
fila.enfileirar("Pedro");   // Pedro chegou
fila.desenfileirar();       // Atendido: João (chegou primeiro!)
fila.desenfileirar();       // Atendido: Maria`,
      challenge: "Use uma pilha para verificar se parênteses estão balanceados. Ex: '((()))' → true, '(()' → false. Dica: empilhe cada '(' e desempilhe quando encontrar ')'.",
      diogenesTip: "Pilha é o Ctrl+Z da programação: o último comando que você fez é o primeiro a ser desfeito! E fila é como o SUS: quem chegou primeiro, é atendido primeiro. 😅",
      quiz: [
        { question: "O que significa LIFO?", options: ["Last In, First Out", "Last In, Fast Out", "Linear Input, First Output", "Linked In, First Out"], correctIndex: 0, explanation: "LIFO = Last In, First Out — o último a entrar é o primeiro a sair, como uma pilha de pratos." },
        { question: "O Ctrl+Z (desfazer) usa qual estrutura?", options: ["Fila", "Pilha", "Array", "Grafo"], correctIndex: 1, explanation: "O desfazer usa uma pilha: a última ação é a primeira a ser desfeita!" },
        { question: "Em uma fila de banco, quem é atendido primeiro?", options: ["O último a chegar", "Quem tem mais pressa", "O primeiro a chegar", "Qualquer um"], correctIndex: 2, explanation: "FIFO: First In, First Out — quem chegou primeiro, sai primeiro!" },
      ],
    },
    arvores: {
      title: "Árvores Binárias",
      content: `### 🎯 O que você vai aprender\nO que são árvores binárias e como elas organizam dados de forma eficiente. Vamos tornar simples!\n\n### 📋 Pré-requisitos\n- Conceito de nó e referência (visto em Listas)\n- Entender comparações (menor, maior)\n- Noção básica de recursão ajuda, mas não é obrigatório\n\n### 🌳 O que é uma Árvore Binária?\nUma árvore binária é como uma árvore genealógica invertida:\n- Começa por um **nó raiz** (ancestral principal) no topo\n- Cada nó pode ter **no máximo 2 filhos** (esquerdo e direito)\n- Nós sem filhos são chamados de **folhas**\n\n### 🔍 Árvore Binária de Busca (BST)\nUma BST tem uma regra simples que a torna muito útil:\n- Valores **MENORES** ficam à **ESQUERDA**\n- Valores **MAIORES** ficam à **DIREITA**\n\n**Exemplo visual inserindo [8, 3, 10, 1, 6]:**\n\n        8         ← raiz\n       / \\\\\n      3   10      ← 3 < 8 (esquerda), 10 > 8 (direita)\n     / \\\\\n    1   6         ← 1 < 3 (esquerda), 6 > 3 (direita)\n\n### ⚡ Por que árvores são eficientes?\nPara buscar um valor, você elimina METADE das opções a cada passo (parecido com busca binária!):\n- Buscar o 6: começa no 8 → menor, vai esquerda → 3 → maior, vai direita → 6! Encontrou em 3 passos!\n- Complexidade média: O(log n)\n\n### 📊 Onde árvores são usadas?\n- Banco de dados (índices para busca rápida)\n- Sistemas de arquivos (pastas e subpastas)\n- Autocompletar (árvores de prefixos)\n- Compressão de dados (Huffman)`,
      codeExample: `// ========================================
// ÁRVORE BINÁRIA DE BUSCA — passo a passo
// ========================================

// Um nó da árvore (tem valor, filho esquerdo e direito)
class NoArvore {
  constructor(valor) {
    this.valor = valor;
    this.esquerda = null;  // Filho esquerdo (valores menores)
    this.direita = null;   // Filho direito (valores maiores)
  }
}

class ArvoreBinariaBusca {
  constructor() {
    this.raiz = null; // Começa vazia
  }

  // Inserir um valor na posição correta
  inserir(valor) {
    const novoNo = new NoArvore(valor);
    
    // Se a árvore está vazia, o novo nó é a raiz
    if (!this.raiz) {
      this.raiz = novoNo;
      console.log(\`🌱 Raiz criada: \${valor}\`);
      return;
    }
    
    // Senão, procura a posição correta
    let atual = this.raiz;
    while (true) {
      if (valor < atual.valor) {
        // Menor → vai para a ESQUERDA
        if (!atual.esquerda) {
          atual.esquerda = novoNo;
          console.log(\`⬅️ \${valor} inserido à esquerda de \${atual.valor}\`);
          return;
        }
        atual = atual.esquerda;
      } else {
        // Maior ou igual → vai para a DIREITA
        if (!atual.direita) {
          atual.direita = novoNo;
          console.log(\`➡️ \${valor} inserido à direita de \${atual.valor}\`);
          return;
        }
        atual = atual.direita;
      }
    }
  }

  // Buscar um valor
  buscar(valor) {
    let atual = this.raiz;
    let passos = 0;
    
    while (atual) {
      passos++;
      if (valor === atual.valor) {
        console.log(\`✅ Encontrou \${valor} em \${passos} passos!\`);
        return true;
      }
      // Menor → esquerda, Maior → direita
      atual = valor < atual.valor ? atual.esquerda : atual.direita;
    }
    
    console.log(\`❌ \${valor} não encontrado após \${passos} passos\`);
    return false;
  }
}

// Teste: inserindo [8, 3, 10, 1, 6, 14]
const arvore = new ArvoreBinariaBusca();
arvore.inserir(8);
arvore.inserir(3);
arvore.inserir(10);
arvore.inserir(1);
arvore.inserir(6);
arvore.inserir(14);

arvore.buscar(6);   // ✅ Encontrou em 3 passos!
arvore.buscar(14);  // ✅ Encontrou em 2 passos!
arvore.buscar(99);  // ❌ Não encontrado`,
      challenge: "Implemente um método 'emOrdem()' que visita todos os nós da árvore em ordem crescente. Dica: use recursão — visite esquerda, imprima valor, visite direita.",
      diogenesTip: "Uma árvore binária é como um jogo de 'maior ou menor': a cada nó, você decide ir para esquerda ou direita. Em poucos passos, encontra o que procura!",
      quiz: [
        { question: "Em uma BST, onde ficam os valores menores que o nó?", options: ["À direita", "À esquerda", "No topo", "Aleatório"], correctIndex: 1, explanation: "Na BST, valores menores ficam à esquerda e maiores à direita — essa é a regra fundamental!" },
        { question: "Quantos filhos no máximo um nó pode ter em uma árvore BINÁRIA?", options: ["1", "2", "3", "Ilimitado"], correctIndex: 1, explanation: "Binária = dois. Cada nó pode ter no máximo 2 filhos (esquerdo e direito)." },
        { question: "Por que a busca em BST é eficiente?", options: ["Porque olha todos os nós", "Porque elimina metade das opções a cada passo", "Porque usa arrays", "Porque é aleatória"], correctIndex: 1, explanation: "A cada comparação, você descarta metade da árvore, resultando em O(log n)." },
      ],
    },
    grafos: {
      title: "Grafos",
      content: `### 🎯 O que você vai aprender\nO que são grafos, como representá-los e como percorrê-los. Grafos estão em TODO lugar!\n\n### 📋 Pré-requisitos\n- Conceito de nó/vértice\n- Saber usar Map e Set em JavaScript\n- Conceito de Fila (para BFS)\n\n### 🕸️ O que é um Grafo?\nUm grafo modela **conexões entre coisas**. É composto por:\n- **Vértices** (ou nós): os objetos\n- **Arestas**: as conexões entre eles\n\n### 🌍 Exemplos no mundo real\n- **Redes sociais**: Pessoas são vértices, amizades são arestas\n- **GPS/Mapas**: Cidades são vértices, estradas são arestas\n- **Internet**: Sites são vértices, links são arestas\n- **WhatsApp**: Contatos são vértices, conversas são arestas\n\n### 📂 Tipos de Grafos\n- **Não-direcionado**: A conexão vai nos dois sentidos (amizade no Facebook: se A é amigo de B, B é amigo de A)\n- **Direcionado**: A conexão tem direção (seguir no Instagram: A segue B, mas B não segue A)\n- **Ponderado**: As conexões têm peso/custo (distância entre cidades)\n\n### 🗂️ Como representar um Grafo?\nUsamos uma **lista de adjacência**: para cada vértice, guardamos seus vizinhos.\n\nExemplo: Ana conhece Bob e Carol. Bob conhece Ana e Diana.\n- Ana → [Bob, Carol]\n- Bob → [Ana, Diana]\n- Carol → [Ana]\n- Diana → [Bob]\n\n### 🔍 Como percorrer um Grafo?\n- **BFS** (Busca em Largura): Visita todos os vizinhos antes de ir mais fundo. Usa FILA.\n- **DFS** (Busca em Profundidade): Vai o mais fundo possível antes de voltar. Usa PILHA.`,
      codeExample: `// ========================================
// GRAFO — construindo e percorrendo
// ========================================

class Grafo {
  constructor() {
    // Map: cada vértice tem uma lista de vizinhos
    this.adjacencia = new Map();
  }

  // Adicionar um vértice (pessoa, cidade, etc.)
  adicionarVertice(v) {
    if (!this.adjacencia.has(v)) {
      this.adjacencia.set(v, []);
      console.log(\`📍 Vértice adicionado: \${v}\`);
    }
  }

  // Conectar dois vértices (amizade, estrada, etc.)
  adicionarAresta(v1, v2) {
    this.adjacencia.get(v1).push(v2);
    this.adjacencia.get(v2).push(v1); // Bidirecional
    console.log(\`🔗 Conexão: \${v1} ↔ \${v2}\`);
  }

  // BFS — Busca em Largura (usa FILA)
  // "Visita andar por andar" — primeiro todos os vizinhos,
  // depois os vizinhos dos vizinhos, etc.
  bfs(inicio) {
    const visitados = new Set();  // Para não visitar duas vezes
    const fila = [inicio];        // Começa com o primeiro
    visitados.add(inicio);
    const ordem = [];
    
    while (fila.length > 0) {
      const vertice = fila.shift(); // Remove do início (FILA!)
      ordem.push(vertice);
      
      // Adiciona vizinhos não visitados à fila
      for (const vizinho of this.adjacencia.get(vertice)) {
        if (!visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push(vizinho);
        }
      }
    }
    
    console.log("BFS:", ordem.join(" → "));
    return ordem;
  }
}

// Exemplo: rede social simplificada
const rede = new Grafo();
rede.adicionarVertice("Ana");
rede.adicionarVertice("Bob");
rede.adicionarVertice("Carol");
rede.adicionarVertice("Diana");
rede.adicionarVertice("Eduardo");

rede.adicionarAresta("Ana", "Bob");
rede.adicionarAresta("Ana", "Carol");
rede.adicionarAresta("Bob", "Diana");
rede.adicionarAresta("Carol", "Eduardo");

// BFS a partir de Ana:
// Ana → Bob, Carol → Diana, Eduardo
rede.bfs("Ana");`,
      challenge: "Implemente a busca em profundidade (DFS) usando uma pilha ao invés de fila. Dica: troque fila.shift() por pilha.pop()!",
      diogenesTip: "Grafos estão em todo lugar: redes sociais, GPS, internet. Se você entende grafos, entende como o mundo digital se conecta! 🌐",
      quiz: [
        { question: "O que compõe um grafo?", options: ["Arrays e loops", "Vértices e arestas", "Nós e folhas", "Pilhas e filas"], correctIndex: 1, explanation: "Um grafo é formado por vértices (nós/objetos) e arestas (conexões entre eles)." },
        { question: "O Instagram (seguir alguém) é um exemplo de grafo:", options: ["Não-direcionado", "Direcionado", "Ponderado", "Desconectado"], correctIndex: 1, explanation: "No Instagram, A pode seguir B sem B seguir A — é uma conexão com direção!" },
        { question: "BFS (Busca em Largura) usa qual estrutura?", options: ["Pilha", "Árvore", "Fila", "Array simples"], correctIndex: 2, explanation: "A BFS usa uma fila para visitar todos os vizinhos de um nível antes de ir mais fundo." },
      ],
    },
  },
  engenharia: {
    solid: {
      title: "Princípios SOLID",
      content: `### 🎯 O que você vai aprender\nOs 5 princípios SOLID que tornam seu código mais limpo, organizado e fácil de manter. São as regras de ouro do desenvolvimento profissional!\n\n### 📋 Pré-requisitos\n- Conceito de classes e objetos\n- Noção de funções e responsabilidades\n- Vontade de escrever código melhor 😄\n\n### 🏗️ Por que SOLID é importante?\nImagine uma casa onde a cozinha, banheiro e quarto são todos no mesmo cômodo, com os fios passando por todo lado. Funciona? Até funciona... mas qualquer mudança vira um pesadelo!\n\nSOLID te ensina a construir "casas" (códigos) bem organizadas.\n\n### 📝 Os 5 Princípios\n\n**S — Single Responsibility (Responsabilidade Única)**\nCada classe deve fazer UMA coisa só, e fazer bem.\n- ❌ Classe "Usuário" que salva no banco, envia email E gera relatório\n- ✅ Uma classe para salvar, outra para email, outra para relatório\n\n**O — Open/Closed (Aberto/Fechado)**\nCódigo deve ser aberto para extensão, fechado para modificação.\n- ❌ Mudar código existente toda vez que surge algo novo\n- ✅ Criar novas classes que estendem o comportamento\n\n**L — Liskov Substitution (Substituição de Liskov)**\nClasses filhas devem poder substituir as classes pais sem quebrar nada.\n\n**I — Interface Segregation (Segregação de Interfaces)**\nMuitas interfaces específicas são melhores que uma interface gigante.\n- ❌ Interface "Animal" com voar(), nadar(), correr() — pinguim não voa!\n- ✅ Interfaces separadas: "Voador", "Nadador", "Corredor"\n\n**D — Dependency Inversion (Inversão de Dependência)**\nDependa de abstrações (contratos), não de implementações concretas.\n- ❌ Código amarrado ao MySQL (se trocar de banco, muda tudo)\n- ✅ Código depende de uma interface "BancoDeDados" (troca fácil!)`,
      codeExample: `// ========================================
// PRINCÍPIO S — Responsabilidade Única
// ========================================

// ❌ ERRADO: Uma classe fazendo TUDO
class UsuarioErrado {
  salvarNoBanco() { /* salva no banco */ }
  enviarEmailBoasVindas() { /* envia email */ }
  gerarRelatorioAtividade() { /* gera relatório */ }
  validarSenha() { /* valida senha */ }
  // Essa classe tem 4 responsabilidades diferentes!
}

// ✅ CORRETO: Cada classe com UMA responsabilidade
class UsuarioRepository {
  salvar(usuario) { 
    console.log("💾 Salvando usuário no banco...");
  }
}

class EmailService {
  enviarBoasVindas(email) {
    console.log(\`📧 Enviando boas-vindas para \${email}\`);
  }
}

class RelatorioService {
  gerarAtividade(usuario) {
    console.log("📊 Gerando relatório...");
  }
}

class SenhaService {
  validar(senha) {
    // Cada classe é simples e fácil de testar!
    return senha.length >= 8;
  }
}

// ========================================
// PRINCÍPIO D — Inversão de Dependência
// ========================================

// ❌ ERRADO: Dependendo de implementação específica
// class PedidoService {
//   salvar(pedido) {
//     const mysql = new MySQL(); // Amarrado ao MySQL!
//     mysql.insert(pedido);
//   }
// }

// ✅ CORRETO: Dependendo de abstração
class PedidoService {
  constructor(bancoDeDados) {
    // Recebe qualquer banco que tenha o método 'inserir'
    this.db = bancoDeDados;
  }
  
  salvar(pedido) {
    this.db.inserir(pedido); // Funciona com MySQL, Postgres, MongoDB...
  }
}

// Pode trocar o banco sem mudar PedidoService!
// const servico = new PedidoService(new MySQL());
// const servico = new PedidoService(new MongoDB());`,
      challenge: "Refatore uma classe 'Pedido' que calcula total, aplica desconto, salva no banco e envia notificação. Separe em classes com uma responsabilidade cada.",
      diogenesTip: "SOLID não é só teoria bonita — é a diferença entre código que dura anos e código que vira uma bola de neve de problemas em meses! Invista tempo agora, economize dor de cabeça depois!",
      quiz: [
        { question: "O que significa o 'S' em SOLID?", options: ["Simple Responsibility", "Single Responsibility", "Software Reliability", "System Requirements"], correctIndex: 1, explanation: "S = Single Responsibility — cada classe deve ter apenas UMA responsabilidade." },
        { question: "O princípio Open/Closed diz que código deve ser:", options: ["Aberto para modificação", "Aberto para extensão, fechado para modificação", "Sempre aberto", "Sempre fechado"], correctIndex: 1, explanation: "Aberto para extensão (adicionar funcionalidade nova) mas fechado para modificação (não mudar o que já funciona)." },
        { question: "Por que depender de abstrações é melhor?", options: ["É mais rápido", "Permite trocar implementações sem quebrar o código", "Usa menos memória", "É mais bonito"], correctIndex: 1, explanation: "Se você depende de uma abstração, pode trocar MySQL por MongoDB sem mudar seu código!" },
      ],
    },
    padroes: {
      title: "Padrões de Projeto",
      content: `### 🎯 O que você vai aprender\nO que são padrões de projeto (design patterns) e como usar os mais importantes. São como "receitas" que desenvolvedores experientes já testaram!\n\n### 📋 Pré-requisitos\n- Conceito de classes e objetos\n- Princípios SOLID (aula anterior)\n- Entender herança e composição\n\n### 🧩 O que são Padrões de Projeto?\nSão soluções testadas e aprovadas para problemas que aparecem sempre no desenvolvimento. Em vez de reinventar a roda, você usa uma solução que já funciona!\n\n**Analogia:** É como receitas de culinária. Você não inventa uma nova forma de fazer bolo toda vez — segue uma receita que já deu certo!\n\n### 📂 As 3 Categorias\n\n**1. Criacionais** — Como criar objetos\n- **Factory**: "Fábrica" de objetos — em vez de criar direto, pede para a fábrica\n- **Singleton**: Garante que só existe UMA instância (ex: conexão com banco)\n- **Builder**: Constrói objetos complexos passo a passo\n\n**2. Estruturais** — Como organizar objetos\n- **Adapter**: "Adaptador de tomada" — faz coisas incompatíveis funcionarem juntas\n- **Decorator**: Adiciona funcionalidades sem mudar o original\n- **Facade**: "Fachada" — interface simples para algo complexo\n\n**3. Comportamentais** — Como objetos se comunicam\n- **Observer**: "Assinatura de newsletter" — quando algo muda, todos os inscritos são notificados\n- **Strategy**: "Troca de estratégia" — muda o comportamento sem mudar a estrutura\n- **Command**: "Controle remoto" — encapsula ações como objetos`,
      codeExample: `// ========================================
// PADRÃO OBSERVER — "Newsletter/Notificação"
// ========================================
// Problema: Quando algo acontece, vários lugares precisam saber
// Exemplo: Nova venda → notificar estoque, financeiro, email

class SistemaNotificacao {
  constructor() {
    // Lista de "assinantes" por tipo de evento
    this.ouvintes = {};
  }

  // "Assinar" um tipo de evento
  inscrever(evento, callback) {
    if (!this.ouvintes[evento]) {
      this.ouvintes[evento] = [];
    }
    this.ouvintes[evento].push(callback);
    console.log(\`👂 Novo ouvinte inscrito em: \${evento}\`);
  }

  // "Publicar" um evento — todos os inscritos são notificados
  notificar(evento, dados) {
    if (this.ouvintes[evento]) {
      console.log(\`📢 Evento "\${evento}" disparado!\`);
      this.ouvintes[evento].forEach(cb => cb(dados));
    }
  }
}

// Uso prático: sistema de e-commerce
const sistema = new SistemaNotificacao();

// Diferentes partes se inscrevem no evento "novaVenda"
sistema.inscrever('novaVenda', (venda) => {
  console.log(\`📦 Estoque: Reduzir \${venda.produto} em 1 unidade\`);
});

sistema.inscrever('novaVenda', (venda) => {
  console.log(\`💰 Financeiro: Registrar R$\${venda.valor}\`);
});

sistema.inscrever('novaVenda', (venda) => {
  console.log(\`📧 Email: Enviar confirmação para \${venda.cliente}\`);
});

// Quando uma venda acontece, todos são notificados!
sistema.notificar('novaVenda', {
  produto: 'Notebook',
  valor: 3500,
  cliente: 'joao@email.com'
});`,
      challenge: "Implemente o padrão Strategy para um sistema de frete com diferentes estratégias (Sedex, PAC, Expresso). Cada estratégia deve calcular o preço de forma diferente.",
      diogenesTip: "Padrões de projeto são como peças de LEGO: você aprende cada peça e depois constrói o que quiser! Não decore, entenda o PROBLEMA que cada um resolve.",
      quiz: [
        { question: "O que são padrões de projeto?", options: ["Linguagens de programação", "Soluções reutilizáveis para problemas comuns", "Tipos de banco de dados", "Ferramentas de teste"], correctIndex: 1, explanation: "São soluções testadas e aprovadas para problemas recorrentes no desenvolvimento." },
        { question: "O Singleton garante que:", options: ["Muitas instâncias existam", "Apenas UMA instância de uma classe exista", "Nenhuma instância exista", "As classes sejam deletadas"], correctIndex: 1, explanation: "O Singleton restringe a criação a uma única instância — útil para conexões de banco, por exemplo." },
        { question: "O padrão Observer funciona como:", options: ["Uma fábrica", "Uma newsletter — quando algo muda, inscritos são notificados", "Um adaptador de tomada", "Um controle remoto"], correctIndex: 1, explanation: "Observer = inscritos são notificados automaticamente quando um evento acontece!" },
      ],
    },
    testes: {
      title: "Testes de Software",
      content: `### 🎯 O que você vai aprender\nPor que testar código é essencial e como escrever seus primeiros testes. Testar não é perda de tempo — é economia de tempo!\n\n### 📋 Pré-requisitos\n- Saber criar funções\n- Conceito de entrada e saída\n- Vontade de escrever código confiável\n\n### ❓ Por que testar?\nImagine que você faz um bolo sem provar a massa. Pode ficar bom... ou pode ser um desastre que você só descobre na hora de servir!\n\n**Testes são como provar a massa:** você verifica se está correto ANTES de entregar.\n\n**Sem testes:**\n- Medo de mudar código (e se quebrar algo?)\n- Bugs descobertos pelo cliente 😱\n- Horas debugando problemas\n\n**Com testes:**\n- Confiança para refatorar\n- Bugs encontrados cedo\n- Documentação viva do comportamento\n\n### 📊 Tipos de Testes (do menor para o maior)\n\n**1. Testes Unitários** — Testam UMA função isolada\n- Rápidos, simples, são a maioria dos testes\n- Ex: "a função somar(2,3) retorna 5?"\n\n**2. Testes de Integração** — Testam partes trabalhando juntas\n- Ex: "o cadastro salva no banco E envia email?"\n\n**3. Testes E2E (End-to-End)** — Testam tudo junto\n- Simulam o usuário real usando o sistema\n- Ex: "abrir o site, fazer login, comprar produto, ver confirmação"\n\n### ✅ Princípio AAA\nTodo teste segue 3 passos:\n1. **Arrange** (Preparar): Monte o cenário\n2. **Act** (Agir): Execute a ação\n3. **Assert** (Verificar): Confira o resultado`,
      codeExample: `// ========================================
// ESCREVENDO TESTES — passo a passo
// ========================================

// Primeiro, a função que vamos testar:
function somar(a, b) {
  return a + b;
}

function ehParar(numero) {
  return numero % 2 === 0;
}

function maiorDeIdade(idade) {
  if (idade < 0) throw new Error("Idade inválida");
  return idade >= 18;
}

// Agora, os testes seguindo o padrão AAA:

// ========================================
// TESTES DA FUNÇÃO somar()
// ========================================

// Teste 1: caso normal
// ARRANGE (Preparar)
let a = 2, b = 3;
// ACT (Agir)
let resultado = somar(a, b);
// ASSERT (Verificar)
console.log("somar(2,3) = 5?", resultado === 5 ? "✅ PASSOU" : "❌ FALHOU");

// Teste 2: números negativos
resultado = somar(-1, -2);
console.log("somar(-1,-2) = -3?", resultado === -3 ? "✅ PASSOU" : "❌ FALHOU");

// Teste 3: zeros
resultado = somar(0, 0);
console.log("somar(0,0) = 0?", resultado === 0 ? "✅ PASSOU" : "❌ FALHOU");

// ========================================
// TESTES DA FUNÇÃO ehPar()
// ========================================
console.log("\\n--- Testes ehPar ---");
console.log("4 é par?", ehParar(4) === true ? "✅ PASSOU" : "❌ FALHOU");
console.log("7 é ímpar?", ehParar(7) === false ? "✅ PASSOU" : "❌ FALHOU");
console.log("0 é par?", ehParar(0) === true ? "✅ PASSOU" : "❌ FALHOU");

// ========================================
// DICAS IMPORTANTES
// ========================================
// 💡 Teste casos normais (o "caminho feliz")
// 💡 Teste casos extremos (0, negativo, vazio)
// 💡 Teste erros (entradas inválidas)
// 💡 Cada teste deve verificar UMA coisa`,
      challenge: "Escreva testes para uma função 'validarSenha(senha)' que retorna true se a senha tem pelo menos 8 caracteres, contém número e letra maiúscula. Teste o caminho feliz e os casos de erro!",
      diogenesTip: "Código sem teste é como avião sem checklist: pode até voar, mas você quer arriscar? Teste cedo, teste sempre, e durma tranquilo! 🛫😴",
      quiz: [
        { question: "Por que testar código é importante?", options: ["Para deixar mais lento", "Para encontrar bugs cedo e ter confiança para mudar código", "Porque o chefe manda", "Para usar mais memória"], correctIndex: 1, explanation: "Testes encontram bugs antes do cliente e dão confiança para refatorar sem medo!" },
        { question: "O que significa 'Arrange' no padrão AAA?", options: ["Analisar o código", "Preparar os dados e cenário do teste", "Executar a ação", "Verificar o resultado"], correctIndex: 1, explanation: "Arrange = Preparar — montar o cenário com os dados necessários para o teste." },
        { question: "Qual tipo de teste é mais rápido e simples?", options: ["E2E", "Integração", "Unitário", "Manual"], correctIndex: 2, explanation: "Testes unitários são os mais rápidos e simples — testam uma função isolada!" },
      ],
    },
    arquitetura: {
      title: "Arquitetura de Software",
      content: `### 🎯 O que você vai aprender\nO que é arquitetura de software e os principais padrões usados na indústria. É como a planta de uma casa — antes de construir, você planeja!\n\n### 📋 Pré-requisitos\n- Princípios SOLID\n- Conceito de módulos e responsabilidades\n- Noção de cliente-servidor (navegador e servidor)\n\n### 🏛️ O que é Arquitetura de Software?\nÉ a estrutura de alto nível do seu sistema. Define:\n- Como as partes se organizam\n- Como elas se comunicam\n- Quais regras de dependência existem\n\n**Analogia:** É como a planta de um prédio. Você define onde fica a cozinha, o banheiro, a sala — antes de construir!\n\n### 📐 Padrões mais comuns\n\n**1. MVC — Model-View-Controller**\nSepara o sistema em 3 partes:\n- **Model**: Os dados e regras de negócio (ex: Produto tem nome e preço)\n- **View**: O que o usuário vê (ex: tela com lista de produtos)\n- **Controller**: O "meio de campo" que conecta os dois\n\n**2. Monolítico**\nTudo em um único projeto/sistema. Simples para começar!\n- ✅ Fácil de desenvolver e testar\n- ❌ Difícil de escalar quando cresce muito\n\n**3. Microserviços**\nSistema dividido em serviços pequenos e independentes.\n- ✅ Cada serviço pode escalar separadamente\n- ❌ Mais complexo de gerenciar\n\n**4. Clean Architecture**\nOrganiza em camadas com regras claras de dependência:\n- Camada interna: Regras de negócio (nunca dependem de nada externo)\n- Camada externa: Banco de dados, API, interface\n- Regra: Dependências sempre apontam para DENTRO\n\n### 💡 Quando usar cada uma?\n- **Projeto pequeno/MVP**: Monolítico + MVC\n- **Projeto em crescimento**: Clean Architecture\n- **Projeto grande com equipe grande**: Microserviços`,
      codeExample: `// ========================================
// CLEAN ARCHITECTURE — Exemplo prático
// ========================================
// Regra: as camadas internas NÃO conhecem as externas

// ——— CAMADA 1: ENTIDADE (regras de negócio puras) ———
// Não depende de nada! Nem de banco, nem de framework
class Produto {
  constructor(nome, preco) {
    if (!nome) throw new Error("Nome é obrigatório");
    if (preco < 0) throw new Error("Preço não pode ser negativo");
    this.nome = nome;
    this.preco = preco;
  }

  aplicarDesconto(percentual) {
    // Regra de negócio: desconto máximo de 50%
    if (percentual > 50) throw new Error("Desconto máximo: 50%");
    this.preco = this.preco * (1 - percentual / 100);
  }
}

// ——— CAMADA 2: CASO DE USO (lógica da aplicação) ———
// Conhece as entidades, mas NÃO conhece o banco
class CriarProdutoUseCase {
  constructor(produtoRepository) {
    // Recebe o repositório por injeção de dependência
    this.repo = produtoRepository;
  }

  async executar(nome, preco) {
    // 1. Criar a entidade (valida automaticamente)
    const produto = new Produto(nome, preco);
    
    // 2. Salvar (não importa ONDE — banco, arquivo, API...)
    const salvo = await this.repo.salvar(produto);
    
    console.log(\`✅ Produto "\${nome}" criado com sucesso!\`);
    return salvo;
  }
}

// ——— CAMADA 3: ADAPTADOR (interface com mundo externo) ———
// Conecta os casos de uso com o framework/banco
class ProdutoController {
  constructor(criarProduto) {
    this.criarProduto = criarProduto;
  }

  async criar(requisicao) {
    try {
      const { nome, preco } = requisicao.body;
      const produto = await this.criarProduto.executar(nome, preco);
      return { status: 201, dados: produto };
    } catch (erro) {
      return { status: 400, erro: erro.message };
    }
  }
}

// A beleza: para trocar o banco de dados, só muda o repositório!
// O caso de uso e a entidade continuam IGUAIS.`,
      challenge: "Projete a arquitetura de um sistema de pedidos de comida (tipo iFood) usando Clean Architecture. Defina: Entidades, Casos de Uso e Adaptadores.",
      diogenesTip: "Boa arquitetura é como um bom alicerce: o usuário não vê, mas é o que impede o prédio de cair! Pense antes de codar, e seu futuro eu vai agradecer. 🏗️",
      quiz: [
        { question: "O que é MVC?", options: ["Model-View-Controller", "Main-Virtual-Component", "Module-Version-Control", "Managed-View-Class"], correctIndex: 0, explanation: "MVC = Model (dados), View (interface), Controller (lógica de conexão)." },
        { question: "Na Clean Architecture, as dependências apontam para:", options: ["As camadas externas", "As camadas internas (regras de negócio)", "O banco de dados", "A interface do usuário"], correctIndex: 1, explanation: "Regra de ouro: dependências SEMPRE apontam para dentro. Regras de negócio nunca dependem de banco ou framework!" },
        { question: "Para um projeto pequeno/MVP, qual arquitetura é mais indicada?", options: ["Microserviços", "Clean Architecture", "Monolítico + MVC", "Serverless"], correctIndex: 2, explanation: "Para projetos pequenos, monolítico + MVC é o mais simples e produtivo para começar!" },
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

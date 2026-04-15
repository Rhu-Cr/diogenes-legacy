import type { LessonData } from "./lessonTypes";

export const algoritmosLessons: Record<string, LessonData> = {
  intro: {
    title: "Introdução a Algoritmos",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nNesta aula, você vai entender o que é um algoritmo e por que ele é a base de toda a programação. Não se preocupe se nunca programou antes — vamos começar do zero!\n\n### 📖 O que é um Algoritmo?\nUm **algoritmo** é simplesmente uma sequência de passos para resolver um problema. Você já usa algoritmos no dia a dia sem perceber!\n\n**Exemplo do cotidiano — Fazer um café:**\n1. Pegar a xícara\n2. Colocar água na chaleira\n3. Esquentar a água\n4. Colocar o pó de café no filtro\n5. Despejar a água quente\n6. Servir o café na xícara\n\nIsso é um algoritmo! Cada passo é claro, tem uma ordem, e no final você obtém o resultado.\n\n### ✅ Características de um bom algoritmo\n- **Finitude**: Deve terminar em algum momento (não pode rodar para sempre)\n- **Clareza**: Cada passo deve ser simples e sem dúvidas\n- **Entrada**: Os dados que o algoritmo recebe (ex: uma lista de números)\n- **Saída**: O resultado que ele produz (ex: o maior número)\n- **Efetividade**: Cada passo deve ser possível de executar\n\n### 🧠 Por que algoritmos são importantes?\nTodo programa de computador é, no fundo, um conjunto de algoritmos. Quando você pesquisa no Google, assiste um vídeo no YouTube ou pede comida por app — algoritmos estão trabalhando por trás!\n\n### 📝 Passo a passo para criar um algoritmo\n1. **Entenda o problema**: O que preciso resolver?\n2. **Identifique as entradas**: Quais dados eu tenho?\n3. **Defina a saída**: O que quero como resultado?\n4. **Escreva os passos**: Em português simples, descreva cada ação\n5. **Teste mentalmente**: Simule com exemplos para ver se funciona\n6. **Traduza para código**: Agora sim, programe!`,
    codeExample: `// PASSO A PASSO: Encontrar o maior número de uma lista
// 
// Problema: Dada uma lista de números, qual é o maior?
// Entrada: Uma lista como [3, 7, 2, 9, 1]
// Saída esperada: 9

function encontrarMaior(numeros) {
  let maior = numeros[0];
  
  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
      maior = numeros[i];
    }
  }
  
  return maior;
}

// Teste com exemplos:
console.log(encontrarMaior([3, 7, 2, 9, 1])); // 9
console.log(encontrarMaior([10, 5, 20, 3]));   // 20
console.log(encontrarMaior([1]));               // 1`,
    challenge: "Modifique o algoritmo acima para encontrar tanto o maior quanto o menor número do array. Dica: crie duas variáveis (maior e menor) e compare cada número com ambas.",
    diogenesTip: "Antes de programar, escreva o passo a passo em português! Se você consegue explicar para uma criança de 10 anos, você entendeu. Se não consegue, simplifique mais!",
    quiz: [
      { question: "O que é um algoritmo?", options: ["Um tipo de linguagem de programação", "Uma sequência finita de instruções para resolver um problema", "Um software de computador", "Um banco de dados"], correctIndex: 1, explanation: "Um algoritmo é uma sequência finita de instruções bem definidas para resolver um problema — como uma receita!" },
      { question: "Qual NÃO é uma característica de um bom algoritmo?", options: ["Finitude (deve terminar)", "Ambiguidade (passos confusos)", "Efetividade (passos executáveis)", "Saída (produz resultado)"], correctIndex: 1, explanation: "Um bom algoritmo deve ter clareza — sem ambiguidade! Cada passo precisa ser claro." },
      { question: "Qual é a saída de encontrarMaior([3, 7, 2, 9, 1])?", options: ["3", "7", "9", "1"], correctIndex: 2, explanation: "O algoritmo percorre o array comparando cada número e retorna o maior valor, que é 9." },
    ],
  },
  variaveis: {
    title: "Variáveis e Tipos de Dados",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nO que são variáveis, como guardar informações na memória do computador e quais tipos de dados existem. É como aprender a usar caixas organizadoras!\n\n### 📋 Pré-requisitos\nNenhum! Esta é uma das primeiras aulas — vamos começar do zero.\n\n### 📦 O que é uma Variável?\nUma **variável** é como uma **caixa com etiqueta**. Você guarda um valor dentro e dá um nome para lembrar o que está ali.\n\n**Exemplo do dia a dia:**\n- Caixa etiquetada "nome" → guarda "Maria"\n- Caixa etiquetada "idade" → guarda 25\n- Caixa etiquetada "aprovado" → guarda true (sim)\n\n### 🏷️ Declarando variáveis em JavaScript\nExistem 3 formas:\n- **let** — Pode mudar o valor depois (a mais usada!)\n- **const** — NÃO pode mudar (valor fixo, constante)\n- **var** — Forma antiga, evite usar\n\n### 📊 Tipos de Dados\n1. **String** (texto): "Olá, mundo!" — sempre entre aspas\n2. **Number** (número): 42, 3.14 — inteiros e decimais\n3. **Boolean** (verdadeiro/falso): true ou false\n4. **Null** (nulo): Intencionalmente vazio\n5. **Undefined** (indefinido): Nunca recebeu valor\n6. **Array** (lista): [1, 2, 3] — uma caixa com vários compartimentos\n7. **Object** (objeto): { nome: "Ana", idade: 20 } — caixa com sub-etiquetas\n\n### ⚠️ Erros comuns de iniciantes\n- Esquecer de declarar a variável\n- Confundir = (atribuição) com === (comparação)\n- Usar const e tentar mudar o valor\n- Esquecer as aspas em strings`,
    codeExample: `// --- LET: valor que pode mudar ---
let nome = "Maria";
let idade = 25;
let aprovada = true;

console.log(nome);     // "Maria"
nome = "Ana";
console.log(nome);     // "Ana" — mudou!

// --- CONST: valor fixo ---
const PI = 3.14159;
// PI = 3.15; ← ❌ ERRO! Const não pode mudar!

// --- TIPOS DE DADOS ---
let texto = "Olá, mundo!";       // String
let numero = 42;                  // Number
let ligado = false;               // Boolean
let vazio = null;                 // Null
let indefinido;                   // Undefined

// --- ARRAY ---
let frutas = ["maçã", "banana", "laranja"];
console.log(frutas[0]);   // "maçã"

// --- OBJETO ---
let aluno = {
  nome: "Carlos",
  idade: 20,
  curso: "Ciência da Computação"
};
console.log(aluno.nome);   // "Carlos"`,
    challenge: "Crie um objeto 'perfil' com seu nome, idade, linguagem favorita e se está estudando (boolean). Depois, mude a linguagem favorita e imprima o perfil completo.",
    diogenesTip: "Variáveis são a base de TUDO na programação. Se você entende caixas com etiquetas, já entende variáveis. É simples assim! 📦",
    quiz: [
      { question: "Qual a diferença entre let e const?", options: ["Não há diferença", "let pode mudar o valor, const não pode", "const é mais rápido", "let é antigo, const é novo"], correctIndex: 1, explanation: "let permite reatribuir valores, const cria valores constantes que não podem mudar." },
      { question: "Qual o tipo de dado de \"Olá, mundo!\"?", options: ["Number", "Boolean", "String", "Object"], correctIndex: 2, explanation: "Textos entre aspas são do tipo String." },
      { question: "Em um array ['a', 'b', 'c'], qual índice tem o 'a'?", options: ["1", "0", "3", "-1"], correctIndex: 1, explanation: "Arrays começam no índice 0!" },
    ],
  },
  condicionais: {
    title: "Condicionais (If/Else)",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nComo fazer o computador tomar decisões! Com condicionais, seu programa pode escolher caminhos diferentes dependendo da situação.\n\n### 📋 Pré-requisitos\n- Saber o que são variáveis (aula anterior)\n- Entender tipos boolean (true/false)\n\n### 🚦 O que são Condicionais?\nCondicionais são como **semáforos**: dependendo da cor (condição), você faz uma coisa diferente.\n\n**No dia a dia você já usa condicionais:**\n- SE está chovendo → levo guarda-chuva\n- SE tenho dinheiro → compro lanche | SENÃO → levo de casa\n\n### 📝 Estrutura do IF/ELSE\n- **if** (se): Verifica uma condição\n- **else if** (senão se): Verifica outra condição\n- **else** (senão): Quando nenhuma condição anterior foi verdadeira\n\n### ⚖️ Operadores de Comparação\n- **===** → É igual a?\n- **!==** → É diferente de?\n- **>** → É maior que?\n- **<** → É menor que?\n\n### 🔗 Operadores Lógicos\n- **&&** (E): As DUAS condições precisam ser verdadeiras\n- **||** (OU): PELO MENOS UMA precisa ser verdadeira\n- **!** (NÃO): Inverte o valor`,
    codeExample: `// --- IF simples ---
let temperatura = 35;
if (temperatura > 30) {
  console.log("🥵 Está muito quente!");
}

// --- IF/ELSE ---
let idade = 17;
if (idade >= 18) {
  console.log("✅ Pode dirigir!");
} else {
  console.log("❌ Ainda não pode dirigir.");
}

// --- IF/ELSE IF/ELSE ---
let nota = 7.5;
if (nota >= 9) {
  console.log("🏆 Conceito A");
} else if (nota >= 7) {
  console.log("👍 Conceito B");
} else if (nota >= 5) {
  console.log("😐 Conceito C");
} else {
  console.log("😟 Conceito D");
}

// --- SWITCH/CASE ---
let dia = "segunda";
switch (dia) {
  case "segunda": case "terça": case "quarta":
    console.log("📚 Dia de estudar!");
    break;
  case "sábado": case "domingo":
    console.log("🎮 Dia de descansar!");
    break;
}`,
    challenge: "Crie um programa que recebe a idade e diz se pode votar (>= 16), se o voto é obrigatório (18-69), e se pode se candidatar a presidente (>= 35).",
    diogenesTip: "Condicionais são o cérebro do seu programa — sem elas, o código faria sempre a mesma coisa! Use === (3 sinais) para comparar, não = (1 sinal)!",
    quiz: [
      { question: "O que o operador && (E) exige?", options: ["Pelo menos uma condição verdadeira", "As duas condições precisam ser verdadeiras", "Nenhuma condição verdadeira", "Apenas a primeira verdadeira"], correctIndex: 1, explanation: "O operador && só retorna true se AMBAS as condições forem verdadeiras." },
      { question: "Qual a diferença entre = e ===?", options: ["Não há diferença", "= atribui valor, === compara valores", "=== atribui valor, = compara", "= é mais rápido"], correctIndex: 1, explanation: "= é atribuição, === é comparação." },
      { question: "Quando usar switch ao invés de if/else?", options: ["Sempre", "Quando tem muitas opções para comparar com um mesmo valor", "Nunca", "Apenas com números"], correctIndex: 1, explanation: "Switch é mais organizado quando você compara o MESMO valor com várias opções possíveis." },
    ],
  },
  loops: {
    title: "Loops (Repetição)",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nComo fazer o computador repetir tarefas automaticamente! Loops evitam que você escreva o mesmo código 100 vezes.\n\n### 📋 Pré-requisitos\n- Saber o que são variáveis\n- Entender condicionais (if/else)\n\n### 🔄 O que são Loops?\nLoops são como uma **máquina de lavar**: ela repete o ciclo até a roupa ficar limpa.\n\n### 📝 Tipos de Loop\n**1. FOR** — Quando você sabe quantas vezes repetir\n**2. WHILE** — Enquanto uma condição for verdadeira\n**3. DO...WHILE** — Executa pelo menos UMA vez\n**4. FOR...OF** — Percorre cada item de uma lista\n\n### ⚠️ Cuidado: Loop Infinito!\nSe a condição NUNCA se torna falsa, o loop roda para sempre e trava o programa!`,
    codeExample: `// --- FOR ---
for (let i = 1; i <= 5; i++) {
  console.log(\`Número: \${i}\`);
}

// --- FOR...OF ---
let frutas = ["🍎 Maçã", "🍌 Banana", "🍊 Laranja"];
for (let fruta of frutas) {
  console.log(\`Fruta: \${fruta}\`);
}

// --- WHILE ---
let valor = 1;
while (valor <= 100) {
  valor = valor * 2;
}
console.log(\`Valor final: \${valor}\`);

// --- Exemplo prático: somar notas ---
let notas = [8, 7, 9, 6, 10];
let soma = 0;
for (let nota of notas) {
  soma += nota;
}
let media = soma / notas.length;
console.log(\`Média: \${media}\`);
console.log(media >= 7 ? "✅ Aprovado!" : "❌ Reprovado");`,
    challenge: "Use um loop para encontrar todos os números pares de 1 a 50 e calcule a soma deles. Dica: número % 2 === 0.",
    diogenesTip: "Loops são o superpoder da programação! Com um loop, você faz em 3 linhas o que levaria 1000. Trabalhe de forma inteligente! 🧠",
    quiz: [
      { question: "Quando usar FOR ao invés de WHILE?", options: ["Quando não sabe quantas vezes repetir", "Quando sabe exatamente quantas vezes repetir", "Nunca", "Apenas com strings"], correctIndex: 1, explanation: "Use FOR quando sabe o número de repetições." },
      { question: "O que acontece em um loop infinito?", options: ["O programa fica mais rápido", "O programa trava porque a condição nunca se torna falsa", "Nada acontece", "O programa para sozinho"], correctIndex: 1, explanation: "Se a condição nunca for falsa, ele repete para sempre e trava!" },
      { question: "Qual loop é melhor para percorrer arrays?", options: ["while", "do...while", "for...of", "switch"], correctIndex: 2, explanation: "for...of é a forma mais simples e direta de percorrer cada item de um array." },
    ],
  },
  funcoes: {
    title: "Funções",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nComo criar blocos de código reutilizáveis chamados funções. Funções são como ferramentas: você cria uma vez e usa quantas vezes quiser!\n\n### 📋 Pré-requisitos\n- Variáveis e tipos de dados\n- Condicionais e loops\n\n### 🔧 O que é uma Função?\nUma **função** é como uma **máquina automática**: você coloca ingredientes (parâmetros), ela processa e devolve um resultado (retorno).\n\n**Analogia do cotidiano — Máquina de suco:**\n- Entrada: frutas\n- Processamento: bater, filtrar\n- Saída: suco pronto!\n\n### 📝 Criando Funções\nExistem 3 formas em JavaScript:\n- **function** (declaração clássica)\n- **const nome = function()** (expressão)\n- **const nome = () => {}** (arrow function — forma moderna)\n\n### 🎯 Por que usar funções?\n- **Reutilização**: Escreve uma vez, usa muitas vezes\n- **Organização**: Divide o código em blocos lógicos\n- **Manutenção**: Corrige em um lugar, funciona em todos\n- **Abstração**: Esconde a complexidade\n\n### 📦 Parâmetros e Retorno\n- **Parâmetros**: Os dados que a função RECEBE\n- **Retorno**: O resultado que a função DEVOLVE (com return)\n- Uma função sem return retorna undefined\n\n### 🧩 Escopo\nVariáveis criadas DENTRO da função só existem dentro dela. É como um quarto: o que está dentro, fica dentro.`,
    codeExample: `// ========================================
// FUNÇÕES — Criando blocos reutilizáveis
// ========================================

// --- Função clássica ---
function saudacao(nome) {
  return \`Olá, \${nome}! Bem-vindo(a)! 👋\`;
}
console.log(saudacao("Maria")); // "Olá, Maria! Bem-vindo(a)! 👋"
console.log(saudacao("João"));  // "Olá, João! Bem-vindo(a)! 👋"

// --- Arrow function (forma moderna) ---
const dobrar = (numero) => numero * 2;
console.log(dobrar(5));  // 10
console.log(dobrar(21)); // 42

// --- Função com vários parâmetros ---
function calcularMedia(notas) {
  let soma = 0;
  for (let nota of notas) {
    soma += nota;
  }
  return soma / notas.length;
}

const minhasNotas = [8, 7, 9, 6];
const media = calcularMedia(minhasNotas);
console.log(\`Média: \${media}\`); // Média: 7.5

// --- Parâmetro com valor padrão ---
function criarUsuario(nome, papel = "aluno") {
  return { nome, papel };
}
console.log(criarUsuario("Ana"));            // { nome: "Ana", papel: "aluno" }
console.log(criarUsuario("Carlos", "admin")); // { nome: "Carlos", papel: "admin" }

// --- Funções que chamam outras funções ---
function ehAprovado(notas) {
  const media = calcularMedia(notas);
  return media >= 7;
}
console.log(ehAprovado([8, 7, 9, 6])); // true
console.log(ehAprovado([4, 5, 3, 6])); // false`,
    challenge: "Crie uma função 'calcularIMC(peso, altura)' que retorna o IMC e uma mensagem (abaixo do peso, normal, sobrepeso, obeso). Use outras funções auxiliares para classificar!",
    diogenesTip: "Funções são como LEGO: pequenas peças que se encaixam para construir algo grande. Faça funções pequenas, com nomes claros, que fazem UMA coisa bem feita! 🧱",
    quiz: [
      { question: "O que uma função retorna se não tiver 'return'?", options: ["null", "0", "undefined", "false"], correctIndex: 2, explanation: "Funções sem return retornam undefined por padrão." },
      { question: "O que são parâmetros de uma função?", options: ["O nome da função", "Os dados que a função recebe para processar", "O resultado da função", "O tipo da função"], correctIndex: 1, explanation: "Parâmetros são os dados de entrada que a função precisa para trabalhar." },
      { question: "Qual a vantagem principal de usar funções?", options: ["O código fica mais longo", "Reutilização e organização do código", "O programa fica mais lento", "Não há vantagem"], correctIndex: 1, explanation: "Funções permitem reutilizar código, organizar a lógica e facilitar a manutenção!" },
    ],
  },
  busca: {
    title: "Algoritmos de Busca",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo encontrar um item específico dentro de uma lista de dados. Vamos ver duas formas: a simples e a inteligente!\n\n### 📋 Pré-requisitos\n- O que é um array\n- Loops de repetição\n- Conceito básico de algoritmo\n\n### 🔍 Busca Linear — A forma simples\nImagine que você perdeu suas chaves e precisa procurar em todas as gavetas, uma por uma. Isso é **busca linear**!\n\n**Velocidade:** O(n) — no pior caso, olha todos os elementos\n\n### 🚀 Busca Binária — A forma inteligente\nComo procurar uma palavra no dicionário — você abre no meio e vai direcionando!\n\n**Requisito:** A lista PRECISA estar ordenada!\n**Velocidade:** O(log n) — muito mais rápido!\n\n### 📊 Comparação\n- Lista com 1.000.000: Linear = até 1.000.000 comparações | Binária = até 20`,
    codeExample: `// BUSCA LINEAR
function buscaLinear(lista, alvo) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === alvo) return i;
  }
  return -1;
}
console.log(buscaLinear([4, 2, 7, 1, 9], 7)); // 2

// BUSCA BINÁRIA (lista DEVE estar ordenada!)
function buscaBinaria(lista, alvo) {
  let inicio = 0;
  let fim = lista.length - 1;
  
  while (inicio <= fim) {
    let meio = Math.floor((inicio + fim) / 2);
    if (lista[meio] === alvo) return meio;
    if (lista[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}
console.log(buscaBinaria([1, 3, 5, 7, 9], 7)); // 3`,
    challenge: "Implemente uma busca binária recursiva (a função chama ela mesma em vez de usar while).",
    diogenesTip: "A busca binária é como procurar uma palavra no dicionário: você vai direto ao meio! Mas lembre-se: só funciona se estiver em ordem!",
    quiz: [
      { question: "Qual a diferença principal entre busca linear e binária?", options: ["A linear é mais rápida", "A binária funciona em qualquer lista", "A binária exige lista ordenada mas é muito mais rápida", "Não há diferença"], correctIndex: 2, explanation: "A busca binária é muito mais rápida (O(log n) vs O(n)), mas exige lista ordenada." },
      { question: "Em uma lista com 1.000.000 de itens, quantas comparações a busca binária precisa?", options: ["1.000.000", "500.000", "Cerca de 20", "100"], correctIndex: 2, explanation: "log₂(1.000.000) ≈ 20. A busca binária corta pela metade a cada passo!" },
      { question: "O que significa retornar -1 em uma busca?", options: ["Encontrou no início", "Encontrou no final", "O elemento não foi encontrado", "Erro no programa"], correctIndex: 2, explanation: "Retornar -1 é convenção para indicar que o elemento não existe na lista." },
    ],
  },
  ordenacao: {
    title: "Algoritmos de Ordenação",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo organizar dados em ordem. Ordenar é uma das tarefas mais importantes na computação!\n\n### 📋 Pré-requisitos\n- Arrays, loops e condições\n- Troca de valores entre variáveis\n\n### 🫧 Bubble Sort — Ordenação por bolha\nOs maiores valores "sobem" para o final como bolhas na água.\n**Velocidade:** O(n²) — lento, mas ótimo para aprender!\n\n### ⚡ Quick Sort — Ordenação rápida\nEscolhe um pivô, separa menores e maiores, e repete.\n**Velocidade:** O(n log n) — MUITO mais rápido!`,
    codeExample: `// BUBBLE SORT
function bubbleSort(arr) {
  const lista = [...arr];
  for (let i = 0; i < lista.length - 1; i++) {
    for (let j = 0; j < lista.length - i - 1; j++) {
      if (lista[j] > lista[j + 1]) {
        [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
      }
    }
  }
  return lista;
}
console.log(bubbleSort([64, 34, 25, 12, 22]));
// [12, 22, 25, 34, 64]`,
    challenge: "Modifique o Bubble Sort para parar mais cedo se a lista já estiver ordenada. Dica: use uma variável 'trocou'.",
    diogenesTip: "Bubble Sort é como organizar cartas na mão: compara duas vizinhas, troca se preciso, e repete. Simples, mas lento!",
    quiz: [
      { question: "Por que o Bubble Sort se chama 'bolha'?", options: ["Porque é redondo", "Porque os maiores valores 'sobem' como bolhas", "Porque usa bolhas de memória", "Porque foi inventado em um banho"], correctIndex: 1, explanation: "Os maiores vão 'subindo' para o final como bolhas!" },
      { question: "Qual a velocidade do Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correctIndex: 2, explanation: "Dois loops aninhados resultam em O(n²)." },
      { question: "O que o Quick Sort faz de diferente?", options: ["Compara pares vizinhos", "Escolhe um pivô e divide a lista", "Percorre de trás para frente", "Ordena apenas pares"], correctIndex: 1, explanation: "Quick Sort escolhe um pivô e separa: menores à esquerda, maiores à direita." },
    ],
  },
  complexidade: {
    title: "Complexidade de Algoritmos",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo medir a eficiência de um algoritmo usando a notação Big O. É como comparar carros pela velocidade máxima!\n\n### 📋 Pré-requisitos\n- Algoritmos básicos (busca, ordenação)\n- Loops e funções\n\n### ⏱️ O que é Complexidade?\nÉ uma forma de responder: **"Quando os dados crescem, quanto mais lento o algoritmo fica?"**\n\n**Analogia:** Imagine que você precisa encontrar uma pessoa:\n- Em uma sala com 10 pessoas → rápido\n- Em um estádio com 80.000 → bem mais difícil!\n\n### 📊 Notação Big O — As "notas" de velocidade\n\n**O(1) — Constante** ⚡\nNão importa o tamanho, sempre leva o mesmo tempo.\n- Ex: Acessar array[5] — direto, sem percorrer!\n\n**O(log n) — Logarítmica** 🚀\nA cada passo, elimina METADE dos dados.\n- Ex: Busca binária — lista de 1 milhão em 20 passos!\n\n**O(n) — Linear** 🚗\nCresce proporcionalmente ao tamanho.\n- Ex: Busca linear — pode precisar olhar todos.\n\n**O(n log n) — Linearítmica** 🚐\nUm pouco mais que linear. Muito eficiente!\n- Ex: Quick Sort, Merge Sort\n\n**O(n²) — Quadrática** 🐌\nDobrar os dados = 4x mais lento.\n- Ex: Bubble Sort — dois loops aninhados.\n\n**O(2ⁿ) — Exponencial** 🐢\nCresce absurdamente rápido. Evitar!\n- Ex: Fibonacci recursivo sem cache.\n\n### 📈 Ranking (do melhor ao pior)\nO(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(2ⁿ)\n\n### 💡 Como determinar a complexidade?\n- Um loop simples = O(n)\n- Loop dentro de loop = O(n²)\n- Dividir pela metade a cada passo = O(log n)\n- Sem loop (acesso direto) = O(1)`,
    codeExample: `// ========================================
// EXEMPLOS DE CADA COMPLEXIDADE
// ========================================

// O(1) — Constante: sempre rápido
function acessarPrimeiro(arr) {
  return arr[0]; // Não importa se tem 10 ou 1 milhão!
}

// O(n) — Linear: percorre tudo
function somarTodos(arr) {
  let soma = 0;
  for (let num of arr) {   // Um loop = O(n)
    soma += num;
  }
  return soma;
}

// O(n²) — Quadrática: loop dentro de loop
function todosOsPares(arr) {
  const pares = [];
  for (let i = 0; i < arr.length; i++) {       // Loop 1
    for (let j = i + 1; j < arr.length; j++) {  // Loop 2
      pares.push([arr[i], arr[j]]);
    }
  }
  return pares;
}

// O(log n) — Logarítmica: divide pela metade
function buscaBinaria(arr, alvo) {
  let inicio = 0, fim = arr.length - 1;
  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    if (arr[meio] === alvo) return meio;
    if (arr[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}

// Comparação prática com n = 1.000.000:
// O(1)      → 1 operação
// O(log n)  → ~20 operações
// O(n)      → 1.000.000 operações
// O(n²)     → 1.000.000.000.000 operações 😱
console.log("Entendeu por que O(n²) é problemático?");`,
    challenge: "Analise a complexidade das seguintes funções e classifique cada uma: encontrarMaior(), bubbleSort() e buscaBinaria(). Justifique cada resposta!",
    diogenesTip: "Big O é o 'radar de velocidade' dos algoritmos. Não precisa decorar fórmulas — entenda a ideia: quantas vezes o trabalho multiplica quando os dados dobram? 🏎️",
    quiz: [
      { question: "O que significa O(n)?", options: ["O algoritmo é instantâneo", "O tempo cresce proporcionalmente ao tamanho dos dados", "O algoritmo nunca termina", "O tempo diminui com mais dados"], correctIndex: 1, explanation: "O(n) significa que se os dados dobram, o tempo também dobra — crescimento linear." },
      { question: "Qual é a complexidade de um loop dentro de outro loop?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correctIndex: 2, explanation: "Dois loops aninhados = O(n²). Cada elemento do primeiro loop percorre todos do segundo." },
      { question: "Qual complexidade é a mais eficiente?", options: ["O(n²)", "O(n)", "O(log n)", "O(2ⁿ)"], correctIndex: 2, explanation: "O(log n) é muito eficiente — a cada passo elimina metade dos dados!" },
    ],
  },
  recursao: {
    title: "Recursão",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nO conceito de recursão — quando uma função chama a si mesma.\n\n### 📋 Pré-requisitos\n- Criar funções\n- Retorno de funções\n- Condições (if/else)\n\n### 🪆 O que é Recursão?\nComo bonecas russas: abre uma e dentro tem outra menor, até a menorzinha.\n\n### 🧩 Dois ingredientes obrigatórios\n1. **Caso base**: Quando parar\n2. **Caso recursivo**: Chamada com entrada MENOR\n\n⚠️ Sem caso base = Stack Overflow!`,
    codeExample: `// FATORIAL recursivo
function fatorial(n) {
  if (n <= 1) return 1;       // Caso base
  return n * fatorial(n - 1); // Caso recursivo
}
// fatorial(4) → 4 * 3 * 2 * 1 = 24
console.log(fatorial(5)); // 120

// FIBONACCI recursivo
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(7));  // 13
console.log(fibonacci(10)); // 55`,
    challenge: "Implemente Fibonacci com memoização (cache) para evitar recalcular valores. Use um objeto para guardar resultados.",
    diogenesTip: "Recursão é como olhar entre dois espelhos paralelos. Mas no código, precisamos do caso base para parar — senão... Stack Overflow! 💥",
    quiz: [
      { question: "O que acontece se uma recursão não tiver caso base?", options: ["Retorna undefined", "Entra em loop infinito (Stack Overflow)", "Retorna 0", "Funciona normalmente"], correctIndex: 1, explanation: "Sem caso base, a função se chama infinitamente até estourar a pilha." },
      { question: "Qual o valor de fatorial(5)?", options: ["25", "120", "60", "24"], correctIndex: 1, explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120." },
      { question: "Quais são os dois ingredientes da recursão?", options: ["Loop e condição", "Caso base e caso recursivo", "Input e output", "Variável e constante"], correctIndex: 1, explanation: "Caso base (quando parar) e caso recursivo (chamar a si mesma com entrada menor)." },
    ],
  },
  progdinamica: {
    title: "Programação Dinâmica",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nComo resolver problemas complexos quebrando em subproblemas menores e guardando os resultados. É o "truque dos gênios" da programação!\n\n### 📋 Pré-requisitos\n- Recursão (aula anterior)\n- Arrays e loops\n- Noção de complexidade\n\n### 🧠 O que é Programação Dinâmica?\nImagine que você está subindo uma escada e alguém pergunta: "Quantas formas de subir 10 degraus?"\n\nVocê poderia calcular do zero... OU lembrar que já calculou para 8 e 9 degraus e apenas somar! Isso é **programação dinâmica**.\n\n**Definição simples:** Resolver problemas guardando respostas de subproblemas para não recalculá-los.\n\n### 🔑 Quando usar?\nDois sinais de que programação dinâmica se aplica:\n1. **Subestrutura ótima**: A solução usa soluções de subproblemas menores\n2. **Subproblemas sobrepostos**: Os mesmos cálculos se repetem várias vezes\n\n### 📝 Duas abordagens\n**1. Top-Down (Memoização)** — Recursão + cache\n- Começa do problema grande, vai quebrando\n- Guarda resultados em um dicionário/objeto\n\n**2. Bottom-Up (Tabulação)** — Tabela iterativa\n- Começa dos menores problemas\n- Vai construindo até o grande\n- Mais eficiente em memória\n\n### 🎯 Exemplo clássico: Fibonacci\n- Sem PD: fibonacci(40) demora SEGUNDOS (recalcula tudo)\n- Com PD: fibonacci(40) é INSTANTÂNEO (guarda os cálculos)\n\n### 📊 Exemplos do mundo real\n- GPS: encontrar o menor caminho\n- Netflix: recomendar filmes\n- Troco: menor número de moedas\n- Mochila: maximizar valor com peso limitado`,
    codeExample: `// ========================================
// FIBONACCI — Sem PD vs Com PD
// ========================================

// ❌ SEM Programação Dinâmica — LENTO (O(2ⁿ))
function fibLento(n) {
  if (n <= 1) return n;
  return fibLento(n - 1) + fibLento(n - 2);
  // fib(5) chama fib(4) e fib(3)
  // fib(4) chama fib(3) e fib(2)  ← fib(3) REPETE!
}

// ✅ COM Memoização (Top-Down) — RÁPIDO (O(n))
function fibMemo(n, cache = {}) {
  if (n <= 1) return n;
  if (cache[n]) return cache[n];  // Já calculou? Usa o cache!
  
  cache[n] = fibMemo(n - 1, cache) + fibMemo(n - 2, cache);
  return cache[n];
}

// ✅ COM Tabulação (Bottom-Up) — RÁPIDO (O(n))
function fibTabela(n) {
  if (n <= 1) return n;
  const tabela = [0, 1];
  
  for (let i = 2; i <= n; i++) {
    tabela[i] = tabela[i - 1] + tabela[i - 2];
  }
  return tabela[n];
}

console.log(fibMemo(40));   // 102334155 — instantâneo!
console.log(fibTabela(40)); // 102334155 — instantâneo!

// ========================================
// PROBLEMA DO TROCO — Mínimo de moedas
// ========================================
// Dado um valor e moedas disponíveis, qual o menor
// número de moedas para dar o troco?

function menorTroco(moedas, valor) {
  // tabela[i] = menor número de moedas para valor i
  const tabela = new Array(valor + 1).fill(Infinity);
  tabela[0] = 0; // 0 reais = 0 moedas

  for (let i = 1; i <= valor; i++) {
    for (let moeda of moedas) {
      if (moeda <= i && tabela[i - moeda] + 1 < tabela[i]) {
        tabela[i] = tabela[i - moeda] + 1;
      }
    }
  }
  
  return tabela[valor] === Infinity ? -1 : tabela[valor];
}

// Moedas: 1, 5, 10, 25 centavos
console.log(menorTroco([1, 5, 10, 25], 36)); // 3 (25+10+1)
console.log(menorTroco([1, 5, 10, 25], 30)); // 2 (25+5)`,
    challenge: "Resolva o 'Problema da Escada': de quantas formas diferentes você pode subir N degraus, se pode subir 1 ou 2 de cada vez? Use programação dinâmica!",
    diogenesTip: "Programação dinâmica é como ter uma caderneta de respostas: se já resolveu um subproblema antes, anota e reutiliza! Nunca refaça trabalho desnecessário. 📝",
    quiz: [
      { question: "O que é memoização?", options: ["Memorizar código", "Guardar resultados já calculados para reutilizar", "Tipo de variável", "Forma de apagar memória"], correctIndex: 1, explanation: "Memoização = guardar (cachear) resultados de subproblemas para não recalculá-los." },
      { question: "Qual a diferença entre Top-Down e Bottom-Up?", options: ["Não há diferença", "Top-Down usa recursão+cache, Bottom-Up usa tabela iterativa", "Bottom-Up é sempre melhor", "Top-Down é mais rápido"], correctIndex: 1, explanation: "Top-Down parte do problema grande com recursão e cache. Bottom-Up constrói a solução de baixo para cima com uma tabela." },
      { question: "Fibonacci sem PD tem complexidade:", options: ["O(n)", "O(log n)", "O(2ⁿ)", "O(n²)"], correctIndex: 2, explanation: "Sem PD, Fibonacci recursivo recalcula muitos valores, resultando em O(2ⁿ) — exponencial!" },
    ],
  },
};

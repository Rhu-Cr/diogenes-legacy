import type { LessonData } from "./lessonTypes";

export const engenhariaLessons: Record<string, LessonData> = {
  versionamento: {
    title: "Versionamento com Git",
    difficulty: "Iniciante",
    content: `### 🎯 O que você vai aprender\nComo usar Git para salvar versões do seu código e trabalhar em equipe sem caos!\n\n### 📋 Pré-requisitos\nNenhum! Vamos começar do zero.\n\n### 📸 O que é Versionamento?\nImagine que você está escrevendo um trabalho e salva como:\n- trabalho_v1.docx\n- trabalho_v2_final.docx\n- trabalho_v3_AGORA_VAI.docx\n\nGit faz isso de forma inteligente e organizada!\n\n### 🔑 Conceitos Fundamentais\n- **Repositório (repo)**: Pasta do projeto monitorada pelo Git\n- **Commit**: "Fotografia" do código naquele momento\n- **Branch**: Versão paralela para trabalhar sem afetar a principal\n- **Merge**: Unir mudanças de uma branch em outra\n- **Pull Request**: Pedir revisão antes de unir código\n\n### 📝 Fluxo Básico\n1. **git init** → Cria o repositório\n2. **git add .** → Seleciona arquivos para o commit\n3. **git commit -m "mensagem"** → Salva a versão\n4. **git push** → Envia para o servidor (GitHub)\n5. **git pull** → Baixa atualizações do servidor\n\n### 🌿 Branches\nBranches são como "universos paralelos":\n- **main/master**: Versão estável\n- **feature/nova-funcao**: Trabalho em progresso\n- Quando pronto, faz merge para a main`,
    codeExample: `// ========================================
// COMANDOS GIT — Guia prático
// ========================================

// --- Configuração inicial (uma vez) ---
// git config --global user.name "Seu Nome"
// git config --global user.email "seu@email.com"

// --- Criando um repositório ---
// git init                    ← Cria repo na pasta atual
// git clone URL               ← Copia repo existente

// --- Fluxo diário ---
// git status                  ← Ver o que mudou
// git add .                   ← Adicionar tudo ao "palco"
// git add arquivo.js          ← Adicionar arquivo específico
// git commit -m "Mensagem"    ← Salvar versão
// git push                    ← Enviar para o servidor

// --- Trabalhando com branches ---
// git branch feature/login    ← Criar branch
// git checkout feature/login  ← Mudar para a branch
// git checkout -b feature/login  ← Criar E mudar (atalho!)
// git merge feature/login     ← Unir branch na atual

// --- Boas práticas de commit ---
// ✅ "Adiciona validação no formulário de login"
// ✅ "Corrige bug no cálculo de frete"
// ❌ "Alterações" (vago demais!)
// ❌ "asdfgh" (sem sentido!)

// --- Exemplo de fluxo completo ---
// 1. git checkout -b feature/cadastro
// 2. (escreve o código)
// 3. git add .
// 4. git commit -m "Implementa tela de cadastro"
// 5. git push origin feature/cadastro
// 6. (abre Pull Request no GitHub)
// 7. (equipe revisa)
// 8. git checkout main
// 9. git merge feature/cadastro`,
    challenge: "Crie um fluxo Git para uma equipe de 3 pessoas trabalhando em um e-commerce. Defina: branches necessárias, regras de commit e processo de code review.",
    diogenesTip: "Git é o Ctrl+Z supremo: você pode voltar a QUALQUER versão do seu código, de semanas ou meses atrás! Commite cedo, commite sempre. 📸",
    quiz: [
      { question: "O que é um commit no Git?", options: ["Deletar código", "Uma 'fotografia' do código em determinado momento", "Enviar email", "Compilar o programa"], correctIndex: 1, explanation: "Um commit é um snapshot — uma versão salva do seu código naquele instante." },
      { question: "Para que servem branches?", options: ["Deletar código", "Trabalhar em funcionalidades sem afetar a versão principal", "Renomear arquivos", "Comprimir código"], correctIndex: 1, explanation: "Branches permitem trabalhar em paralelo sem bagunçar a versão estável!" },
      { question: "Qual comando envia código para o GitHub?", options: ["git commit", "git push", "git pull", "git merge"], correctIndex: 1, explanation: "git push envia seus commits locais para o repositório remoto (GitHub)." },
    ],
  },
  testes: {
    title: "Testes de Software",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nPor que testar código é essencial e como escrever seus primeiros testes.\n\n### 📊 Tipos de Testes\n1. **Unitários** — Testam UMA função isolada (rápidos, a maioria)\n2. **Integração** — Testam partes trabalhando juntas\n3. **E2E** — Simulam o usuário real\n\n### ✅ Princípio AAA\n1. **Arrange** (Preparar)\n2. **Act** (Agir)\n3. **Assert** (Verificar)`,
    codeExample: `// Funções para testar
function somar(a, b) { return a + b; }
function ehPar(n) { return n % 2 === 0; }
function maiorDeIdade(idade) {
  if (idade < 0) throw new Error("Idade inválida");
  return idade >= 18;
}

// Testes manuais seguindo AAA
// ARRANGE
let a = 2, b = 3;
// ACT
let resultado = somar(a, b);
// ASSERT
console.log(resultado === 5 ? "✅ Passou!" : "❌ Falhou!");

// Testes de ehPar
console.log(ehPar(4) === true ? "✅" : "❌");
console.log(ehPar(7) === false ? "✅" : "❌");
console.log(ehPar(0) === true ? "✅" : "❌");

// Teste de exceção
try {
  maiorDeIdade(-5);
  console.log("❌ Deveria ter dado erro!");
} catch (e) {
  console.log("✅ Erro capturado:", e.message);
}`,
    challenge: "Escreva testes para uma função 'calculadora(a, operador, b)' que soma, subtrai, multiplica e divide. Inclua caso de divisão por zero!",
    diogenesTip: "Testes são como provar a massa do bolo: verifica ANTES de entregar! Código sem testes é como ponte sem inspeção. 🎂",
    quiz: [
      { question: "O que são testes unitários?", options: ["Testam todo o sistema", "Testam UMA função isolada", "Testam a interface", "Testam o banco de dados"], correctIndex: 1, explanation: "Testes unitários testam uma função ou módulo isoladamente." },
      { question: "O que significa AAA?", options: ["Arrange, Act, Assert", "Add, Apply, Analyze", "Assess, Assure, Approve", "Access, Action, Alert"], correctIndex: 0, explanation: "AAA = Preparar o cenário, Executar a ação, Verificar o resultado." },
      { question: "Por que testar código?", options: ["Para ficar mais lento", "Para encontrar bugs cedo e ter confiança para mudar código", "Para gastar tempo", "Não há motivo"], correctIndex: 1, explanation: "Testes encontram bugs cedo e dão confiança para refatorar!" },
    ],
  },
  apis: {
    title: "APIs e REST",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nO que são APIs, como funcionam e como consumir dados de serviços externos. APIs são a "ponte" entre sistemas diferentes!\n\n### 📋 Pré-requisitos\n- Funções\n- Objetos e JSON\n- Conceito de cliente-servidor\n\n### 🌉 O que é uma API?\n**API** = Application Programming Interface (Interface de Programação de Aplicações)\n\nÉ como o **garçom** de um restaurante:\n- Você (cliente) faz o pedido\n- O garçom (API) leva para a cozinha (servidor)\n- A cozinha prepara\n- O garçom traz a resposta\n\n### 🔗 O que é REST?\nREST é um padrão para criar APIs usando HTTP:\n- **GET** → Buscar dados (ler)\n- **POST** → Criar dados (escrever)\n- **PUT** → Atualizar dados (editar)\n- **DELETE** → Remover dados (apagar)\n\n### 📦 O que é JSON?\nFormato padrão para trocar dados entre sistemas:\n{ "nome": "Ana", "idade": 25 }\n\n### 📊 Códigos de Status HTTP\n- **200** → OK (sucesso!)\n- **201** → Criado com sucesso\n- **400** → Erro do cliente (dados inválidos)\n- **401** → Não autorizado (sem login)\n- **404** → Não encontrado\n- **500** → Erro no servidor\n\n### 🔑 Conceitos importantes\n- **Endpoint**: URL específica da API (ex: /api/usuarios)\n- **Request**: A requisição enviada\n- **Response**: A resposta recebida\n- **Headers**: Informações extras (tipo de dado, autenticação)`,
    codeExample: `// ========================================
// CONSUMINDO APIS — Exemplos práticos
// ========================================

// --- GET: Buscar dados ---
async function buscarUsuarios() {
  try {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await resposta.json();
    
    console.log("Status:", resposta.status); // 200
    console.log("Total:", usuarios.length);  // 10
    console.log("Primeiro:", usuarios[0].name); // "Leanne Graham"
  } catch (erro) {
    console.error("Erro:", erro.message);
  }
}

// --- POST: Criar dados ---
async function criarPost() {
  const novoPost = {
    title: "Meu primeiro post",
    body: "Aprendendo APIs!",
    userId: 1,
  };

  const resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoPost),
  });

  const resultado = await resposta.json();
  console.log("Criado com id:", resultado.id);
}

// --- Tratamento de erros ---
async function buscarComTratamento(id) {
  const resposta = await fetch(
    \`https://jsonplaceholder.typicode.com/users/\${id}\`
  );
  
  if (!resposta.ok) {
    if (resposta.status === 404) {
      console.log("Usuário não encontrado!");
    } else {
      console.log("Erro:", resposta.status);
    }
    return null;
  }
  
  return await resposta.json();
}`,
    challenge: "Crie funções para consumir uma API de tarefas (todos): listar todas, buscar por ID, criar nova e marcar como concluída. Use https://jsonplaceholder.typicode.com/todos",
    diogenesTip: "APIs são o garçom digital: levam seu pedido e trazem a resposta. Toda vez que você usa um app que mostra dados da internet, uma API está trabalhando! 🍽️",
    quiz: [
      { question: "O que significa REST?", options: ["Descansar em inglês", "Um padrão para criar APIs usando HTTP", "Uma linguagem de programação", "Um banco de dados"], correctIndex: 1, explanation: "REST é um estilo arquitetural para APIs que usa métodos HTTP (GET, POST, PUT, DELETE)." },
      { question: "Qual método HTTP é usado para CRIAR dados?", options: ["GET", "POST", "DELETE", "PATCH"], correctIndex: 1, explanation: "POST é usado para criar novos recursos no servidor." },
      { question: "O que significa status 404?", options: ["Sucesso", "Erro do servidor", "Não encontrado", "Não autorizado"], correctIndex: 2, explanation: "404 = Not Found — o recurso solicitado não existe." },
    ],
  },
  refatoracao: {
    title: "Refatoração de Código",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo melhorar código existente sem mudar seu comportamento. Refatorar é como reformar uma casa: melhora por dentro sem mudar o que ela faz!\n\n### 📋 Pré-requisitos\n- Funções\n- Condicionais e loops\n- Conceito de boas práticas\n\n### 🔧 O que é Refatoração?\n**Refatorar** = Mudar a ESTRUTURA do código sem mudar o COMPORTAMENTO.\n\nO programa faz exatamente a mesma coisa, mas o código fica:\n- Mais fácil de ler\n- Mais fácil de manter\n- Mais fácil de testar\n\n### 🚩 Code Smells — "Cheiros" de código ruim\n1. **Função muito longa**: Se tem mais de 20 linhas, divida!\n2. **Nomes ruins**: x, temp, data → O que é isso?\n3. **Código duplicado**: Mesmo trecho copiado em vários lugares\n4. **Muitos parâmetros**: Mais de 3? Use um objeto!\n5. **Aninhamento profundo**: If dentro de if dentro de if...\n6. **Comentários explicando código ruim**: O código deveria ser auto-explicativo\n\n### 🛠️ Técnicas de Refatoração\n- **Extrair função**: Pega um trecho e transforma em função\n- **Renomear**: Dá nomes que explicam o que faz\n- **Early return**: Retorna cedo para evitar aninhamento\n- **Substituir condicional por polimorfismo**: Troca if/else por classes\n- **DRY**: Don't Repeat Yourself — elimine duplicação`,
    codeExample: `// ========================================
// ANTES vs DEPOIS da refatoração
// ========================================

// ❌ ANTES: Código confuso e duplicado
function processarPedido(p) {
  let t = 0;
  for (let i = 0; i < p.itens.length; i++) {
    t = t + p.itens[i].preco * p.itens[i].qtd;
  }
  if (p.tipo === "vip") {
    t = t * 0.9; // 10% desconto
  } else if (p.tipo === "funcionario") {
    t = t * 0.7; // 30% desconto
  }
  if (t > 100) {
    t = t - 10; // frete grátis? desconto? quem sabe...
  }
  console.log("Total: R$" + t);
  return t;
}

// ✅ DEPOIS: Código limpo e organizado
function calcularSubtotal(itens) {
  return itens.reduce(
    (total, item) => total + item.preco * item.quantidade, 0
  );
}

function calcularDesconto(subtotal, tipoCliente) {
  const descontos = {
    vip: 0.10,
    funcionario: 0.30,
    normal: 0,
  };
  const taxa = descontos[tipoCliente] || 0;
  return subtotal * taxa;
}

function aplicarPromocao(total) {
  const LIMITE_FRETE_GRATIS = 100;
  const DESCONTO_FRETE = 10;
  return total > LIMITE_FRETE_GRATIS ? total - DESCONTO_FRETE : total;
}

function processarPedidoRefatorado(pedido) {
  const subtotal = calcularSubtotal(pedido.itens);
  const desconto = calcularDesconto(subtotal, pedido.tipoCliente);
  const totalComDesconto = subtotal - desconto;
  const totalFinal = aplicarPromocao(totalComDesconto);
  
  console.log(\`Total: R$\${totalFinal.toFixed(2)}\`);
  return totalFinal;
}`,
    challenge: "Refatore esta função: function f(a){let r='';for(let i=a.length-1;i>=0;i--){if(a[i]!==' '){r+=a[i].toUpperCase()}else{r+=' '}}return r}. Dê nomes claros e use métodos modernos!",
    diogenesTip: "Código é escrito uma vez, mas lido CENTENAS de vezes. Invista em legibilidade! Seu futuro eu (e sua equipe) vão agradecer. 📖",
    quiz: [
      { question: "O que é refatoração?", options: ["Adicionar novas funcionalidades", "Mudar a estrutura sem mudar o comportamento", "Deletar código", "Criar testes"], correctIndex: 1, explanation: "Refatorar = melhorar a estrutura interna sem alterar o que o programa faz." },
      { question: "O que é 'code smell'?", options: ["Código que cheira mal literalmente", "Indicador de que o código precisa ser melhorado", "Um bug", "Um tipo de variável"], correctIndex: 1, explanation: "Code smells são sinais de que o código pode (e deve) ser melhorado." },
      { question: "O que significa DRY?", options: ["Dry Run Yearly", "Don't Repeat Yourself", "Debug, Refactor, Yell", "Data Recovery Yield"], correctIndex: 1, explanation: "DRY = Don't Repeat Yourself — não repita código! Extraia para funções reutilizáveis." },
    ],
  },
  solid: {
    title: "Princípios SOLID",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nOs 5 princípios SOLID que tornam seu código mais limpo, organizado e fácil de manter.\n\n### 🏗️ Os 5 Princípios\n\n**S — Single Responsibility**\nCada classe faz UMA coisa só.\n\n**O — Open/Closed**\nAberto para extensão, fechado para modificação.\n\n**L — Liskov Substitution**\nClasses filhas substituem as pais sem quebrar.\n\n**I — Interface Segregation**\nMuitas interfaces específicas > uma gigante.\n\n**D — Dependency Inversion**\nDependa de abstrações, não implementações concretas.`,
    codeExample: `// PRINCÍPIO S — Responsabilidade Única

// ❌ ERRADO: Uma classe fazendo TUDO
class UsuarioErrado {
  salvarNoBanco() { }
  enviarEmail() { }
  gerarRelatorio() { }
}

// ✅ CORRETO: Cada classe com UMA responsabilidade
class UsuarioRepository {
  salvar(usuario) { console.log("💾 Salvando..."); }
}
class EmailService {
  enviar(email) { console.log("📧 Enviando..."); }
}

// PRINCÍPIO D — Inversão de Dependência

// ✅ Depende de abstração
class PedidoService {
  constructor(bancoDeDados) {
    this.db = bancoDeDados; // Recebe qualquer banco!
  }
  salvar(pedido) {
    this.db.inserir(pedido); // MySQL, Postgres, MongoDB...
  }
}`,
    challenge: "Refatore uma classe 'Pedido' que calcula total, aplica desconto, salva no banco e envia notificação. Separe em classes SOLID.",
    diogenesTip: "SOLID é a diferença entre código que dura anos e código que vira uma bola de neve de problemas! Invista agora, economize dor depois!",
    quiz: [
      { question: "O que significa o 'S' em SOLID?", options: ["Simple Responsibility", "Single Responsibility", "Software Reliability", "System Requirements"], correctIndex: 1, explanation: "S = Single Responsibility — cada classe com UMA responsabilidade." },
      { question: "O princípio Open/Closed diz que código deve ser:", options: ["Aberto para modificação", "Aberto para extensão, fechado para modificação", "Sempre aberto", "Sempre fechado"], correctIndex: 1, explanation: "Aberto para extensão, fechado para modificação." },
      { question: "Por que depender de abstrações?", options: ["É mais rápido", "Permite trocar implementações sem quebrar código", "Usa menos memória", "É mais bonito"], correctIndex: 1, explanation: "Depender de abstrações permite trocar MySQL por MongoDB sem mudar seu código!" },
    ],
  },
  padroes: {
    title: "Padrões de Projeto",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nPadrões de projeto (design patterns) — "receitas" testadas para problemas comuns.\n\n### 📂 As 3 Categorias\n**Criacionais**: Factory, Singleton, Builder\n**Estruturais**: Adapter, Decorator, Facade\n**Comportamentais**: Observer, Strategy, Command`,
    codeExample: `// PADRÃO OBSERVER — "Newsletter/Notificação"
class SistemaNotificacao {
  constructor() { this.ouvintes = {}; }

  inscrever(evento, callback) {
    if (!this.ouvintes[evento]) this.ouvintes[evento] = [];
    this.ouvintes[evento].push(callback);
  }

  notificar(evento, dados) {
    if (this.ouvintes[evento]) {
      this.ouvintes[evento].forEach(cb => cb(dados));
    }
  }
}

const sistema = new SistemaNotificacao();

sistema.inscrever('novaVenda', (venda) => {
  console.log(\`📦 Estoque: Reduzir \${venda.produto}\`);
});
sistema.inscrever('novaVenda', (venda) => {
  console.log(\`💰 Financeiro: R$\${venda.valor}\`);
});

sistema.notificar('novaVenda', {
  produto: 'Notebook', valor: 3500
});`,
    challenge: "Implemente o padrão Strategy para um sistema de frete com diferentes estratégias (Sedex, PAC, Expresso).",
    diogenesTip: "Padrões são como peças de LEGO: aprenda cada peça e construa o que quiser! Entenda o PROBLEMA que cada um resolve. 🧱",
    quiz: [
      { question: "O que são padrões de projeto?", options: ["Linguagens de programação", "Soluções reutilizáveis para problemas comuns", "Bancos de dados", "Ferramentas de teste"], correctIndex: 1, explanation: "São soluções testadas para problemas recorrentes." },
      { question: "O Singleton garante que:", options: ["Muitas instâncias existam", "Apenas UMA instância exista", "Nenhuma instância exista", "Classes sejam deletadas"], correctIndex: 1, explanation: "Singleton = uma única instância de uma classe." },
      { question: "Observer funciona como:", options: ["Uma fábrica", "Uma newsletter — inscritos são notificados", "Um adaptador", "Um controle remoto"], correctIndex: 1, explanation: "Observer = inscritos são notificados quando um evento acontece!" },
    ],
  },
  arquitetura: {
    title: "Arquitetura de Software",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nComo organizar um sistema inteiro — a "planta baixa" do software.\n\n### 🏗️ Estilos Arquiteturais\n- **Monolítico**: Tudo junto (simples, bom para começar)\n- **Microserviços**: Dividido em serviços independentes\n- **Serverless**: Funções sob demanda\n\n### 📐 MVC\n- **Model**: Dados\n- **View**: Interface\n- **Controller**: Lógica de conexão\n\n### 🧅 Clean Architecture\nCamadas de dentro para fora:\n1. Entidades (regras de negócio)\n2. Casos de Uso\n3. Adaptadores\n4. Frameworks`,
    codeExample: `// CLEAN ARCHITECTURE — Exemplo simples

// Camada 1: ENTIDADE (regras de negócio puras)
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
  aplicarDesconto(percentual) {
    return this.preco * (1 - percentual / 100);
  }
}

// Camada 2: CASO DE USO (regras da aplicação)
class CriarProdutoUseCase {
  constructor(produtoRepository) {
    this.repo = produtoRepository;
  }
  async executar(nome, preco) {
    if (preco <= 0) throw new Error("Preço inválido");
    const produto = new Produto(nome, preco);
    return await this.repo.salvar(produto);
  }
}

// Camada 3: ADAPTADOR (conecta com o mundo externo)
class ProdutoRepositoryBanco {
  async salvar(produto) {
    console.log(\`💾 Salvando: \${produto.nome} - R$\${produto.preco}\`);
    return { id: 1, ...produto };
  }
}

// Uso:
const repo = new ProdutoRepositoryBanco();
const useCase = new CriarProdutoUseCase(repo);
// Para trocar o banco, só muda o repositório!`,
    challenge: "Projete a arquitetura de um sistema de pedidos de comida usando Clean Architecture.",
    diogenesTip: "Boa arquitetura é como bom alicerce: o usuário não vê, mas impede o prédio de cair! Pense antes de codar. 🏗️",
    quiz: [
      { question: "O que é MVC?", options: ["Model-View-Controller", "Main-Virtual-Component", "Module-Version-Control", "Managed-View-Class"], correctIndex: 0, explanation: "MVC = Model (dados), View (interface), Controller (lógica)." },
      { question: "Na Clean Architecture, dependências apontam para:", options: ["Camadas externas", "Camadas internas (regras de negócio)", "O banco de dados", "A interface"], correctIndex: 1, explanation: "Dependências SEMPRE apontam para dentro. Regras de negócio nunca dependem de banco ou framework!" },
      { question: "Para um projeto pequeno, qual arquitetura é mais indicada?", options: ["Microserviços", "Clean Architecture", "Monolítico + MVC", "Serverless"], correctIndex: 2, explanation: "Para projetos pequenos, monolítico + MVC é o mais simples e produtivo!" },
    ],
  },
  devops: {
    title: "DevOps e CI/CD",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nComo automatizar testes, builds e deploy do seu software. DevOps é a "esteira" que leva seu código do computador até o usuário!\n\n### 📋 Pré-requisitos\n- Git e versionamento\n- Testes de software\n- Conceito de deploy\n\n### 🔄 O que é DevOps?\n**DevOps** = Development (Desenvolvimento) + Operations (Operações)\n\nÉ a prática de unir quem escreve código e quem coloca em produção, automatizando tudo no meio!\n\n### 🏭 O que é CI/CD?\n**CI (Continuous Integration)**: A cada commit, o código é automaticamente testado e integrado.\n**CD (Continuous Delivery/Deployment)**: Código aprovado é automaticamente preparado/enviado para produção.\n\n### 📝 Pipeline CI/CD — A esteira de produção\n1. **Code** → Desenvolvedor escreve código\n2. **Build** → Código é compilado/empacotado\n3. **Test** → Testes automáticos rodam\n4. **Deploy** → Se tudo passou, vai para produção!\n\n### 🐳 Docker\nUm "container" que empacota sua aplicação com TUDO que ela precisa para rodar.\n- Funciona na minha máquina? Funciona em TODO lugar!\n\n### 📊 Ferramentas populares\n- **GitHub Actions**: CI/CD integrado ao GitHub\n- **Docker**: Containers\n- **Vercel/Netlify**: Deploy automático de frontends\n- **AWS/GCP/Azure**: Infraestrutura na nuvem`,
    codeExample: `// ========================================
// EXEMPLO: GitHub Actions (CI/CD)
// ========================================

// Arquivo: .github/workflows/ci.yml
// ---
// name: CI Pipeline
// 
// on:
//   push:
//     branches: [main]
//   pull_request:
//     branches: [main]
// 
// jobs:
//   test:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - uses: actions/setup-node@v4
//         with:
//           node-version: '20'
//       - run: npm install
//       - run: npm test
//       - run: npm run build
//
//   deploy:
//     needs: test  # Só deploya se os testes passarem!
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - run: npm install
//       - run: npm run build
//       - run: echo "🚀 Deploy para produção!"

// ========================================
// EXEMPLO: Dockerfile simples
// ========================================

// FROM node:20-alpine
// WORKDIR /app
// COPY package*.json ./
// RUN npm install
// COPY . .
// RUN npm run build
// EXPOSE 3000
// CMD ["npm", "start"]

// Conceito em JavaScript:
const pipeline = {
  etapas: ["build", "test", "deploy"],
  
  async executar() {
    for (const etapa of this.etapas) {
      console.log(\`⏳ Executando: \${etapa}...\`);
      const sucesso = await this.rodarEtapa(etapa);
      if (!sucesso) {
        console.log(\`❌ Falhou em: \${etapa}\`);
        return false; // Para o pipeline!
      }
      console.log(\`✅ \${etapa} concluído!\`);
    }
    console.log("🚀 Pipeline completo! Deploy realizado!");
    return true;
  },
  
  async rodarEtapa(etapa) {
    // Simula execução
    return Math.random() > 0.1; // 90% de chance de sucesso
  }
};`,
    challenge: "Projete um pipeline CI/CD para um projeto web. Defina: etapas de build, quais testes rodar, como fazer deploy e como reverter em caso de erro.",
    diogenesTip: "CI/CD é como uma fábrica automatizada: cada peça é inspecionada antes de ir para o consumidor. Automatize tudo que pode ser automatizado! 🏭",
    quiz: [
      { question: "O que significa CI?", options: ["Code Inspection", "Continuous Integration", "Central Intelligence", "Command Interface"], correctIndex: 1, explanation: "CI = Continuous Integration — integração contínua, testando automaticamente a cada commit." },
      { question: "O que o Docker faz?", options: ["Escreve código", "Empacota a aplicação com tudo que ela precisa para rodar", "Testa código", "Cria bancos de dados"], correctIndex: 1, explanation: "Docker cria containers que empacotam sua app + dependências + configuração — roda igual em qualquer lugar!" },
      { question: "Se um teste falha no pipeline, o que acontece?", options: ["Deploya mesmo assim", "O pipeline para e o deploy não acontece", "O teste é ignorado", "O código é revertido automaticamente"], correctIndex: 1, explanation: "Se qualquer etapa falha, o pipeline para — código com bugs não vai para produção!" },
    ],
  },
  seguranca: {
    title: "Segurança de Software",
    difficulty: "Avançado",
    content: `### 🎯 O que você vai aprender\nComo proteger suas aplicações contra ataques e vulnerabilidades. Segurança não é opcional — é essencial!\n\n### 📋 Pré-requisitos\n- APIs e HTTP\n- Conceito de autenticação\n- Noção de banco de dados\n\n### 🔒 Por que segurança importa?\nUm sistema inseguro pode resultar em:\n- Vazamento de dados pessoais\n- Prejuízo financeiro\n- Danos à reputação\n- Processos legais (LGPD!)\n\n### ⚠️ Top 5 Vulnerabilidades Web\n\n**1. Injeção (SQL Injection)**\nO atacante "injeta" código malicioso em campos de formulário.\n- ❌ "SELECT * FROM users WHERE name = '" + nome + "'"\n- ✅ Use parâmetros preparados!\n\n**2. XSS (Cross-Site Scripting)**\nO atacante injeta JavaScript malicioso na página.\n- ❌ Exibir dados do usuário sem sanitizar\n- ✅ Sempre escape HTML antes de exibir\n\n**3. Autenticação Quebrada**\nSenhas fracas, sem limite de tentativas, tokens inseguros.\n- ✅ Use hash de senha (bcrypt)\n- ✅ Implemente rate limiting\n\n**4. CSRF (Cross-Site Request Forgery)**\nO atacante faz o navegador do usuário executar ações sem consentimento.\n- ✅ Use tokens CSRF\n\n**5. Exposição de Dados Sensíveis**\nDados transmitidos sem criptografia.\n- ✅ Use HTTPS sempre\n- ✅ Nunca guarde senhas em texto puro\n\n### 🛡️ Boas práticas\n- Princípio do menor privilégio\n- Validar TODA entrada do usuário\n- Manter dependências atualizadas\n- Usar HTTPS em tudo\n- Nunca confiar no frontend para validação`,
    codeExample: `// ========================================
// SEGURANÇA — Exemplos práticos
// ========================================

// ❌ SQL INJECTION — ERRADO
// const query = "SELECT * FROM users WHERE email = '" + email + "'";
// Se email = "' OR '1'='1" → retorna TODOS os usuários!

// ✅ CORRETO: Parâmetros preparados
// const { data } = await supabase
//   .from('users')
//   .select()
//   .eq('email', email);  // Automaticamente seguro!

// ========================================
// ❌ XSS — ERRADO
// document.innerHTML = comentarioDoUsuario;
// Se comentário = "<script>roubarCookies()</script>" → PERIGO!

// ✅ CORRETO: Sanitizar
function sanitizarHTML(texto) {
  const mapa = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#039;'
  };
  return texto.replace(/[&<>"']/g, c => mapa[c]);
}

console.log(sanitizarHTML("<script>alert('hack')</script>"));
// &lt;script&gt;alert(&#039;hack&#039;)&lt;/script&gt;

// ========================================
// ✅ Validação de entrada
function validarEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!regex.test(email)) {
    throw new Error("Email inválido");
  }
  return email.trim().toLowerCase();
}

function validarSenha(senha) {
  if (senha.length < 8) throw new Error("Mínimo 8 caracteres");
  if (!/[A-Z]/.test(senha)) throw new Error("Precisa de maiúscula");
  if (!/[0-9]/.test(senha)) throw new Error("Precisa de número");
  return true;
}

// ========================================
// ✅ Rate Limiting simples
class RateLimiter {
  constructor(maxTentativas, janelaSeg) {
    this.tentativas = new Map();
    this.max = maxTentativas;
    this.janela = janelaSeg * 1000;
  }
  
  permitir(chave) {
    const agora = Date.now();
    const registro = this.tentativas.get(chave) || { count: 0, inicio: agora };
    
    if (agora - registro.inicio > this.janela) {
      registro.count = 0;
      registro.inicio = agora;
    }
    
    registro.count++;
    this.tentativas.set(chave, registro);
    return registro.count <= this.max;
  }
}

const limiter = new RateLimiter(5, 60); // 5 tentativas por minuto
console.log(limiter.permitir("192.168.1.1")); // true (1ª tentativa)`,
    challenge: "Implemente um sistema de login seguro com: hash de senha, validação de email, rate limiting (máx 5 tentativas por minuto) e tokens de sessão.",
    diogenesTip: "Segurança é como cinto de segurança: parece desnecessário até o dia que salva sua vida! Sempre valide dados, nunca confie no frontend. 🔐",
    quiz: [
      { question: "O que é SQL Injection?", options: ["Um tipo de banco de dados", "Injetar código malicioso em consultas SQL", "Um framework", "Um tipo de teste"], correctIndex: 1, explanation: "SQL Injection é quando o atacante insere código SQL malicioso em campos de entrada." },
      { question: "Como armazenar senhas de forma segura?", options: ["Em texto puro no banco", "Em um arquivo .txt", "Usando hash (bcrypt)", "No localStorage"], correctIndex: 2, explanation: "Senhas devem ser hasheadas (bcrypt) — nunca armazenadas em texto puro!" },
      { question: "O que é XSS?", options: ["Um protocolo", "Injeção de JavaScript malicioso na página", "Um tipo de CSS", "Um banco de dados"], correctIndex: 1, explanation: "XSS = Cross-Site Scripting — o atacante injeta scripts maliciosos que executam no navegador da vítima." },
    ],
  },
  documentacao: {
    title: "Documentação de Software",
    difficulty: "Intermediário",
    content: `### 🎯 O que você vai aprender\nComo documentar código e projetos de forma eficiente. Documentação boa é um ato de gentileza com seu futuro eu e sua equipe!\n\n### 📋 Pré-requisitos\n- Funções e classes\n- Conceito de APIs\n\n### 📝 Por que documentar?\n- Você vai esquecer o que seu código faz em 3 meses\n- Novos membros da equipe precisam entender\n- APIs precisam de manual\n- Reduz tempo de suporte e perguntas\n\n### 📂 Tipos de Documentação\n\n**1. Comentários no código**\n- Explique o POR QUÊ, não o QUÊ\n- ❌ // incrementa i → óbvio!\n- ✅ // Usa binário para calcular subconjuntos (otimização)\n\n**2. README.md**\nO "cartão de visitas" do projeto:\n- O que é\n- Como instalar\n- Como usar\n- Como contribuir\n\n**3. Documentação de API**\n- Endpoints disponíveis\n- Parâmetros esperados\n- Exemplos de request/response\n- Códigos de erro\n\n**4. JSDoc / TSDoc**\nComentários estruturados que IDEs entendem:\n- Parâmetros, retorno, exemplos\n\n### ✅ Boas práticas\n- Mantenha atualizada (doc desatualizada é pior que nenhuma!)\n- Use exemplos práticos\n- Escreva como se fosse para alguém que nunca viu o projeto\n- Automatize o que puder (geração de docs a partir do código)`,
    codeExample: `// ========================================
// JSDOC — Documentação estruturada
// ========================================

/**
 * Calcula o preço final de um produto com desconto.
 * 
 * @param {number} precoOriginal - Preço sem desconto (em reais)
 * @param {number} percentualDesconto - Desconto a aplicar (0-100)
 * @returns {number} Preço final com desconto aplicado
 * @throws {Error} Se o desconto for negativo ou maior que 100
 * 
 * @example
 * calcularPrecoFinal(100, 20); // 80
 * calcularPrecoFinal(50, 10);  // 45
 */
function calcularPrecoFinal(precoOriginal, percentualDesconto) {
  if (percentualDesconto < 0 || percentualDesconto > 100) {
    throw new Error("Desconto deve ser entre 0 e 100");
  }
  return precoOriginal * (1 - percentualDesconto / 100);
}

// ========================================
// README.md — Exemplo de estrutura
// ========================================

const exemploReadme = \`
# 📚 Meu Projeto Incrível

## O que é?
Sistema de gerenciamento de tarefas com IA.

## 🚀 Como instalar
\\\`\\\`\\\`bash
git clone https://github.com/user/projeto.git
cd projeto
npm install
npm run dev
\\\`\\\`\\\`

## 📖 Como usar
1. Crie uma conta
2. Adicione suas tarefas
3. A IA sugere prioridades

## 🔧 Tecnologias
- React + TypeScript
- Tailwind CSS
- Supabase

## 🤝 Como contribuir
1. Faça um fork
2. Crie uma branch (git checkout -b feature/minha-feature)
3. Commit suas mudanças
4. Abra um Pull Request
\`;

console.log(exemploReadme);`,
    challenge: "Documente completamente uma classe 'CarrinhoDeCompras' com JSDoc: métodos, parâmetros, retornos, exemplos e um README explicando como usar.",
    diogenesTip: "Código sem documentação é como um mapa sem legenda: pode até ter a informação, mas ninguém vai entender! Documente hoje, agradeça amanhã. 📖",
    quiz: [
      { question: "Quando comentar o código?", options: ["Explique CADA linha", "Explique o POR QUÊ, não o QUÊ", "Nunca comente", "Só em código difícil"], correctIndex: 1, explanation: "Comentários devem explicar o motivo (por quê), não o que o código faz — isso deve ser claro pelo código em si." },
      { question: "O que deve ter em um README?", options: ["Apenas o nome do projeto", "O que é, como instalar, como usar", "Código-fonte completo", "Apenas bugs conhecidos"], correctIndex: 1, explanation: "Um bom README explica o que é, como instalar, como usar e como contribuir." },
      { question: "O que é JSDoc?", options: ["Um framework", "Comentários estruturados que IDEs entendem", "Um banco de dados", "Uma linguagem"], correctIndex: 1, explanation: "JSDoc são comentários com formato especial (@param, @returns) que IDEs usam para autocompletar e documentar." },
    ],
  },
};

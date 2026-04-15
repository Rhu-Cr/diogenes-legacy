import { Code, Database, Layers, type LucideIcon } from "lucide-react";

export interface ModuleInfo {
  id: string;
  title: string;
  duration: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
}

export interface PathInfo {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  level: string;
  modules: ModuleInfo[];
  color: string;
}

export const paths: PathInfo[] = [
  {
    id: "algoritmos",
    icon: Code,
    title: "Algoritmos",
    description: "Busca, ordenação, recursão e programação dinâmica.",
    level: "Iniciante",
    modules: [
      { id: "intro", title: "Introdução a Algoritmos", duration: "15 min", difficulty: "Iniciante" },
      { id: "variaveis", title: "Variáveis e Tipos de Dados", duration: "15 min", difficulty: "Iniciante" },
      { id: "condicionais", title: "Condicionais (If/Else)", duration: "15 min", difficulty: "Iniciante" },
      { id: "loops", title: "Loops (Repetição)", duration: "15 min", difficulty: "Iniciante" },
      { id: "funcoes", title: "Funções", duration: "15 min", difficulty: "Iniciante" },
      { id: "busca", title: "Algoritmos de Busca", duration: "20 min", difficulty: "Intermediário" },
      { id: "ordenacao", title: "Algoritmos de Ordenação", duration: "25 min", difficulty: "Intermediário" },
      { id: "complexidade", title: "Complexidade de Algoritmos", duration: "20 min", difficulty: "Intermediário" },
      { id: "recursao", title: "Recursão", duration: "20 min", difficulty: "Avançado" },
      { id: "progdinamica", title: "Programação Dinâmica", duration: "25 min", difficulty: "Avançado" },
    ],
    color: "text-accent",
  },
  {
    id: "estruturas",
    icon: Database,
    title: "Estruturas de Dados",
    description: "Listas, pilhas, filas, árvores, grafos e mais.",
    level: "Intermediário",
    modules: [
      { id: "arrays", title: "Arrays e Strings", duration: "15 min", difficulty: "Iniciante" },
      { id: "listas", title: "Listas Encadeadas", duration: "20 min", difficulty: "Intermediário" },
      { id: "pilhas", title: "Pilhas e Filas", duration: "15 min", difficulty: "Intermediário" },
      { id: "hashtable", title: "Tabelas Hash", duration: "20 min", difficulty: "Intermediário" },
      { id: "conjuntos", title: "Conjuntos (Sets)", duration: "15 min", difficulty: "Intermediário" },
      { id: "arvores", title: "Árvores Binárias", duration: "25 min", difficulty: "Avançado" },
      { id: "heap", title: "Heap (Fila de Prioridade)", duration: "20 min", difficulty: "Avançado" },
      { id: "trie", title: "Trie (Árvore de Prefixos)", duration: "20 min", difficulty: "Avançado" },
      { id: "grafos", title: "Grafos", duration: "30 min", difficulty: "Avançado" },
      { id: "matrices", title: "Matrizes e Tabelas", duration: "20 min", difficulty: "Intermediário" },
    ],
    color: "text-progress",
  },
  {
    id: "engenharia",
    icon: Layers,
    title: "Engenharia de Software",
    description: "Padrões de projeto, arquitetura e boas práticas.",
    level: "Avançado",
    modules: [
      { id: "versionamento", title: "Versionamento com Git", duration: "15 min", difficulty: "Iniciante" },
      { id: "testes", title: "Testes de Software", duration: "20 min", difficulty: "Intermediário" },
      { id: "apis", title: "APIs e REST", duration: "20 min", difficulty: "Intermediário" },
      { id: "refatoracao", title: "Refatoração de Código", duration: "20 min", difficulty: "Intermediário" },
      { id: "solid", title: "Princípios SOLID", duration: "20 min", difficulty: "Avançado" },
      { id: "padroes", title: "Padrões de Projeto", duration: "25 min", difficulty: "Avançado" },
      { id: "arquitetura", title: "Arquitetura de Software", duration: "30 min", difficulty: "Avançado" },
      { id: "devops", title: "DevOps e CI/CD", duration: "20 min", difficulty: "Avançado" },
      { id: "seguranca", title: "Segurança de Software", duration: "20 min", difficulty: "Avançado" },
      { id: "documentacao", title: "Documentação de Software", duration: "15 min", difficulty: "Intermediário" },
    ],
    color: "text-navy-light",
  },
];

export type DifficultyLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonData {
  title: string;
  difficulty: DifficultyLevel;
  content: string;
  codeExample: string;
  challenge: string;
  diogenesTip: string;
  quiz: QuizQuestion[];
}

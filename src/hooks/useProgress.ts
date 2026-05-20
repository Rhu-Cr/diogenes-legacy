import { useState, useEffect, useCallback } from "react";

export interface LessonProgress {
  lesson_id: string;
  score: number;
  total: number;
}

export interface ChallengeProgress {
  challenge_id: string;
  points: number;
  time_spent: number | null;
}

const LESSONS_KEY = "lesson_progress_v1";
const CHALLENGES_KEY = "challenge_progress_v1";

function readLS<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeLS<T>(key: string, value: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<ChallengeProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCompletedLessons(readLS<LessonProgress>(LESSONS_KEY));
    setCompletedChallenges(readLS<ChallengeProgress>(CHALLENGES_KEY));
    setLoading(false);
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => completedLessons.some((l) => l.lesson_id === lessonId),
    [completedLessons]
  );

  const completeLesson = useCallback(
    async (lessonId: string, score: number, total: number) => {
      setCompletedLessons((prev) => {
        const exists = prev.find((l) => l.lesson_id === lessonId);
        const next = exists
          ? prev.map((l) => (l.lesson_id === lessonId ? { ...l, score, total } : l))
          : [...prev, { lesson_id: lessonId, score, total }];
        writeLS(LESSONS_KEY, next);
        return next;
      });
    },
    []
  );

  const getChallengeProgress = useCallback(
    (challengeId: string) => completedChallenges.find((c) => c.challenge_id === challengeId),
    [completedChallenges]
  );

  const completeChallenge = useCallback(
    async (challengeId: string, points: number, timeSpent?: number) => {
      setCompletedChallenges((prev) => {
        const exists = prev.find((c) => c.challenge_id === challengeId);
        const next = exists
          ? prev.map((c) => (c.challenge_id === challengeId ? { ...c, points, time_spent: timeSpent ?? null } : c))
          : [...prev, { challenge_id: challengeId, points, time_spent: timeSpent ?? null }];
        writeLS(CHALLENGES_KEY, next);
        return next;
      });
    },
    []
  );

  const completedLessonIds = completedLessons.map((l) => l.lesson_id);
  const totalLessonPoints = completedLessons.length * 50;
  const totalChallengePoints = completedChallenges.reduce((sum, c) => sum + c.points, 0);

  return {
    loading,
    completedLessons,
    completedLessonIds,
    completedChallenges,
    isLessonCompleted,
    completeLesson,
    getChallengeProgress,
    completeChallenge,
    totalLessonPoints,
    totalChallengePoints,
    refetch: async () => {},
  };
}

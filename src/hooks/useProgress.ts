import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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

export function useProgress() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<LessonProgress[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<ChallengeProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setCompletedLessons([]);
      setCompletedChallenges([]);
      setLoading(false);
      return;
    }

    const [lessonsRes, challengesRes] = await Promise.all([
      supabase.from("lesson_progress").select("lesson_id, score, total").eq("user_id", user.id),
      supabase.from("challenge_progress").select("challenge_id, points, time_spent").eq("user_id", user.id),
    ]);

    if (lessonsRes.data) setCompletedLessons(lessonsRes.data);
    if (challengesRes.data) setCompletedChallenges(challengesRes.data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => completedLessons.some((l) => l.lesson_id === lessonId),
    [completedLessons]
  );

  const completeLesson = useCallback(
    async (lessonId: string, score: number, total: number) => {
      if (!user) return;
      const { error } = await supabase.from("lesson_progress").upsert(
        { user_id: user.id, lesson_id: lessonId, score, total },
        { onConflict: "user_id,lesson_id" }
      );
      if (!error) {
        setCompletedLessons((prev) => {
          const exists = prev.find((l) => l.lesson_id === lessonId);
          if (exists) return prev.map((l) => (l.lesson_id === lessonId ? { ...l, score, total } : l));
          return [...prev, { lesson_id: lessonId, score, total }];
        });
      }
      return error;
    },
    [user]
  );

  const getChallengeProgress = useCallback(
    (challengeId: string) => completedChallenges.find((c) => c.challenge_id === challengeId),
    [completedChallenges]
  );

  const completeChallenge = useCallback(
    async (challengeId: string, points: number, timeSpent?: number) => {
      if (!user) return;
      const { error } = await supabase.from("challenge_progress").upsert(
        { user_id: user.id, challenge_id: challengeId, points, time_spent: timeSpent ?? null },
        { onConflict: "user_id,challenge_id" }
      );
      if (!error) {
        setCompletedChallenges((prev) => {
          const exists = prev.find((c) => c.challenge_id === challengeId);
          if (exists) return prev.map((c) => (c.challenge_id === challengeId ? { ...c, points, time_spent: timeSpent ?? null } : c));
          return [...prev, { challenge_id: challengeId, points, time_spent: timeSpent ?? null }];
        });
      }
      return error;
    },
    [user]
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
    refetch: fetchProgress,
  };
}

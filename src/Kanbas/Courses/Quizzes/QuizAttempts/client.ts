// src/Kanbas/QuizAttempts/client.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export const findAttemptsByUser = async (quizId: string, userId: string) => {
  const response = await axios.get(
    `${API_BASE}/quizzes/${quizId}/attempts/${userId}`
  );
  return response.data;
};

export const findAttemptById = async (attemptId: string) => {
  const response = await axios.get(`${API_BASE}/attempts/${attemptId}`);
  return response.data;
};

export const createAttempt = async (quizId: string, attempt: any) => {
  const response = await axios.post(
    `${API_BASE}/quizzes/${quizId}/attempts`,
    attempt
  );
  return response.data;
};

export const updateAttempt = async (attemptId: string, attempt: any) => {
  const response = await axios.put(
    `${API_BASE}/attempts/${attemptId}`,
    attempt
  );
  return response.data;
};

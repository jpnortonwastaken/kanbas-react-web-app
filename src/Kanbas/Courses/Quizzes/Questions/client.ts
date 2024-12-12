// src/Kanbas/Questions/client.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export const findQuestionsByQuiz = async (quizId: string) => {
  const response = await axios.get(`${API_BASE}/quizzes/${quizId}/questions`);
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${API_BASE}/questions/${questionId}`);
  return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(
    `${API_BASE}/quizzes/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axios.put(
    `${API_BASE}/questions/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${API_BASE}/questions/${questionId}`);
  return response.data;
};

export const deleteQuestionsByQuiz = async (quizId: string) => {
  const response = await axios.delete(
    `${API_BASE}/quizzes/${quizId}/questions`
  );
  return response.data;
};

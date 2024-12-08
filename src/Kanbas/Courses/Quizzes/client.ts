import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${API_BASE}/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(
    `${API_BASE}/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

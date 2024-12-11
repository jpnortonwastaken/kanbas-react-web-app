// QuizAttemptView.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as attemptsClient from "./client";

interface AttemptWithAnswers {
  _id: string;
  userId: string;
  quizId: string;
  answers: {
    questionId: {
      _id: string;
      type: string;
      title: string;
      question: string;
      choices?: string[];
      correctAnswer: any;
    };
    answer: any;
    isCorrect: boolean;
  }[];
  score: number;
  startedAt: string;
  submittedAt: string;
}

export default function QuizAttemptView() {
  const { cid, qid, attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<AttemptWithAnswers | null>(null);

  useEffect(() => {
    const fetchAttempt = async () => {
      const data = await attemptsClient.findAttemptById(attemptId as string);
      setAttempt(data);
    };
    fetchAttempt();
  }, [attemptId]);

  const renderQuestion = (
    question: any,
    userAnswer: any,
    isCorrect: boolean
  ) => {
    switch (question.type) {
      case "MULTIPLE_CHOICE":
        return (
          <div
            className={`p-4 border rounded mb-4 ${
              isCorrect ? "bg-success-subtle" : "bg-danger-subtle"
            }`}
          >
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            {question.choices?.map((choice: string, index: number) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={userAnswer === index}
                  disabled
                />
                <label
                  className={`form-check-label ${
                    index === question.correctAnswer
                      ? "text-success fw-bold"
                      : ""
                  } ${userAnswer === index && !isCorrect ? "text-danger" : ""}`}
                >
                  {choice}
                </label>
              </div>
            ))}
          </div>
        );

      case "TRUE_FALSE":
        return (
          <div
            className={`p-4 border rounded mb-4 ${
              isCorrect ? "bg-success-subtle" : "bg-danger-subtle"
            }`}
          >
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            {[true, false].map((value) => (
              <div key={value.toString()} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={userAnswer === value}
                  disabled
                />
                <label
                  className={`form-check-label ${
                    value === question.correctAnswer
                      ? "text-success fw-bold"
                      : ""
                  } ${userAnswer === value && !isCorrect ? "text-danger" : ""}`}
                >
                  {value.toString()}
                </label>
              </div>
            ))}
          </div>
        );

      case "FILL_BLANK":
        return (
          <div
            className={`p-4 border rounded mb-4 ${
              isCorrect ? "bg-success-subtle" : "bg-danger-subtle"
            }`}
          >
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            <input
              type="text"
              className="form-control"
              value={userAnswer}
              disabled
            />
            <div className="mt-2">
              <small className="text-success">
                Correct answer(s):{" "}
                {Array.isArray(question.correctAnswer)
                  ? question.correctAnswer.join(", ")
                  : question.correctAnswer}
              </small>
            </div>
          </div>
        );
    }
  };

  if (!attempt) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quiz Attempt Review</h2>
        <div>
          <p className="mb-0">Score: {attempt.score}</p>
          <small className="text-muted">
            Submitted: {new Date(attempt.submittedAt).toLocaleString()}
          </small>
        </div>
      </div>

      {attempt.answers.map((answer) => (
        <div key={answer.questionId._id}>
          {renderQuestion(answer.questionId, answer.answer, answer.isCorrect)}
        </div>
      ))}

      <button
        className="btn btn-secondary mt-4"
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
      >
        Back to Quiz
      </button>
    </div>
  );
}

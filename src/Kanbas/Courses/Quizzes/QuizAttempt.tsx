// QuizAttempt.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import FacultyOnly from "../../Account/FacultyOnly";
import * as attemptsClient from "./QuizAttempts/client";

interface Answer {
  questionId: string;
  answer: string | number | boolean;
}

interface Question {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
  title: string;
  points: number;
  question: string;
  choices?: string[];
  correctAnswer: string | number | boolean;
}

export default function QuizAttempt() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const fetchQuestions = async () => {
    const fetchedQuestions = await questionsClient.findQuestionsByQuiz(
      qid as string
    );
    setQuestions(fetchedQuestions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  const handleAnswerChange = (
    questionId: string,
    answer: string | number | boolean
  ) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a
        );
      }
      return [...prev, { questionId, answer }];
    });
  };

  const renderQuestion = (question: Question) => {
    const savedAnswer = answers.find(
      (a) => a.questionId === question._id
    )?.answer;

    switch (question.type) {
      case "MULTIPLE_CHOICE":
        return (
          <div className="mb-4">
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            {question.choices?.map((choice: string, index: number) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`question-${question._id}`}
                  value={index}
                  checked={savedAnswer === index}
                  onChange={(e) =>
                    handleAnswerChange(question._id, Number(e.target.value))
                  }
                  disabled={showResults}
                />
                <label className="form-check-label">{choice}</label>
              </div>
            ))}
          </div>
        );

      case "TRUE_FALSE":
        return (
          <div className="mb-4">
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${question._id}`}
                value="true"
                checked={savedAnswer === true}
                onChange={() => handleAnswerChange(question._id, true)}
                disabled={showResults}
              />
              <label className="form-check-label">True</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${question._id}`}
                value="false"
                checked={savedAnswer === false}
                onChange={() => handleAnswerChange(question._id, false)}
                disabled={showResults}
              />
              <label className="form-check-label">False</label>
            </div>
          </div>
        );

      case "FILL_BLANK":
        return (
          <div className="mb-4">
            <h5>{question.title}</h5>
            <p>{question.question}</p>
            <input
              type="text"
              className="form-control"
              value={(savedAnswer as string) || ""}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              disabled={showResults}
            />
          </div>
        );
    }
  };

  const showOneQuestionAtTime = quiz?.settings?.oneQuestionAtTime;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const answersWithCorrectness = questions.map((question) => {
        const userAnswer = answers.find(
          (a) => a.questionId === question._id
        )?.answer;
        const isCorrect = (() => {
          switch (question.type) {
            case "MULTIPLE_CHOICE":
              return userAnswer === question.correctAnswer;
            case "TRUE_FALSE":
              return userAnswer === question.correctAnswer;
            case "FILL_BLANK":
              if (Array.isArray(question.correctAnswer)) {
                return question.correctAnswer.some(
                  (ans) =>
                    ans.toLowerCase() === (userAnswer as string)?.toLowerCase()
                );
              }
              return userAnswer === question.correctAnswer;
          }
        })();

        return {
          questionId: question._id,
          answer: userAnswer,
          isCorrect,
        };
      });

      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
      const earnedPoints = answersWithCorrectness.reduce(
        (sum, a) =>
          sum +
          (a.isCorrect
            ? questions.find((q) => q._id === a.questionId)?.points || 0
            : 0),
        0
      );
      const scorePercentage = Math.round((earnedPoints / totalPoints) * 100);

      const attempt = await attemptsClient.createAttempt(qid as string, {
        userId: currentUser._id,
        answers: answersWithCorrectness,
        score: scorePercentage,
        startedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        completed: true,
      });

      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempts/${attempt._id}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className={showOneQuestionAtTime ? "col-md-9" : "col-12"}>
          <div className="card">
            <div className="card-body">
              {showOneQuestionAtTime ? (
                <>
                  {questions[currentQuestionIndex] && (
                    <div className="question-container">
                      {renderQuestion(questions[currentQuestionIndex])}
                      <div className="d-flex justify-content-between mt-4">
                        <button
                          className="btn btn-secondary"
                          onClick={handlePrevious}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous
                        </button>
                        {currentQuestionIndex === questions.length - 1 ? (
                          <button
                            className="btn btn-success"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit Quiz"}
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {questions.map((question) => (
                    <div key={question._id} className="mb-4 pb-4 border-bottom">
                      {renderQuestion(question)}
                    </div>
                  ))}
                  <button
                    className="btn btn-success mt-4"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quiz"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation sidebar only for one-question-at-time mode */}
        {showOneQuestionAtTime && (
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">Questions</div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  {questions.map((question: Question, index) => (
                    <button
                      key={index}
                      className={`btn ${
                        currentQuestionIndex === index
                          ? "btn-primary"
                          : answers.find((a) => a.questionId === question._id)
                          ? "btn-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      Question {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

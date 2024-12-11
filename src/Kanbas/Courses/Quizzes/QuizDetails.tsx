import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import { setQuiz } from "./reducer";
import FacultyOnly from "../../Account/FacultyOnly";
import { formatDateTime } from "./utils";
import * as attemptsClient from "./QuizAttempts/client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [attempts, setAttempts] = useState<any[]>([]);

  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const fetchQuiz = async () => {
    const quiz = await quizzesClient.findQuizById(qid as string);
    dispatch(setQuiz([quiz]));
  };

  const fetchAttempts = async () => {
    if (isStudent && currentUser?._id) {
      const userAttempts = await attemptsClient.findAttemptsByUser(
        qid as string,
        currentUser._id
      );
      setAttempts(userAttempts);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  useEffect(() => {
    fetchAttempts();
  }, [qid, currentUser, isStudent]);

  const getAvailabilityStatus = () => {
    const now = new Date();
    const availableFrom = quiz.availableFrom
      ? new Date(quiz.availableFrom)
      : null;
    const availableUntil = quiz.availableUntil
      ? new Date(quiz.availableUntil)
      : null;

    if (!availableFrom) return null;

    if (now < availableFrom) {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    }

    if (availableUntil && now > availableUntil) {
      return "Closed";
    }

    if (now >= availableFrom && (!availableUntil || now <= availableUntil)) {
      return "Available";
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>
      <div className="text-muted mb-4">
        Availability: <span className="fw-bold">{getAvailabilityStatus()}</span>
      </div>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <FacultyOnly>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt`)
            }
          >
            Preview
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)
            }
          >
            Edit
          </button>
        </FacultyOnly>

        {isStudent && (
          <>
            {quiz.settings?.multipleAttempts ? (
              attempts.length < (quiz.settings?.maxAttempts || 1) ? (
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt`)
                  }
                >
                  Start Quiz
                </button>
              ) : (
                <p className="text-danger">
                  Maximum attempts ({quiz.settings.maxAttempts}) reached
                </p>
              )
            ) : (
              attempts.length === 0 && (
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/attempt`)
                  }
                >
                  Start Quiz
                </button>
              )
            )}
          </>
        )}
      </div>

      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-3 fw-bold">Quiz Type</div>
            <div className="col-9">{quiz.type || "GRADED_QUIZ"}</div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Points</div>
            <div className="col-9">{quiz.points || 0}</div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Assignment Group</div>
            <div className="col-9">{quiz.assignmentGroup || "Quizzes"}</div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Shuffle Answers</div>
            <div className="col-9">
              {quiz.settings?.shuffleAnswers ? "Yes" : "No"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Time Limit</div>
            <div className="col-9">
              {quiz.settings?.timeLimit || 20} Minutes
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Multiple Attempts</div>
            <div className="col-9">
              {quiz.settings?.multipleAttempts ? "Yes" : "No"}
            </div>
          </div>

          {quiz.settings?.multipleAttempts && (
            <div className="row mb-3">
              <div className="col-3 fw-bold">Allowed Attempts</div>
              <div className="col-9">{quiz.settings?.maxAttempts || 1}</div>
            </div>
          )}

          <div className="row mb-3">
            <div className="col-3 fw-bold">Show Correct Answers</div>
            <div className="col-9">
              {quiz.settings?.showCorrectAnswers ? "Yes" : "No"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Access Code</div>
            <div className="col-9">
              {quiz.settings?.accessCode ? quiz.settings.accessCode : "None"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">One Question at a Time</div>
            <div className="col-9">
              {quiz.settings?.oneQuestionAtTime ? "Yes" : "No"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Webcam Required</div>
            <div className="col-9">{quiz.webcamRequired ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Lock Questions</div>
            <div className="col-9">
              {quiz.lockQuestionsAfter ? "Yes" : "No"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Due Date</div>
            <div className="col-9">
              {quiz.dueDate ? formatDateTime(quiz.dueDate) : "None"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Available From</div>
            <div className="col-9">
              {quiz.availableFrom ? formatDateTime(quiz.availableFrom) : "None"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3 fw-bold">Available Until</div>
            <div className="col-9">
              {quiz.availableUntil
                ? formatDateTime(quiz.availableUntil)
                : "None"}
            </div>
          </div>
        </div>
      </div>

      {isStudent && (
        <div className="mt-5">
          <h3>Your Attempts</h3>
          {attempts.length === 0 ? (
            <p>No attempts yet</p>
          ) : (
            <div className="list-group">
              {attempts
                .sort(
                  (a, b) =>
                    new Date(b.submittedAt).getTime() -
                    new Date(a.submittedAt).getTime()
                )
                .map((attempt, index) => (
                  <button
                    key={attempt._id}
                    className="list-group-item list-group-item-action"
                    onClick={() =>
                      index === 0 &&
                      navigate(
                        `/Kanbas/Courses/${cid}/Quizzes/${qid}/attempts/${attempt._id}`
                      )
                    }
                    disabled={index !== 0}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">
                          {index === 0
                            ? `Score: ${attempt.score}`
                            : "Attempt completed"}
                        </h6>
                        <small className="text-muted">
                          Submitted: {formatDateTime(attempt.submittedAt)}
                        </small>
                      </div>
                      {index === 0 && (
                        <span className="badge bg-primary rounded-pill">
                          View Details
                        </span>
                      )}
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

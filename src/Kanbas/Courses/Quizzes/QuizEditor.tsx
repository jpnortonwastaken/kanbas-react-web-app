import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");

  const saveQuiz = async (shouldPublish = false) => {
    const updatedQuiz = {
      ...formData,
      _id: qid,
      // Keep existing published status unless explicitly publishing
      published: shouldPublish ? true : formData.published,
    };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const createQuizForCourse = async (shouldPublish = false) => {
    if (!cid) return;
    const newQuiz = {
      ...formData,
      courseId: cid,
      published: shouldPublish,
    };
    const quiz = await quizzesClient.createQuiz(cid, newQuiz);
    dispatch(addQuiz(quiz));
  };

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
  );

  const [formData, setFormData] = useState({
    title: "New Quiz",
    description: "",
    type: "GRADED_QUIZ",
    points: "100",
    assignmentGroup: "Quizzes",
    settings: {
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtTime: true,
      webcamRequired: false,
      lockQuestionsAfter: false,
    },
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    published: false,
  });

  useEffect(() => {
    if (quiz && qid !== "new") {
      setFormData(quiz);
    }
  }, [quiz, qid]);

  const handleSubmit = async (shouldPublish = false) => {
    try {
      if (qid === "new") {
        await createQuizForCourse(shouldPublish);
        navigate(
          shouldPublish
            ? `/Kanbas/Courses/${cid}/Quizzes`
            : `/Kanbas/Courses/${cid}/Quizzes/${qid}`
        );
      } else {
        await saveQuiz(shouldPublish);
        navigate(
          shouldPublish
            ? `/Kanbas/Courses/${cid}/Quizzes`
            : `/Kanbas/Courses/${cid}/Quizzes/${qid}`
        );
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <form className="mt-4">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quiz Type</label>
            <select
              className="form-control"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              type="number"
              className="form-control"
              value={formData.points}
              onChange={(e) =>
                setFormData({ ...formData, points: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Assignment Group</label>
            <select
              className="form-control"
              value={formData.assignmentGroup}
              onChange={(e) =>
                setFormData({ ...formData, assignmentGroup: e.target.value })
              }
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.settings.shuffleAnswers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    shuffleAnswers: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label">Shuffle Answers</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Time Limit (Minutes)</label>
            <input
              type="number"
              className="form-control"
              value={formData.settings.timeLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    timeLimit: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.settings.multipleAttempts}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    multipleAttempts: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label">Multiple Attempts</label>
          </div>

          {formData.settings.multipleAttempts && (
            <div className="mb-3">
              <label className="form-label">Maximum Attempts</label>
              <input
                type="number"
                className="form-control"
                value={formData.settings.maxAttempts}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    settings: {
                      ...formData.settings,
                      maxAttempts: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          )}

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.settings.showCorrectAnswers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    showCorrectAnswers: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label">Show Correct Answers</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Access Code</label>
            <input
              type="text"
              className="form-control"
              value={formData.settings.accessCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    accessCode: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.settings.oneQuestionAtTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    oneQuestionAtTime: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label">One Question at a Time</label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.settings.webcamRequired}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    webcamRequired: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label">Webcam Required</label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.settings.lockQuestionsAfter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  settings: {
                    ...formData.settings,
                    lockQuestionsAfter: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label">
              Lock Questions After Answering
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Available From</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.availableFrom}
              onChange={(e) =>
                setFormData({ ...formData, availableFrom: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Available Until</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.availableUntil}
              onChange={(e) =>
                setFormData({ ...formData, availableUntil: e.target.value })
              }
            />
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit(false)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleSubmit(true)}
            >
              Save & Publish
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {activeTab === "questions" && (
        <div>
          <h3>Questions Editor</h3>
        </div>
      )}
    </div>
  );
}

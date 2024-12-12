import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
};

interface Question {
  _id?: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
  title: string;
  points: number;
  question: string;
  choices?: string[];
  correctAnswer: string | number | boolean | string[];
}

const QuestionEditor = ({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) => {
  const [editData, setEditData] = useState(question);
  const [choices, setChoices] = useState(question.choices || [""]);

  const renderEditor = () => {
    switch (editData.type) {
      case "MULTIPLE_CHOICE":
        return (
          <>
            <div className="mb-3">
              <label>Choices</label>
              {choices.map((choice, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={editData.correctAnswer === index}
                    onChange={() =>
                      setEditData({ ...editData, correctAnswer: index })
                    }
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={choice}
                    onChange={(e) => {
                      const newChoices = [...choices];
                      newChoices[index] = e.target.value;
                      setChoices(newChoices);
                    }}
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      setChoices(choices.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="btn btn-secondary"
                onClick={() => setChoices([...choices, ""])}
              >
                Add Choice
              </button>
            </div>
          </>
        );

      case "TRUE_FALSE":
        return (
          <div className="mb-3">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={editData.correctAnswer === true}
                onChange={() =>
                  setEditData({ ...editData, correctAnswer: true })
                }
              />
              <label className="form-check-label">True</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={editData.correctAnswer === false}
                onChange={() =>
                  setEditData({ ...editData, correctAnswer: false })
                }
              />
              <label className="form-check-label">False</label>
            </div>
          </div>
        );

      case "FILL_BLANK":
        return (
          <div className="mb-3">
            <label>Correct Answers</label>
            {(editData.correctAnswer as string[]).map((answer, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [
                      ...(editData.correctAnswer as string[]),
                    ];
                    newAnswers[index] = e.target.value;
                    setEditData({ ...editData, correctAnswer: newAnswers });
                  }}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const newAnswers = (
                      editData.correctAnswer as string[]
                    ).filter((_, i) => i !== index);
                    setEditData({ ...editData, correctAnswer: newAnswers });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn btn-secondary"
              onClick={() =>
                setEditData({
                  ...editData,
                  correctAnswer: [...(editData.correctAnswer as string[]), ""],
                })
              }
            >
              Add Answer
            </button>
          </div>
        );
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="mb-3">
          <label>Question Type</label>
          <select
            className="form-control"
            value={editData.type}
            onChange={(e) =>
              setEditData({
                ...editData,
                type: e.target.value as Question["type"],
                correctAnswer:
                  e.target.value === "FILL_BLANK"
                    ? [""]
                    : e.target.value === "TRUE_FALSE"
                    ? false
                    : 0,
              })
            }
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_BLANK">Fill in the Blank</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Points</label>
          <input
            type="number"
            className="form-control"
            value={editData.points}
            onChange={(e) =>
              setEditData({ ...editData, points: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <label>Question</label>
          <textarea
            className="form-control"
            value={editData.question}
            onChange={(e) =>
              setEditData({ ...editData, question: e.target.value })
            }
          />
        </div>

        {renderEditor()}

        <div className="d-flex gap-2">
          <button className="btn btn-danger" onClick={onCancel}>
            Delete Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const [questions, setQuestions] = useState<Question[]>([]);

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
      setFormData({
        ...quiz,
        dueDate: formatDateForInput(quiz.dueDate),
        availableFrom: formatDateForInput(quiz.availableFrom),
        availableUntil: formatDateForInput(quiz.availableUntil),
      });
    }
  }, [quiz, qid]);

  const handleSubmit = async (shouldPublish = false) => {
    try {
      const newQuiz = {
        ...formData,
        courseId: cid,
        published: shouldPublish,
        questions, // Add questions to quiz data
      };
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
          <div className="d-flex justify-content-between mb-4">
            <h3>Questions</h3>
            <button
              className="btn btn-primary"
              onClick={() => {
                const newQuestion: Question = {
                  type: "MULTIPLE_CHOICE",
                  title: "New Question",
                  points: 1,
                  question: "",
                  choices: [""],
                  correctAnswer: 0,
                };
                setQuestions([...questions, newQuestion]);
              }}
            >
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <QuestionEditor
              key={index}
              question={question}
              onSave={(updatedQuestion) => {
                const newQuestions = [...questions];
                newQuestions[index] = updatedQuestion;
                setQuestions(newQuestions);
              }}
              onCancel={() => {
                const newQuestions = [...questions];
                newQuestions.splice(index, 1);
                setQuestions(newQuestions);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

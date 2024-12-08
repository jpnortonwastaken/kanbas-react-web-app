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

  const saveQuiz = async () => {
    const updatedQuiz = {
      ...formData,
      _id: qid,
    };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = {
      ...formData,
      courseId: cid,
    };
    const quiz = await quizzesClient.createQuiz(cid, newQuiz);
    dispatch(addQuiz(quiz));
  };

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "GRADED_QUIZ",
    points: "100",
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

  const handleSubmit = async () => {
    if (qid === "new") {
      await createQuizForCourse();
    } else {
      await saveQuiz();
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">
          <b>Quiz Name</b>
        </label>
        <input
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={6}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
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
        <div className="col-md-6">
          <label className="form-label">Quiz Type</label>
          <select
            className="form-control"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="SURVEY">Survey</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
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
        <div className="col-md-6">
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
      </div>

      <hr />

      <div className="d-flex justify-content-end">
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes`}
          className="btn btn-light me-2"
        >
          Cancel
        </Link>
        <button onClick={handleSubmit} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}

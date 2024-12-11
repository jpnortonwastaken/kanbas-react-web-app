import { IoEllipsisVertical, IoCloseCircle } from "react-icons/io5";
import { FaTrash, FaPencil } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";

export default function QuizControlButtons({
  quizId,
  courseId,
  quiz,
  deleteQuiz,
  togglePublish,
}: {
  quizId: string;
  courseId: string;
  quiz: any;
  deleteQuiz: (id: string) => void;
  togglePublish: (quiz: any) => void;
}) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-link p-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <IoEllipsisVertical className="fs-4" />
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`}
            className="dropdown-item"
          >
            <FaPencil className="me-2" />
            Edit
          </Link>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => deleteQuiz(quizId)}>
            <FaTrash className="me-2" />
            Delete
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => togglePublish(quiz)}>
            {quiz.published ? (
              <>
                <IoCloseCircle className="me-2" /> Unpublish
              </>
            ) : (
              <>
                <GreenCheckmark /> Publish
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
}

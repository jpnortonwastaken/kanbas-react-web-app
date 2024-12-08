import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";

export default function QuizControlButtons({
  quizId,
  courseId,
  deleteQuiz,
}: {
  quizId: string;
  courseId: string;
  deleteQuiz: (id: string) => void;
}) {
  return (
    <div className="float-end">
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}>
        <FaPencil className="text-primary me-3" />
      </Link>
      <FaTrash
        className="text-danger me-3"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this quiz?")) {
            deleteQuiz(quizId);
          }
        }}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

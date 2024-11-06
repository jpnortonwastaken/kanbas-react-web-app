// AssignmentControlButtons.tsx
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";

export default function AssignmentControlButtons({
  assignmentId,
  courseId,
  deleteAssignment,
}: {
  assignmentId: string;
  courseId: string;
  deleteAssignment: (id: string) => void;
}) {
  return (
    <div className="float-end">
      <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignmentId}`}>
        <FaPencil className="text-primary me-3" />
      </Link>
      <FaTrash
        className="text-danger me-3"
        onClick={() => {
          if (
            window.confirm("Are you sure you want to delete this assignment?")
          ) {
            deleteAssignment(assignmentId);
          }
        }}
        style={{ cursor: "pointer" }}
      />
      <GreenCheckmark />
      <FaPlus className="mx-3 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

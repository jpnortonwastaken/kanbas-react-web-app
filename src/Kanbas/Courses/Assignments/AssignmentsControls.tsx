// AssignmentsControls.tsx
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark";
import FacultyOnly from "../../Account/FacultyOnly";

export default function AssignmentsControls({ cid }: { cid: string }) {
  return (
    <div
      id="wd-assignments-controls"
      className="d-flex align-items-center gap-2 mb-3"
    >
      <div className="input-group flex-grow-1">
        <span className="input-group-text bg-white border-end-0">
          <FaSearch />
        </span>
        <input
          id="wd-search-assignment"
          className="form-control border-start-0"
          placeholder="Search for Assignment"
        />
      </div>
      <FacultyOnly>
        <div className="dropdown d-flex">
          <button
            className="btn btn-secondary dropdown-toggle h-100 py-2"
            type="button"
            data-bs-toggle="dropdown"
          >
            <GreenCheckmark />
            Publish All
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <GreenCheckmark />
                Publish all assignments
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <GreenCheckmark />
                Unpublish all assignments
              </a>
            </li>
          </ul>
        </div>

        <Link
          to={`/Kanbas/Courses/${cid}/Assignments/new`}
          id="wd-add-assignment"
          className="btn btn-danger py-2 d-flex align-items-center white-space-nowrap"
        >
          <FaPlus className="me-2" />
          Assignment
        </Link>
      </FacultyOnly>
    </div>
  );
}

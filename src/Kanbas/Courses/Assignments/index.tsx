import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaSearch, FaCaretDown, FaEdit } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
  return (
    <div>
      <div className="d-flex align-items-stretch mb-4">
        <div className="input-group me-2">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>
        <button
          id="wd-add-assignment-group"
          className="btn btn-secondary me-2 d-flex align-items-center"
        >
          <FaPlus className="me-1" />
          Group
        </button>
        <button
          id="wd-add-assignment"
          className="btn btn-danger d-flex align-items-center"
        >
          <FaPlus className="me-1" />
          Assignment
        </button>
      </div>

      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div
            className="wd-title p-3 ps-2 d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2 fs-4" />
              ASSIGNMENTS
            </div>
            <div className="d-flex align-items-center">
              <div
                className="px-2 py-1 me-2"
                style={{
                  border: "1px solid gray",
                  borderRadius: "9999px",
                }}
              >
                40% of Total
              </div>
              <FaPlus className="mx-3 fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
                <FaEdit className="ms-2 fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <a
                  className="wd-assignment-link text-decoration-none fw-bold text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/111"
                >
                  A1 - ENV + HTML
                </a>
                <p className="wd-assignment-description mb-0">
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100pts
                </p>
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
                <FaEdit className="ms-2 fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <a
                  className="wd-assignment-link text-decoration-none fw-bold text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/222"
                >
                  A2 - CSS + BOOTSTRAP
                </a>
                <p className="wd-assignment-description mb-0">
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100pts
                </p>
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
                <FaEdit className="ms-2 fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <a
                  className="wd-assignment-link text-decoration-none fw-bold text-dark"
                  href="#/Kanbas/Courses/1234/Assignments/333"
                >
                  A3 - JAVASCRIPT + REACT
                </a>
                <p className="wd-assignment-description mb-0">
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100pts
                </p>
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

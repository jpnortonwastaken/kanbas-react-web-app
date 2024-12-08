import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setAssignment, deleteAssignment } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import FacultyOnly from "../../Account/FacultyOnly";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector((state: any) =>
    state.assignmentsReducer.assignments.filter(
      (assignment: any) => assignment.course === cid
    )
  );
  const dispatch = useDispatch();
  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignment(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="wd-assignments">
      <FacultyOnly>
        <AssignmentsControls cid={cid || ""} />
      </FacultyOnly>
      <br /> {/* Keep just one br for minimal spacing */}
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
                style={{ border: "1px solid gray", borderRadius: "9999px" }}
              >
                40% of Total
              </div>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {assignments.map((assignment: any) => (
              <li
                key={assignment._id}
                className="wd-lesson list-group-item p-3 ps-1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <div>
                      <div className="fw-bold">{assignment.title}</div>
                      <div className="text-muted">
                        <span className="text-danger">Multiple Modules</span> |{" "}
                        <b>Not available until</b> {assignment.available_date} |{" "}
                        <b>Due</b> {assignment.due_date} | {assignment.points}
                        pts
                      </div>
                    </div>
                  </div>
                  <FacultyOnly>
                    <AssignmentControlButtons
                      assignmentId={assignment._id}
                      courseId={cid || ""}
                      deleteAssignment={(assignmentId) =>
                        removeAssignment(assignmentId)
                      }
                    />
                  </FacultyOnly>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

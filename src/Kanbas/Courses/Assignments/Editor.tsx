import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveAssignment = async () => {
    const updatedAssignment = {
      ...formData,
      _id: aid,
    };

    await assignmentsClient.updateAssignment(updatedAssignment);
    dispatch(updateAssignment(updatedAssignment));
  };

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      title: formData.title,
      description: formData.description,
      points: formData.points,
      due_date: formData.due_date,
      available_date: formData.available_date,
      course: cid,
    };
    const assignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );
    dispatch(addAssignment(assignment));
  };

  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find(
      (assignment: any) => assignment._id === aid
    )
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "100",
    due_date: "",
    available_date: "",
    available_until: "2024-05-28T12:00",
    course: cid,
  });

  useEffect(() => {
    if (assignment && aid !== "new") {
      setFormData(assignment);
    }
  }, [assignment, aid]);

  const handleSubmit = async () => {
    if (aid === "new") {
      //dispatch(addAssignment(formData));
      await createAssignmentForCourse();
    } else {
      await saveAssignment();
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          <b>Assignment Name</b>
        </label>
        <input
          id="wd-name"
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
          rows={6}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="row mb-3 align-items-center">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-md-9">
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={formData.points}
            onChange={(e) =>
              setFormData({ ...formData, points: e.target.value })
            }
          />
        </div>
      </div>

      {/* Assignment dates section */}
      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label className="form-label">Dates</label>
        </div>
        <div className="col-md-9">
          <div className="mb-3">
            <label htmlFor="wd-due-date" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="wd-due-date"
              className="form-control"
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="wd-available-from" className="form-label">
                Available from
              </label>
              <input
                type="datetime-local"
                id="wd-available-from"
                className="form-control"
                value={formData.available_date}
                onChange={(e) =>
                  setFormData({ ...formData, available_date: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="wd-available-until" className="form-label">
                Until
              </label>
              <input
                type="datetime-local"
                id="wd-available-until"
                className="form-control"
                value={formData.available_until}
                onChange={(e) =>
                  setFormData({ ...formData, available_until: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end">
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
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

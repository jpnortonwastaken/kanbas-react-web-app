// src/Kanbas/Dashboard/index.tsx
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as db from "./Database";
import FacultyOnly from "./Account/FacultyOnly";
import StudentsOnly from "./Account/StudentsOnly";
import { toggleShowAllCourses, enroll, unenroll } from "./enrollmentsReducer";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, showAllCourses } = useSelector(
    (state: any) => state.enrollmentsReducer
  );

  const enrolledCourseIds = enrollments
    .filter((e: any) => e.user === currentUser?._id)
    .map((e: any) => e.course);

  const displayedCourses =
    currentUser?.role === "STUDENT" && !showAllCourses
      ? courses.filter((c) => enrolledCourseIds.includes(c._id))
      : courses;

  const handleEnrollToggle = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (enrolledCourseIds.includes(courseId)) {
      dispatch(unenroll({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enroll({ userId: currentUser._id, courseId }));
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <StudentsOnly>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? "Show Enrolled" : "Show All Courses"}
          </button>
        </StudentsOnly>
      </div>
      <hr />
      <FacultyOnly>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </FacultyOnly>
      <hr />
      <h2 id="wd-dashboard-published">
        {currentUser?.role === "STUDENT" && !showAllCourses
          ? "Enrolled Courses"
          : "Published Courses"}{" "}
        ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={
                    currentUser?.role === "STUDENT" &&
                    !enrolledCourseIds.includes(course._id)
                      ? "/Kanbas/Dashboard"
                      : `/Kanbas/Courses/${course._id}/Home`
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                    alt="Course"
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <StudentsOnly>
                      <button
                        onClick={(e) => handleEnrollToggle(course._id, e)}
                        className={`btn ${
                          enrolledCourseIds.includes(course._id)
                            ? "btn-danger"
                            : "btn-success"
                        }`}
                      >
                        {enrolledCourseIds.includes(course._id)
                          ? "Unenroll"
                          : "Enroll"}
                      </button>
                    </StudentsOnly>
                    <FacultyOnly>
                      <button className="btn btn-primary">Go</button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                    </FacultyOnly>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

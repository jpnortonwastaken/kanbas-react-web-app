import { Link, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
    const location = useLocation();

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link
                id="wd-course-home-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Home") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Home"
            >
                Home
            </Link><br />

            <Link
                id="wd-course-modules-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Modules") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Modules"
            >
                Modules
            </Link><br />

            <Link
                id="wd-course-piazza-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Piazza") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Piazza"
            >
                Piazza
            </Link><br />

            <Link
                id="wd-course-zoom-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Zoom") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Zoom"
            >
                Zoom
            </Link><br />

            <Link
                id="wd-course-assignments-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Assignments") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Assignments"
            >
                Assignments
            </Link><br />

            <Link
                id="wd-course-quizzes-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Quizzes") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Quizzes"
            >
                Quizzes
            </Link><br />

            <Link
                id="wd-course-grades-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/Grades") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/Grades"
            >
                Grades
            </Link><br />

            <Link
                id="wd-course-people-link"
                className={`list-group-item border border-0 ${location.pathname.includes("/Kanbas/Courses/") && location.pathname.includes("/People") ? "active" : "text-danger"}`}
                to="/Kanbas/Courses/1234/People"
            >
                People
            </Link><br />
        </div>
    );
}

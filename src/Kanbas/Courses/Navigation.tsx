import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const location = useLocation();
  const { cid } = useParams(); // Get the course ID from the URL params

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const lowerCaseLink = link.toLowerCase(); // Convert the link name to lowercase for the URL
        const isActive =
          location.pathname.includes(`/Kanbas/Courses/${cid}/`) &&
          location.pathname.includes(`/${link}`);

        return (
          <Link
            key={link}
            id={`wd-course-${lowerCaseLink}-link`}
            className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`}
            to={`/Kanbas/Courses/${cid}/${link}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}

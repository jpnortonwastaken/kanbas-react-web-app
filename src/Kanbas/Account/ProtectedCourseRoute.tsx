import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const isEnrolled =
    currentUser?.role === "FACULTY" ||
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === cid
    );

  if (!isEnrolled) {
    return <Navigate to="/Kanbas/Dashboard" />;
  }

  return children;
}

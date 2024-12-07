import { useSelector } from "react-redux";
export default function StudentsOrFacultyOnly({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser?.role === "FACULTY" || currentUser?.role === "STUDENT") {
    return children;
  }

  return null;
}

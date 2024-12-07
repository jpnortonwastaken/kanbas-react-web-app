import { useSelector } from "react-redux";
export default function StudentsOnly({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser?.role === "STUDENT") {
    // If the user is faculty, render the children components
    return children;
  }

  // If the user is not faculty, return null to hide the children
  return null;
}

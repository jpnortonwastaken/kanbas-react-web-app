import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function AccountNavigation() {
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [links, setLinks] = useState(
    currentUser ? ["Profile"] : ["Signin", "Signup"]
  );

  useEffect(() => {
    setLinks(currentUser ? ["Profile"] : ["Signin", "Signup"]);
  }, [currentUser]);

  return (
    <div id="wd-account-navigation" className="list-group wd fs-5 rounded-0">
      {links.includes("Signin") && (
        <Link
          to="/Kanbas/Account/Signin"
          className={`list-group-item border border-0 ${
            location.pathname === "/Kanbas/Account/Signin"
              ? "active"
              : "text-danger"
          }`}
        >
          Signin
        </Link>
      )}
      {links.includes("Signup") && (
        <Link
          to="/Kanbas/Account/Signup"
          className={`list-group-item border border-0 ${
            location.pathname === "/Kanbas/Account/Signup"
              ? "active"
              : "text-danger"
          }`}
        >
          Signup
        </Link>
      )}
      {links.includes("Profile") && (
        <Link
          to="/Kanbas/Account/Profile"
          className={`list-group-item border border-0 ${
            location.pathname === "/Kanbas/Account/Profile"
              ? "active"
              : "text-danger"
          }`}
        >
          Profile
        </Link>
      )}
    </div>
  );
}

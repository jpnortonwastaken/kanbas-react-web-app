import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      <div className="mb-3">
        <label htmlFor="wd-username" className="form-label">
          Username
        </label>
        <input
          id="wd-username"
          defaultValue={profile.username}
          className="form-control"
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-password" className="form-label">
          Password
        </label>
        <input
          id="wd-password"
          defaultValue={profile.password}
          className="form-control"
          type="password"
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-firstname" className="form-label">
          First Name
        </label>
        <input
          id="wd-firstname"
          defaultValue={profile.firstName}
          className="form-control"
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-lastname" className="form-label">
          Last Name
        </label>
        <input
          id="wd-lastname"
          defaultValue={profile.lastName}
          className="form-control"
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-dob" className="form-label">
          Date of Birth
        </label>
        <input
          id="wd-dob"
          defaultValue={profile.dob}
          className="form-control"
          type="date"
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-email" className="form-label">
          Email
        </label>
        <input
          id="wd-email"
          defaultValue={profile.email}
          className="form-control"
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-role" className="form-label">
          Role
        </label>
        <select
          id="wd-role"
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className="form-select"
          value={profile.role}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
        Update
      </button>
      <button
        onClick={signout}
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Sign out
      </button>
    </div>
  );
}

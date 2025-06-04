import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
export default function Layout() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
        {/* <Link to="/home" className="font-bold text-xl">
          LMS
        </Link> */}
        <h1 className="text-xl">Praveen Nair</h1>
        <div className="space-x-3">
          {user?.token ? (
            <>
              {/* <Link to="/courses">Courses</Link> */}
              <Link to="/home">Home</Link>
              {user.role === "admin" && (
                <>
                  <Link to="admin">Admin</Link>
                  {/* <Link to="/admin/dashboard">Admin Dashboard</Link> */}
                  {/* <Link to="/admin/courses/add">Add Course</Link> */}
                </>
              )}
              <Link to="message">Message</Link>
              <Link to="profile">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <div className="min-h-screen bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}

import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <div className="text-center text-xl p-3">
        <Link to="/admin/users">Users</Link>
      </div>
      <div className="text-center">
        <Outlet />
      </div>
    </div>
  );
}

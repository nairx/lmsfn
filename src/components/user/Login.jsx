import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const url = `${API}/api/users/login`;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setMsg("Please wait...");
      const res = await axios.post(url, user);
      if (res.status === 200) {
        setUser(res.data);
        Navigate("/home");
      } else {
        setMsg(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-evenly flex-wrap  w-full">
   
      <div className="m-5 p-5">
        <h1 className="text-3xl mb-5 text-blue-950">Welcome back!</h1>
        <h2 className=" text-blue-950 text-xl">
          Access your class and continue building awesome things.
        </h2>
      </div>
      <div className="m-5 p-5 bg-white rounded-lg w-96">
        <p className="text-red-900 text-lg">{msg}</p>
        <form onSubmit={handleSubmit}>
          <p>
            <input
              className="w-full rounded-sm p-3 mb-3"
              placeholder="Roll Number"
              type="text"
              required
              autoFocus
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></input>
          </p>
          <p>
            <input
              required
              className="w-full rounded-sm p-3 mb-3"
              placeholder="Password"
              type="password"
              onChange={(e) => setUser({ ...user, pass: e.target.value })}
            ></input>
          </p>
          <p>
            <button className="w-full rounded-sm text-white p-3 mb-3 bg-blue-900">
              Login
            </button>
          </p>
        </form>

        <p className="mt-5">
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

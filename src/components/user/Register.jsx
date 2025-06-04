import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { user, setUser } = useContext(AuthContext);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const addUser = async (e) => {
    e.preventDefault()
    const url = `${API}/api/users/register/`;
    const res = await axios.post(url, user);
    setUser(res.data);
    Navigate("/");
  };
  return (
    <div className="flex flex-wrap justify-center">
      <div className="mt-5 bg-gray-100 p-3 w-96 rounded-lg">
        <h2 className="text-2xl">Create Account</h2>
        <form onSubmit={addUser}>
          <p>
            <input
               className="w-full bg-white rounded-lg mt-5 p-1"
              placeholder="First Name" maxLength={14} required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            ></input>
          </p>
          <p>
            <input
              className="w-full bg-white rounded-lg mt-5 p-1"
              placeholder="Email address or roll number" required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></input>
          </p>
          <p>
            <input
              className="w-full bg-white rounded-lg mt-5 p-1"
              type="password"
              placeholder="New password" required
              onChange={(e) => setUser({ ...user, pass: e.target.value })}
            ></input>
          </p>
          <p>
            <button className="bg-blue-900 font-bold text-white w-full p-1 rounded-lg mt-5" >
              Submit
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { user, setUser } = useContext(AuthContext);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const addUser = async () => {
    const url = `${API}/api/users/register/`;
    const res = await axios.post(url, user);
    setUser(res.data);
    Navigate("/");
  };
  return (
    <div>
      <h2>Create Account</h2>
      <div>
        <p>
          <input
            className="App-Signup-Form-Control"
            placeholder="First Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          ></input>
        </p>
        <p>
          <input
            className="App-Signup-Form-Control"
            placeholder="Email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          ></input>
        </p>
        <p>
          <input
            className="App-Signup-Form-Control"
            type="password"
            placeholder="New password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          ></input>
        </p>
        <p>
          <button className="App-Signup-Form-Control" onClick={addUser}>
            Submit
          </button>
        </p>
      </div>
    </div>
  );
}

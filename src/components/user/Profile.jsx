import React, { Suspense } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [msg, setMsg] = useState();
  const [message, setMessage] = useState();
  const API = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const fetchProfile = () => {
    const url = `${API}/api/users/${user.id}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleSubmit = async () => {
    setMsg("loading");
    try {
      const url = `${API}/api/users/${user.id}`;
      const res = await axios.patch(url, user, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchProfile();
      setMsg("");
    } catch (err) {
      console.log(err);
      setMsg("Something went wrong");
    }
  };

  const handleSend = async () => {
    setMsg("loading");
    const url = `${API}/api/users/${user.id}`;
    await axios.patch(
      url,
      { message, updatedBy: user.role },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setMsg("Message sent sucessfully");
    fetchProfile();
    setMessage("");
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-white  p-5 w-96 m-5  text-blue-950 rounded-3xl">
        <div className="flex justify-between">
          <div className="text-xl">My Profile</div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <hr />

        {msg === "loading" ? (
          <div>Please wait...</div>
        ) : (
          <>
            <p className="mt-5 bg-gray-100 p-3 rounded-lg">
              <span>Name:</span>
              <br></br>
              <input
                className="w-full bg-white rounded-lg p-1"
                maxLength={14}
                defaultValue={data.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </p>
            {/* <p className="mt-3">
          Username:<br></br>
          <input className="w-full text-gray-300 rounded-sm"
            disabled
            defaultValue={data.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </p> */}
            <p className="mt-5 bg-gray-100 p-3 rounded-lg">
              <span>Password:</span>
              <br></br>
              <input
                className="w-full bg-white rounded-lg p-1"
                maxLength={21}
                type="password"
                defaultValue="123456789"
                onChange={(e) => setUser({ ...user, pass: e.target.value })}
              />
            </p>
            <p className="mt-5 bg-gray-100 p-3 rounded-lg">
              <span>Github username (Example: john27):</span>
              <br></br>
              <input
                className="w-full bg-white rounded-lg p-1"
                maxLength={30}
                defaultValue={data.ghUser}
                onChange={(e) => setUser({ ...user, ghUser: e.target.value })}
              />
            </p>
            <p className="mt-5">
              <button
                className="bg-blue-900 font-bold text-white w-full p-1 rounded-lg"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </p>
          </>
        )}
      </div>

      <div className="bg-white p-5 w-96 m-5 rounded-3xl">
        <div className="text-xl">Messaging</div>
        <hr />
        {msg === "loading" ? (
          <div className="text-lg p-20 h-full mt-5 text-red-900">
            Please wait...
          </div>
        ) : (
          <>
            <p className="mt-5 bg-gray-100 p-3 rounded-lg">
              Last Message:<br></br>
              <span>{data.message}</span>
            </p>
            <p className="mt-5 bg-gray-100 p-3 rounded-lg">
              {/* Send new message:<br></br> */}
              <input
                className="w-full bg-white rounded-lg p-1"
                maxLength={30}
                defaultValue={message}
                placeholder="Enter new message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="mt-5">
                <button
                  className="bg-blue-900 font-bold text-white w-full p-1 rounded-lg"
                  onClick={handleSend}
                >
                  Send message
                </button>
              </p>
              {/* <Link to="/message">Send Message</Link> */}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

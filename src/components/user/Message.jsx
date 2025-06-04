import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
export default function Message() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [msg, setMsg] = useState();
  const [message, setMessage] = useState();
  const API = import.meta.env.VITE_API_URL;

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
      <div className="bg-white p-5 w-96 m-5 rounded-3xl">
        <div className="text-xl">Messaging</div>
        <hr />
        {msg === "loading" ? (
          <div className="text-lg p-10 h-full mt-3 text-red-900">
            Please wait...
          </div>
        ) : (
          <>
            <p className="mt-5 bg-gray-100 p-3 rounded-lg">
              Last Message:<br></br>
              <span>{data.message}</span>
            </p>
            <div className="mt-5 bg-gray-100 p-3 rounded-lg">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

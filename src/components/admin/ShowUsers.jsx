import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function ShowUsers() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [newUser,setNewUser] = useState({})
  const [userObj, setUserObj] = useState({});

  const [batch, setBatch] = useState();
  const [msg, setMsg] = useState();
  const API = import.meta.env.VITE_API_URL;

  const addUser = async () => {
    try {
      const url = `${API}/api/users/`;
      await axios.post(url, newUser, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = () => {
    batch !== "" &&
      fetch(`${API}/api/users/batch/${batch}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.log(err));
  };

  const fetchStaff = () => {
    batch !== "" &&
      fetch(`${API}/api/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.log(err));
  };

  const toggleActive = async (id,active) => {
try {
      const url = `${API}/api/users/${id}`;
      const res = await axios.patch(url, {active:!active}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      //setMsg("Data updated successfully - ");
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  }

  const updateUser = async (id) => {
    try {
      const url = `${API}/api/users/${id}`;
      const res = await axios.patch(url, userObj, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      //setMsg("Data updated successfully - ");
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const url = `${API}/api/users/${id}`;
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      //setMsg("Data updated successfully - ");
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => fetchUsers(), []);
  return (
    <div className="m-5 bg-white">
      <div className="m-5">
        {/* <p>
          <input
            placeholder="Enter Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          ></input>
        </p>
        <p>
          <input
            type="text"
            placeholder="GH User"
            onChange={(e) => setUser({ ...user, ghUser: e.target.value })}
          ></input>
        </p>
        <p>
          <input
            type="text"
            placeholder="Batch"
            onChange={(e) => setUser({ ...user, batch: e.target.value })}
          ></input>
        </p> */}
        <p>
          <input
            placeholder="Email address"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          ></input>

          <input
            type="password"
            placeholder="New password"
            onChange={(e) => setNewUser({ ...newUser, pass: e.target.value })}
          ></input>

          <input size={5}
            type="text"
            placeholder="Batch"
            onChange={(e) => setNewUser({ ...newUser, batch: e.target.value })}
          ></input>

          <input
            type="text"
            placeholder="Active"
            onChange={(e) => setNewUser({ ...newUser, active: e.target.value })}
          ></input>

          <button onClick={addUser}>Add</button>
        </p>
      </div>
<hr />
      <div className="m-5">
        <p>
          <input
            type="text"
            className="m-2 bg-blue-200 p-2 rounded-md"
            placeholder="Batch Id"
            onChange={(e) => setBatch(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="m-2 bg-blue-500 p-2 text-white rounded-md"
          >
            Fetch Students
          </button>
          <button
            className="m-2 bg-green-500 p-2 text-white rounded-md"
            onClick={fetchStaff}
          >
            Fetch Staff
          </button>
        </p>
      </div>
      <div className="m-5">
        {users &&
          users.map((user) => (
            <li key={user._id} className="list-decimal">
              {/* <Link href={`/admin/users/${user._id}`}>{user.name}</Link> */}
              {/* &nbsp;|&nbsp; */}
              <input
                type="text"
                defaultValue={user.email}
                onChange={(e) =>
                  setUserObj({ ...userObj, email: e.target.value })
                }
              />

              <input
                type="text"
                defaultValue={user.name}
                onChange={(e) =>
                  setUserObj({ ...userObj, name: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                onChange={(e) =>
                  setUserObj({ ...userObj, pass: e.target.value })
                }
              />

              <input
                type="text"
                defaultValue={user.batch}
                onChange={(e) =>
                  setUserObj({ ...userObj, batch: e.target.value })
                }
              />

              <input
                type="text"
                defaultValue={user.role}
                onChange={(e) =>
                  setUserObj({ ...userObj, role: e.target.value })
                }
              />

              {/* <input
                type="text"
                defaultValue={user.active}
                onChange={(e) =>
                  setUserObj({ ...userObj, active: e.target.value })
                }
              /> */}
              {/* &nbsp;|&nbsp;
              {user.ghUser}
              &nbsp;|&nbsp;
              {user.score}*/}
              {/* &nbsp;|&nbsp; 
              {user.active ? "Active" : "Inactive"} */}
              {/* &nbsp;|&nbsp;
              {user.updatedAt} */}

              <button className='m-1 p-1 border-1 bg-green-700 text-white rounded-sm' onClick={() => toggleActive(user._id, user.active)}>
                {user.active ? "Deactivate" : "Activate"}
              </button>
              <button
                className="m-1 p-1 text-white rounded-sm bg-green-700"
                onClick={() => updateUser(user._id)}
              >
                Update
              </button>
              <button
                className="m-1 p-1 text-white rounded-sm bg-green-700"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
      </div>
    </div>
  );
}

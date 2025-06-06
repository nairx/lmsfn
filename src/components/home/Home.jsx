import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// function LastUpdate(props) {
//   const updatedAt = new Date(props.dt);
//   const diffInMs = Date.now() - updatedAt.getTime();
//   const diffInMinutes = Math.floor(diffInMs / 60000);
//   return diffInMinutes;
// }

export default function Home() {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState({});
  const [students, setStudents] = useState([]);
  const studentRef = useRef([]);
  const [error, setError] = useState();
  const [batch, setBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useContext(AuthContext);

  const API = import.meta.env.VITE_API_URL;

  function LastUpdated(dt) {
    const updatedAt = new Date(dt);
    const diffInMs = Date.now() - updatedAt.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    return diffInMinutes;
  }

  const dispStudents = () => {
    if (user.role !== "user1") {
      const batches = user.batch.split(",");
      if (batches.length === 1) {
        setBatch(data.batch);
      }
      setBatches(batches);
    }
    // const url = `${API}/api/users/batch/${batch}`;
    // fetch(url).then((res) =>
    //   res.json().then((data) => {
    //     setData(data);
    //   })
    // );
  };

  const showStudents = () => {
    // const url = `/api/courses/students/${batch}`;
    const url = `${API}/api/users/batch/${batch}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        const updatedAt = new Date(data.updatedAt);
        const diffInMs = Date.now() - updatedAt.getTime();
        const diffInMinutes = Math.floor(diffInMs / 60000);
        setLastUpdate(diffInMinutes);
        setStudents(data);
      })
    );
  };
  useEffect(() => {
    // console.log(user)
    dispStudents();
  }, []);

  useEffect(() => {
    batch === "" ? setStudents(null) : showStudents();
  }, [batch]);

  // useEffect(() => {
  //   batchEmail !== null &&
  //     setFilteredData(
  //       data.batch.filter((value) => value.batchId === batchEmail)
  //     );
  // }, [batchEmail,data]);

  const handleClick = async (index, id) => {
    // studentRef.current[index].style.backgroundColor = "pink";
    const url = `${API}/api/users/${id}`;
    await axios.patch(
      url,
      { message: "Reviewing", updatedBy: user.role },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    // setError(new Date());
    showStudents();
  };
  // const addStudent = async () => {
  //   setStudent({ ...student, batchId: data._id });
  //   const res = await axios.post("/api/courses/students/", student);
  //   setError(res.data.message);
  //   dispStudents();
  // };

  // const resetScore = async () => {
  //   try {
  //     await axios.patch("/api/courses/students/score/" + batch);
  //     showStudents();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const updateScore = async (id) => {
    try {
      const url = `${API}/api/users/grade/${id}`;
      const res = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // showStudents();
    } catch (err) {
      console.log(err);
    }
    showStudents();
  };
  return (
    <div style={{ display: "flex" }}>
      {user.role !== "user1" && (
        <div className="App-Students-Menu">
          {user.role !== "user" && batches.length > 1 && (
            <div>
              <select onChange={(e) => setBatch(e.target.value)}>
                <option value="">-- Select Batch --</option>
                {batches.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              <button onClick={showStudents}>
                {/* <FaSync /> */}
                Refresh
              </button>
              {/* <button style={{backgroundColor:'pink'}} onClick={resetScore}>Reset</button> */}
            </div>
          )}
          {user.role !== "user1" && batches.length === 1 && (
            <div onClick={showStudents} style={{ backgroundColor: "silver" }}>
              <strong>{batch}</strong>
            </div>
          )}

          <div>
            <a
              href={`https://nairx.github.io/${
                user.role === "user" ? user.batch : batch
              }/`}
              target="frm"
            >
              <p className="bg-blue-700 text-white"> Home Page</p>
            </a>

            {students &&
              students.map((value, index) => (
                <div
                  key={index}
                  // className={
                  //   LastUpdated(value.updatedAt) < 20 &&
                  //   value.message === "Reviewed" && value.updatedBy !== "user"
                  //     ? "App-Students-List-R"
                  //     : "App-Students-List"
                  // }
                  className={
                    LastUpdated(value.lastGraded) < 14 &&
                    value.message === "Reviewed" &&
                    value.updatedBy !== "user"
                      ? "App-Students-List-R"
                      : LastUpdated(value.updatedAt) < 14 &&
                        value.updatedBy === "user"
                      ? "App-Students-List-New"
                      : value.message === "Reviewing" &&
                        value.updatedBy !== "user"
                      ? "App-Students-List-Rv"
                      : "App-Students-List"
                  }
                  ref={(el) => (studentRef.current[index] = el)}
                >
                  {index + 1}.
                  <abbr title={value.message}>
                    <a
                      onClick={() => handleClick(index, value._id)}
                      href={`https://${value.ghUser}.github.io`}
                      target="frm"
                    >
                      {/* {toTitleCase(value.name)} */}
                      {value.name}
                    </a>
                  </abbr>
                  |
                  <a
                    href={`https://github.com/${value.ghUser}`}
                    target="_blank"
                  >
                    GH
                  </a>
                  {/* {Datetime(value.updatedAt)} */}
                  {/* |<strong>{value.score}</strong> */}
                  {/* <LastUpdate dt={value.updatedAt} /> */}
                  {/* <LastUpdate dt={value.lastGraded} />m| */}
                  {user.role === "admin" && (
                    <button onClick={() => updateScore(value._id)}>+</button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div style={{ width: "100%" }}>
        <iframe
          name="frm"
          // src={`https://nairx.github.io/${batch}/`}
          src={`https://nairx.github.io/${
            user.role === "user" ? user.batch : batch
          }/`}
          className="App-Students-Iframe"
        ></iframe>
      </div>
    </div>
  );
}

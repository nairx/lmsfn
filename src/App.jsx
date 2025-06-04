import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext, AuthProvider } from "./context/AuthContext";

import Login from "./components/user/Login";
// import Courses from "./pages/Courses";
// import CourseDetail from "./pages/CourseDetail";
// import AdminDashboard from "./pages/AdminDashboard";
import Register from "./components/user/Register";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import ShowUsers from "./components/admin/ShowUsers";
import Layout from "./Layout";
import Profile from "./components/user/Profile";
import Message from "./components/user/Message";
import Footer from "./components/footer/Footer";
const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/home" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route
              path="message"
              element={
                <PrivateRoute>
                  <Message />
                </PrivateRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index element={<ShowUsers />} />
              <Route path="users" element={<ShowUsers />} />
            </Route>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

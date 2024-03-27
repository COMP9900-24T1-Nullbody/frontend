import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import UserHistory from "./pages/UserHistory";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset" element={<PasswordReset />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/history" element={<UserHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

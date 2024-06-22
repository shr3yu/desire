import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;

// App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 style={{ fontSize: "48px", fontWeight: "bold", textAlign: "center" }}>
        Welcome to the App!
      </h1>
      <nav style={{ textAlign: "center" }}>
        <Link to="/form" style={{ color: "red" }}>Go to Form</Link>
      </nav>
      <nav style={{ textAlign: "center" }}>
        <Link to="/applicants" style={{ color: "red" }}>Go to Form2</Link>
      </nav>
      <nav style={{ textAlign: "center" }}>
        <Link to="/userdashboard" style={{ color: "red" }}>Go to dashboard</Link>
      </nav>
      <nav style={{ textAlign: "center" }}>
        <Link to="/details/test@example.com" style={{ color: "blue" }}>Go to Info</Link>
      </nav>
      <nav style={{ textAlign: "center" }}>
        <Link to="/login" style={{ color: "blue" }}>Go to Login</Link>
      </nav>
    </div>
  );
}

export default App;

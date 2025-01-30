import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import FullPageTask from "./components/FullPageTask/FullPageTask";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/:number" element={<FullPageTask />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

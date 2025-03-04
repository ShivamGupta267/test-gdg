import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelfAssessment from "./components/SelfAssessment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelfAssessment />} />
      </Routes>
    </Router>
  );
}

export default App;

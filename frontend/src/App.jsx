import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SelfAssessment from "./components/SelfAssessment";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import YogaPoses from "./components/YogaPose"

function App() {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<SelfAssessment />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //   </Router>
  // );
  return (
    <div>
        <h1>Welcome to Yoga App</h1>
        <YogaPoses />
    </div>
);
}

export default App;

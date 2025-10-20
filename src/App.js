import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Matches from "./Matches";
import MatchDetails from "./MatchDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Matches />} />
        <Route path="/match/:id" element={<MatchDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

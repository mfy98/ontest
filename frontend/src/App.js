import React from "react";
import ListRecordPage from "./pages/ListRecordPage";
import CreateRecordPage from "./pages/CreateRecordPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ListRecordPage />} exact />
          <Route path="/create" element={<CreateRecordPage />} />
        </Routes>
      </Router>
  );
};

export default App;
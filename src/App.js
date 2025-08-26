import React from "react";
import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RequestForm from "./pages/RequestForm";
import TrackOrder from "./pages/TrackOrder";


function App() {
  return (
    <Router>
            <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/track" element={<TrackOrder />} />

      </Routes>
    </Router>
  );
}

export default App;

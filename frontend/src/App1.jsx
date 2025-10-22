import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarA from './components/NavbarA';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavbarA />}>
          <Route index element={<Dashboard />} />
           <Route path="teachers" element={<Teachers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
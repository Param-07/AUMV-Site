import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import AdminNavbar from './components/AdminNavbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminNavbar />}>
          <Route index element={<Dashboard />} />
           <Route path="teachers" element={<Teachers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
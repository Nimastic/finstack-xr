import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPortal from './pages/AdminPortal';
import PaymentModule from './pages/PaymentModule';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPortal />} />
        <Route path="/payments" element={<PaymentModule />} />
      </Routes>
    </Router>
  );
}

export default App;

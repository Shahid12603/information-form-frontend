import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactForm from './components/form';
import TableDetails from './components/table';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/:id" element={<ContactForm />} />
        <Route path="/table" element={<TableDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

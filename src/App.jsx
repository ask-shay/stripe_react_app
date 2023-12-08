import React from 'react';
import Pay from './Pay';
import Success from './Success';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/pay" element={<Pay />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
  
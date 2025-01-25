import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

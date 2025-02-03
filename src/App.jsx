import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage';
import Testing from './components/Testing';
import LoginPage from './pages/login/LoginPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position='top-right'/>
      <Routes>
        <Route path='/testing' element={<Testing/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

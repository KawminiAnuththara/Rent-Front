import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage';
import Testing from './components/Testing';
import LoginPage from './pages/login/LoginPage';
import { Toaster } from 'react-hot-toast';
import Register from './pages/register/Register';
import File from './components/File';
import Contact from './pages/home/Contact';
import BookingPage from './pages/home/bookingPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import Footer from './pages/home/Footer';

const App = () => {
  return (
    <GoogleOAuthProvider clientId='315063743738-qvgpe8783i6b7p3bc32bfiv16hl50u1g.apps.googleusercontent.com'>
    <BrowserRouter>
    <Toaster position='top-right'/>
      <Routes>
        <Route path='/file'  element={<File/>}/>
        <Route path='/testing' element={<Testing/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/*" element={<HomePage />} />
      </Routes>
      
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;

import React from 'react';
import Header from '../../components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Gallery from './Gallery';
import Items from './Items';
import Error from './Error';
import ProductOverview from './ProductOverview';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-100px)] w-full bg-primary">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/items" element={<Items/>} />
          <Route path='/product/:key' element={<ProductOverview/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </div>
    </>
  );
};

export default HomePage;

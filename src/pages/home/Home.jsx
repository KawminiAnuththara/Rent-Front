import React from 'react';
import Hero from '../../components/Hero';
import Menu from '../../components/Menu';
import Banner from '../../components/Banner';
import Review from '../../components/Review';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="flex flex-col space-y-16 px-4 md:px-12 lg:px-20 pt-8">
      <Hero />
      <Menu />
      <Banner />
      <Review />
      <Footer />
    </div>
  );
};

export default Home;

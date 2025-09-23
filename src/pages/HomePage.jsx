import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedServices from '../components/home/FeaturedServices'; // Import karein
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

function HomePage() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedServices /> {/* Naya section yahan add karein */}
      <HowItWorks />
      <Testimonials />
    </div>
  );
}

export default HomePage;
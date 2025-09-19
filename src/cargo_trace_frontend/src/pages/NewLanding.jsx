import React from 'react';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import HowItWorks from '../components/sections/HowItWorks';
import WhyCargoTrace from '../components/sections/WhyCargoTrace';

const NewLanding = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <WhyCargoTrace />
      {/* Additional sections will be added here */}
    </div>
  );
};

export default NewLanding;

import React from 'react';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import Solution from '../components/sections/Solution';
import HowItWorks from '../components/sections/HowItWorks';
import styles from './NewLanding.module.css';

const NewLanding = () => {
  return (
    <div className={styles.landing}>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      {/* Additional sections will be added here */}
    </div>
  );
};

export default NewLanding;

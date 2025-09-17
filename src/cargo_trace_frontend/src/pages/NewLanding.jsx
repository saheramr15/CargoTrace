import React from 'react';
import Hero from '../components/sections/Hero';
import styles from './NewLanding.module.css';

const NewLanding = () => {
  return (
    <div className={styles.landing}>
      <Hero />
      {/* Additional sections will be added here */}
    </div>
  );
};

export default NewLanding;

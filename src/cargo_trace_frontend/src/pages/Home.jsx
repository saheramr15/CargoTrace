import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Partners from '../components/sections/Partners';
import Stats from '../components/sections/Stats';
import Process from '../components/sections/Process';
import About from '../components/sections/About';
import CTA from '../components/sections/CTA';

const Home = () => {
  useScrollAnimation();

  return (
    <>
      {/* Enhanced Animated Background */}
      <div className="animated-bg"></div>
      
      <Hero />
      <Features />
      <Partners />
      <Stats />
      <Process />
      <About />
      <CTA />
    </>
  );
};

export default Home; 
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-animation');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}; 
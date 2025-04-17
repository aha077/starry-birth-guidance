
import { useEffect, useRef } from 'react';

export const StarField = () => {
  const starFieldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 3 + 1;
      
      // Set CSS properties
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Add twinkling animation with random delay
      star.style.animation = `pulse-glow ${Math.random() * 3 + 2}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      
      return star;
    };
    
    // Create stars
    if (starFieldRef.current) {
      const starCount = 100; // Adjust based on preference
      for (let i = 0; i < starCount; i++) {
        const star = createStar();
        starFieldRef.current.appendChild(star);
      }
    }
    
    // Cleanup function
    return () => {
      if (starFieldRef.current) {
        starFieldRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return <div ref={starFieldRef} className="star-field" />;
};

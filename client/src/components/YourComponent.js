import React, { useState, useEffect } from 'react';

const ParallaxComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div className="parallax" style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}>
        <div className="parallax-item">Div 1</div>
        <div className="parallax-item">Div 2</div>
        <div className="parallax-item">Div 3</div>
        <div className="parallax-item">Div 4</div>
        <div className="parallax-item">Div 5</div>
        <div className="parallax-item">Div 6</div>
      </div>
    </div>
  );
};

export default ParallaxComponent;

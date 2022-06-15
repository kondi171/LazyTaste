import React, { useEffect, useState } from 'react';
const LoadingLazyAssistant = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const dotsTimeout = setTimeout(() => {
      if (dots.length === 3) setDots('');
      else setDots(dots + '.');
    }, 200);
    return () => {
      clearTimeout(dotsTimeout);
    }
  }, [dots]);

  return (
    <div id='progress' className='loading'>
      <div className='loading__progress'></div>
      <div className='loading__text'>Analyzing Data<span>{dots}</span></div>
    </div>
  );
};

export default LoadingLazyAssistant;

import React, { useEffect, useState } from 'react';
import '../../assets/scss/common_styles/loading.scss';
const LoadingState = () => {
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
    <div id='progress' className='save-data__overlay'>
      <div className='save-data__overlay--progress'></div>
      <div className='save-data__overlay--text'>Loading Data<span>{dots}</span></div>
    </div>
  );
};

export default LoadingState;

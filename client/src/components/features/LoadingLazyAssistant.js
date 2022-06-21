import React, { useEffect, useState } from 'react';
const LoadingLazyAssistant = () => {
  const [dots, setDots] = useState('');
  const [index, setIndex] = useState(0);

  const messages = [
    'Analyzing data',
    'Calculating prediction',
    'Downloading restaurants',
  ];

  useEffect(() => {
    const dotsTimeout = setTimeout(() => {
      if (dots.length === 3) setDots('');
      else setDots(dots + '.');
    }, 200);
    return () => {
      clearTimeout(dotsTimeout);
    }
  }, [dots]);



  useEffect(() => {
    setTimeout(() => {
      if (index === messages.length - 1) setIndex(0);
      else setIndex(index + 1);
    }, 2000);
  }, [index, messages.length]);

  return (
    <div id='progress' className='loading'>
      <div className='loading__progress'>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className='loading__text'>{messages[index]}<span>{dots}</span></div>
    </div>
  );
};

export default LoadingLazyAssistant;

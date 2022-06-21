import { useState, useEffect, useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import useStateWithCallbackLazy from 'use-state-with-callback';
import LoadingLazyAssistant from '../features/LoadingLazyAssistant';
import blank from "../../assets/img/logo/blank.png";
import { AppContext } from '../AppContext';
const LazyAssistant = () => {
  const { loggedUser, setChosenRestaurant, chosenRestaurant, predictedRestaurant, setPredictedRestaurant, activateLazyAssistant, setActivateLazyAssistant } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [preparedMessageIndex, setPreparedMessageIndex] = useState(0);

  const preparedMessage = [
    'I think, today yo want to eat in this restaurant',
    'I prepare to you this restaurant',
    'It is a good day to order in this restaurant',
    'Maybe you want to eat in this restaurant?',
    'Good time for food from this restaurant'
  ];

  useEffect(() => {
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(error => console.log(error));
    fetch(`http://localhost:4000/API/customers/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => setOrders(data.orders))
      .catch(error => console.log(error))
  }, []);

  const handlePredictRestaurant = () => {
    if (Object.keys(restaurants).length !== 0 && Object.keys(orders).length !== 0) attachLazyAssistant();
    setActivateLazyAssistant(true);
  }

  const attachLazyAssistant = () => {

    if (Object.keys(predictedRestaurant).length <= 1) {
      const URL = 'http://localhost:4000/API/lazy-assistant';
      const body = new URLSearchParams({
        customerOrders: JSON.stringify(orders),
        restaurants: JSON.stringify(restaurants),
      });
      fetch(URL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: body
      })
        .then(res => res.json())
        .then(data => setPredictedRestaurant(data))
        .catch(error => console.log(error));
      setPreparedMessageIndex(Math.floor(Math.random() * preparedMessage.length));
    }
  }

  const handleRedirectToRestaurant = restaurantID => {
    fetch(`http://localhost:4000/API/restaurants/${restaurantID}`)
      .then(res => res.json())
      .then(data => setChosenRestaurant(data));
  }

  const handleHover = () => {
    if (!activateLazyAssistant) {
      const lazyAssistant = document.querySelector('.lazy-assistant');
      const text = document.querySelector('.predict')
      lazyAssistant.style.opacity = '0.9';
      lazyAssistant.style.boxShadow = '0 0 20px 3px #fdab07';
      text.style.transform = 'scale(1.2)';
    }
  }

  const handleUnHover = () => {
    if (!activateLazyAssistant) {
      const lazyAssistant = document.querySelector('.lazy-assistant');
      const text = document.querySelector('.predict')
      lazyAssistant.style.opacity = '1';
      lazyAssistant.style.boxShadow = 'none';
      text.style.transform = 'scale(1)';
    }
  }

  useEffect(() => {
    // console.log(Object.keys(predictedRestaurant).length);
  }, [predictedRestaurant]);

  return (
    <div onClick={handlePredictRestaurant} onMouseEnter={handleHover} onMouseLeave={handleUnHover} className="lazy-assistant">
      <div className="main-box">
        {activateLazyAssistant ? <>
          {predictedRestaurant.error === 'Array is empty!' || Object.keys(predictedRestaurant).length <= 0 ? <LoadingLazyAssistant /> : <>
            <h5 className="welcome-message">{preparedMessage[preparedMessageIndex]}</h5>
            <div className="restaurant" onClick={() => handleRedirectToRestaurant(predictedRestaurant._id)} >
              {predictedRestaurant.avatar !== 'blank' ? <img src={predictedRestaurant.avatar} alt={`${predictedRestaurant.name} logo`} /> : <img src={blank} alt={`${predictedRestaurant.name} logo`} />}
              <div className="content-info">
                <h4>{predictedRestaurant.name}</h4>
              </div>
            </div>
          </>
          }</> : <div className='predict'>Activate Lazy Assistant</div>}
      </div>

      {chosenRestaurant !== null && <Routes><Route path='/' exact element={<Navigate to='/customer/offer/restaurant' />} /></Routes>}
    </div >
  );
}
export default LazyAssistant;
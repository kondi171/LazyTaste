import { useState, useEffect, useContext } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import LoadingLazyAssistant from '../features/LoadingLazyAssistant';
import blank from "../../assets/img/logo/blank.png";
import { AppContext } from '../AppContext';
const LazyAssistant = () => {
  const { loggedUser, setChosenRestaurant, chosenRestaurant } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [predictedRestaurant, setPredictedRestaurant] = useState({});

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

  useEffect(() => {
    const URL = 'http://localhost:4000/API/lazy-assistant';
    const body = new URLSearchParams({
      customerID: loggedUser._id,
      customerOrders: JSON.stringify(orders),
      restaurants: JSON.stringify(restaurants),
    });
    fetch(URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: body
    })
      .then(res => res.json())
      .then(data => setPredictedRestaurant(data))
      .catch(error => console.log(error));

  }, [restaurants, orders]);

  const handleRedirectToRestaurant = restaurantID => {
    fetch(`http://localhost:4000/API/restaurants/${restaurantID}`)
      .then(res => res.json())
      .then(data => setChosenRestaurant(data));
  }

  useEffect(() => {
    console.log(predictedRestaurant);
  }, [predictedRestaurant]);

  return (
    <div className="smart-assistant">
      <h2>I prepare to you this restaurant</h2>
      {predictedRestaurant.error === 'Array is empty!' ? <LoadingLazyAssistant /> :
        <div className="restaurant" onClick={() => handleRedirectToRestaurant(predictedRestaurant._id)} >
          {predictedRestaurant.avatar !== 'blank' ? <img src={predictedRestaurant.avatar} alt={`${predictedRestaurant.name} logo`} /> : <img src={blank} alt={`${predictedRestaurant.name} logo`} />}
          <div className="content-info">
            <h4>{predictedRestaurant.name}</h4>
          </div>
        </div>
      }
      {chosenRestaurant !== null && <Routes><Route path='/' exact element={<Navigate to='/customer/offer/restaurant' />} /></Routes>}
    </div>
  );
}
export default LazyAssistant;
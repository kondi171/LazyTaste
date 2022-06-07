import { useContext, useEffect, useState } from "react";
import { Route, Navigate, Routes } from 'react-router-dom';
import { AppContext } from "../AppContext";
import blank from "../../assets/img/blank-photo.png";

import Searchbar from "../features/searchbars/Searchbar";

const Promotion = () => {
  const { loggedUser, setChosenRestaurant, chosenRestaurant } = useContext(AppContext);

  const competitors = [

  ];
  const [activePromotion, setActivePromotion] = useState('None');
  const [filter, setFilter] = useState(competitors);
  const [promotion, setPromotion] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);


  const handleSetPromotion = () => {
    const newPromotion = document.querySelector('.area-content');
    setActivePromotion(newPromotion.value);
    newPromotion.value = '';

    const body = new URLSearchParams({
      id: loggedUser._id,
      promotion: promotion,
    });
    fetch('http://localhost:4000/API/restaurant/add-promotion', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: body
    });
  }

  const handleRedirectToRestaurant = restaurantID => {
    fetch(`http://localhost:4000/API/restaurants/${restaurantID}`)
      .then(res => res.json())
      .then(data => setChosenRestaurant(data));
  }

  useEffect(() => {
    fetch(`http://localhost:4000/API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => setActivePromotion(data.promotion));
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(error => console.log(error));
  }, [loggedUser]);

  return (
    <section className="competitors">
      <div className="searchbox">
        <Searchbar data={restaurants} setFilter={setFilter} />
      </div>
      <div className="promotion-content">
        <div className="create-promo">
          <h3 className="create-area__title">
            <i className="fa fa-product-hunt" aria-hidden="true"></i>
            <span>Set Promotion</span>
          </h3>
          <textarea onChange={(e) => setPromotion(e.target.value)} className="area-content" placeholder="Write Promotion..." required minLength="5" maxLength="100" name="area-content" id="area-content"></textarea>
          <button onClick={handleSetPromotion} className="set-area-btn">Set Promotion</button>
          <div className="active-promo">
            <h4>* Active Promotion *</h4>
            <p>{activePromotion}</p>
          </div>
        </div>
        <div className="competitors-list">
          <h3 className="competitors-list__title">Competitors:</h3>
          <ul className="competitors-list__list">

            {filter.map(restaurant => {
              return (
                <li className="list-item" data-id={restaurant._id} key={restaurant._id}>
                  <div className="restaurant" onClick={() => handleRedirectToRestaurant(restaurant._id)} >
                    {restaurant.avatar !== 'blank' ? <img src={restaurant.avatar} alt={`${restaurant.name} logo`} /> : <img src={blank} alt={`${restaurant.name} logo`} />}
                    <div className="content-info">
                      <h4>{restaurant.name}</h4>
                      <p><b>Promotion: </b>{restaurant.promotion}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {chosenRestaurant !== null && <Routes><Route path='/' exact element={<Navigate to='/restaurant/competitors/competitor' />} /></Routes>}
      <div className="competitors__result">
        Result: <span>{filter.length}</span>
      </div>
    </section>
  );
}
export default Promotion;
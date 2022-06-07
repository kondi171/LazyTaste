import { useContext, useEffect, useState } from "react";
import { Route, Navigate, Routes } from 'react-router-dom';
import blank from "../../assets/img/blank-photo.png";
import { AppContext } from "../AppContext";
import Searchbar from "../features/searchbars/Searchbar";

const Offer = () => {

  const { loggedUser, setChosenRestaurant, chosenRestaurant } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);

  // const [restaurantID, setRestaurantID] = useState('');
  const handleFavourite = e => {
    const restaurantID = e.target.parentElement.dataset.id;
    if (e.target.classList.contains('fa-heart-o')) {
      e.target.classList.remove('fa-heart-o')
      e.target.classList.add('fa-heart');
      const title = e.target.parentElement.firstChild.lastChild.firstChild.textContent;
      // const img = e.target.parentElement.firstChild.getAttribute('src');
      const img = "blank";
      const body = new URLSearchParams({
        restaurantID: restaurantID,
        restaurantAvatar: img,
        restaurantName: title,
      });
      fetch(`http://localhost:4000/API/customers/${loggedUser._id}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'PUT',
        body: body
      })
        .then(res => res.status)
        .catch(error => console.log(error));
    } else if (e.target.classList.contains('fa-heart')) {
      e.target.classList.remove('fa-heart');
      e.target.classList.add('fa-heart-o');
      fetch(`http://localhost:4000/API/customers/${loggedUser._id}/${restaurantID}`, {

        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'DELETE',
      })
        .then(res => res.status)
        .catch(error => console.log(error));
    }
  }
  const handleRedirectToRestaurant = restaurantID => {
    fetch(`http://localhost:4000/API/restaurants/${restaurantID}`)
      .then(res => res.json())
      .then(data => setChosenRestaurant(data));
  }

  useEffect(() => {
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/API/customers/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => setFavourites(data.favourites));

  }, [loggedUser, favourites]);

  useEffect(() => {
    setFilterRestaurants(restaurants);
  }, [restaurants]);

  return (
    <section className="offer">
      <div className="searchbox">
        <Searchbar data={restaurants} setFilter={setFilterRestaurants} />
      </div>
      <div className="section-content">
        <div className="favourites">
          <h3 className="favourites__title">
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>Favourites</span>
          </h3>
          <ul className="favourites__list">
            {Object.keys(favourites).length === 0 ? <p className="empty-favourites">You don't have any favourites yet!</p> : null}
            {favourites.map(favourite => {
              return (
                <li key={favourite.restaurantID}>
                  {favourite.restaurantAvatar !== 'blank' ? <img src={favourite.restaurantAvatar} alt={`${favourite.restaurantName} logo`} /> : <img src={blank} alt={`${favourite.restaurantName} logo`} />}
                  <h4>{favourite.restaurantName}</h4>
                </li>
              );
            })}
          </ul>
          <div className="favourites__result">
            You have <span>{favourites.length}</span> favourites restaurants.
          </div>
        </div>

        <div className="restaurant-list">
          <h3 className="restaurant-list__title">Restaurant List:</h3>
          <ul className="restaurant-list__list">
            {filterRestaurants.map(restaurant => {
              const isFavourite = favourites.findIndex(favourite => favourite.restaurantID === restaurant._id);
              return (
                <li className="list-item" data-id={restaurant._id} key={restaurant._id}>
                  <div className="restaurant" onClick={() => handleRedirectToRestaurant(restaurant._id)} >
                    {restaurant.avatar !== 'blank' ? <img src={restaurant.avatar} alt={`${restaurant.name} logo`} /> : <img src={blank} alt={`${restaurant.name} logo`} />}
                    <div className="content-info">
                      <h4>{restaurant.name}</h4>
                      <p><b>Promotion: </b>{restaurant.promotion}</p>
                    </div>
                  </div>
                  {isFavourite >= 0 ? <i onClick={(e) => handleFavourite(e)} className="fa fa-heart" aria-hidden="true"></i> : <i onClick={(e) => handleFavourite(e)} className="fa fa-heart-o" aria-hidden="true"></i>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {chosenRestaurant !== null && <Routes><Route path='/' exact element={<Navigate to='/customer/offer/restaurant' />} /></Routes>}
      <div className="offer__result">
        Result: <span>{filterRestaurants.length}</span>
      </div>
    </section>
  );
}

export default Offer;
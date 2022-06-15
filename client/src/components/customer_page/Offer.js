import { useContext, useEffect, useState } from "react";
import { Route, Navigate, Routes } from 'react-router-dom';
import blank from "../../assets/img/logo/blank.png";
import { AppContext } from "../AppContext";
import Searchbar from "../features/searchbars/Searchbar";

const Offer = () => {

  const { loggedUser, setChosenRestaurant, chosenRestaurant } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);

  const handleFavourite = e => {
    const restaurantID = e.target.parentElement.dataset.id;
    if (e.target.classList.contains('fa-heart-o')) {
      e.target.classList.remove('fa-heart-o')
      e.target.classList.add('fa-heart');
      const title = e.target.parentElement.firstChild.lastChild.firstChild.textContent;
      const img = e.target.parentElement.firstChild.firstChild.getAttribute('src');
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

  const handleType = e => {
    const activeElement = e.currentTarget;
    const types = document.getElementsByClassName('type');
    const arrayTypes = [...types];
    arrayTypes.forEach(type => type.classList.remove('active'));
    activeElement.classList.add('active');
    if (activeElement.textContent === 'All') fetchData();
    else {
      fetch('http://localhost:4000/API/restaurants')
        .then(res => res.json())
        .then(data => {
          const typeFilter = data.filter(restaurant => restaurant.type === activeElement.textContent);
          const emptyFilter = typeFilter.filter(menu => menu.menu.length !== 0);
          setRestaurants(emptyFilter);
        })
        .catch(error => console.log(error));
    }
  }

  const fetchData = () => {
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => {
        const filter = data.filter(menu => menu.menu.length !== 0);
        setRestaurants(filter);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
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
      <div className="restaurant-type">
        <div onClick={handleType} className="type active">All</div>
        <div onClick={handleType} className="type">Kebab</div>
        <div onClick={handleType} className="type">Burgers</div>
        <div onClick={handleType} className="type">Chinease</div>
        <div onClick={handleType} className="type">Italian</div>
        <div onClick={handleType} className="type">Polish</div>
        <div onClick={handleType} className="type">Pizza</div>
        <div onClick={handleType} className="type">Thai</div>
        <div onClick={handleType} className="type">Vege</div>
        <div onClick={handleType} className="type">Sushi</div>
        <div onClick={handleType} className="type">Other</div>
      </div>
      <div className="section-content">
        <div className="favourite-wrapper">
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

          </div>
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
            {filterRestaurants.length === 0 && <p className="empty-restaurant">No restaurant found</p>}
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
import { useContext, useEffect, useState } from "react";
import { Route, Navigate, Routes } from 'react-router-dom';
import blank from "../../assets/img/logo/blank.png";
import { AppContext } from "../AppContext";
import Searchbar from "../features/searchbars/Searchbar";

const Competitors = () => {

  const { loggedUser, setChosenRestaurant, chosenRestaurant } = useContext(AppContext);

  const [promotion, setPromotion] = useState('');
  const [activePromotion, setActivePromotion] = useState('None');
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [disablePromotion, setDisablePromotion] = useState(true);

  const handleSetPromotion = () => {
    const newPromotion = document.querySelector('.area-content');
    setActivePromotion(newPromotion.value);
    newPromotion.value = '';
    setPromotion('None');
    setDisablePromotion(false);
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

  const handleDisablePromotion = () => {
    const body = new URLSearchParams({
      id: loggedUser._id,
      promotion: 'None',
    });
    fetch('http://localhost:4000/API/restaurant/add-promotion', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: body
    });
    setActivePromotion('None');
    const newPromotion = document.querySelector('.area-content');
    newPromotion.value = '';
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
    const restaurantTypes = document.getElementsByClassName('type');
    const arrayTypes = [...restaurantTypes];
    arrayTypes.forEach(type => {
      if (type.textContent === loggedUser.type) {
        type.classList.add('current');
      }
    });
  }, [restaurants, loggedUser]);

  useEffect(() => {
    setFilterRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => {
        data.forEach(promotion => {
          if (promotion._id === loggedUser._id) setActivePromotion(promotion.promotion);
        });
      })
      .catch(error => console.log(error));
  }, [loggedUser]);

  useEffect(() => {
    if (promotion === '' || promotion === 'None') setDisablePromotion(true);
    else setDisablePromotion(false);
  }, [promotion, disablePromotion]);

  return (
    <section className="competitors">
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
        <div onClick={handleType} className="type">Others</div>
      </div>
      <div className="promotion-content">
        <div className="create-promo">
          <h3 className="create-area__title">
            <i className="fa fa-product-hunt" aria-hidden="true"></i>
            <span>Set Promotion</span>
          </h3>
          <textarea onChange={(e) => setPromotion(e.target.value)} className="area-content" placeholder="Write Promotion..." required minLength="5" maxLength="100" name="area-content" id="area-content"></textarea>
          {disablePromotion ? <button onClick={handleDisablePromotion} className="set-area-btn">Disable Promotion</button> : <button onClick={handleSetPromotion} className="set-area-btn">Set Promotion</button>}

          <div className="active-promo">
            <h4>* Active Promotion *</h4>
            <p>{activePromotion}</p>
          </div>
        </div>
        <div className="competitors-list">
          <h3 className="competitors-list__title">Competitors:</h3>
          <ul className="competitors-list__list">

            {filterRestaurants.map(restaurant => {
              return (
                <li className="list-item" data-id={restaurant._id} key={restaurant._id}>
                  <div className={`restaurant ${restaurant._id === loggedUser._id && 'current'}`} onClick={() => handleRedirectToRestaurant(restaurant._id)} >
                    {restaurant.avatar !== 'blank' ? <img src={restaurant.avatar} alt={`${restaurant.name} logo`} /> : <img src={blank} alt={`${restaurant.name} logo`} />}
                    <div className="content-info">
                      <h4>{restaurant.name}</h4>
                      <p><b>Promotion: </b>{restaurant._id === loggedUser._id ? activePromotion : restaurant.promotion}</p>
                    </div>
                  </div>
                </li>
              );
            })}
            {filterRestaurants.length === 0 && <p className="empty-restaurant">No restaurant found</p>}
          </ul>
        </div>
      </div>
      {chosenRestaurant !== null && <Routes><Route path='/' exact element={<Navigate to='/restaurant/competitors/competitor' />} /></Routes>}
      <div className="competitors__result">
        Result: <span>{filterRestaurants.length}</span>
      </div>
    </section>
  );
}

export default Competitors;
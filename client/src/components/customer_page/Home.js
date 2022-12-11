import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfoSection from '../features/InfoSection';
import LazyAssistant from './LazyAssistant';

const Home = () => {

  const [indexOfPromotions, changeIndexOfPromotions] = useState(0);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_DB_CONNECT + 'API/restaurants')
      .then(res => res.json())
      .then(data => {
        const filter = data.filter(promotion => promotion.promotion !== 'None');
        setPromotions(filter);
      })
      .catch(error => console.log(error));

  }, []);
  useEffect(() => {
    setTimeout(() => {
      const index = Math.floor(Math.random() * (promotions.length));
      if (index === indexOfPromotions && index === promotions.length - 1) changeIndexOfPromotions(index - 1);
      else if (index === indexOfPromotions && index === 0) changeIndexOfPromotions(index + 1);
      else if (index === indexOfPromotions) changeIndexOfPromotions(index + 1);
      else changeIndexOfPromotions(index);
    }, 4000);
  }, [indexOfPromotions]);

  return (
    <section className="home">
      <div className="home__account-column">
        <InfoSection as='customer' place="home" />
      </div>
      <div className="home__control-panel">
        <div className="control-panel__lazy-assistant">
          <h2>Lazy Assistant</h2>
          <LazyAssistant />
        </div>
        <div className="control-panel__under-boxes">
          <NavLink to='/customer/offer' className="under-box">
            <h2>Restaurants</h2>
            <i className="fa fa-cutlery icon" aria-hidden="true"></i>
          </NavLink>
          <NavLink to='/customer/orders' className="under-box">
            <h2>Orders</h2>
            <i className="fa fa-shopping-cart icon" aria-hidden="true"></i>
          </NavLink>
        </div>
        <div className="promotions">
          {Object.keys(promotions).length !== 0 &&
            <>
              <strong>{`${promotions[indexOfPromotions].name}: `}</strong>
              <span>{promotions[indexOfPromotions].promotion}</span>
            </>
          }
        </div>
      </div>
    </section>
  );
}

export default Home;
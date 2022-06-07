import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../AppContext';
import InfoSection from '../features/InfoSection';
const Home = () => {
  const { notifications } = useContext(AppContext);
  let [indexOfPromotions, changeIndexOfPromotions] = useState(0);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => setPromotions(data))
      .catch(error => console.log(error));
    console.log(indexOfPromotions);
    setInterval(() => {
      if (indexOfPromotions >= promotions.length - 1) changeIndexOfPromotions(0);
      else changeIndexOfPromotions(indexOfPromotions + 1);
    }, 1000);
  }, []);
  return (
    <section className="home">
      <div className="home__account-column">
        <InfoSection as='restaurant' place="home" />
      </div>
      <div className="home__control-panel">
        <NavLink to='/restaurant/menu' className="control-panel__main-box">
          <div className="menu">
            <div className="menu__title"><i className="fa fa-bars menu-icon" aria-hidden="true"></i>Menu</div>
          </div>
        </NavLink>
        <div className="control-panel__under-boxes">
          <NavLink to='/restaurant/competitors' className="under-box">
            <h2>Competitors</h2>
            <i className="fa fa-users icon" aria-hidden="true"></i>
          </NavLink>
          <NavLink to='/restaurant/orders/active' className="under-box">
            <h2>Orders</h2>
            <i className="fa fa-shopping-cart icon" aria-hidden="true"></i>
            <div className="notifications">
              <i className="fa fa-bell" aria-hidden="true"></i>
              <span>You have <strong>{notifications}</strong> orders</span>
            </div>

          </NavLink>
        </div>
        <div className="promotions">
          <h5>Competitors promotions</h5>
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
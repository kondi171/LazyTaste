import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../AppContext';
import InfoSection from '../features/InfoSection';
const Home = () => {
  const { notifications, setNotifications, loggedUser } = useContext(AppContext);
  const [indexOfPromotions, changeIndexOfPromotions] = useState(0);
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/API/restaurants')
      .then(res => res.json())
      .then(data => {
        const filterPromotions = data.filter(promotion => promotion.promotion !== 'None');
        setPromotions(filterPromotions);
      })
      .catch(error => console.log(error));
    fetch(`http://localhost:4000/API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        const filterActiveOrders = data.orders.filter(order => order.active === true);
        setNotifications(filterActiveOrders.length)
      })
      .catch(error => console.log(error));
  }, [loggedUser, notifications, setNotifications]);
  useEffect(() => {
    setTimeout(() => {
      if (indexOfPromotions >= promotions.length - 1) changeIndexOfPromotions(0);
      else changeIndexOfPromotions(indexOfPromotions + 1);
    }, 4000);
  }, [promotions, indexOfPromotions]);

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
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../AppContext';
import InfoSection from '../features/InfoSection';
const Home = () => {
  const { notifications, setNotifications, loggedUser } = useContext(AppContext);
  const [indexOfPromotions, changeIndexOfPromotions] = useState(0);
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_DB_CONNECT + 'API/restaurants')
      .then(res => res.json())
      .then(data => {
        const filterPromotions = data.filter(promotion => promotion.promotion !== 'None');
        setPromotions(filterPromotions);
      })
      .catch(error => console.log(error));
    fetch(process.env.REACT_APP_DB_CONNECT + `API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        const filterActiveOrders = data.orders.filter(order => order.active === true);
        setNotifications(filterActiveOrders.length)
      })
      .catch(error => console.log(error));
  }, [loggedUser, notifications, setNotifications]);

  // useEffect(() => {
  //   let products = '';
  //   loggedUser.menu.map(product => products += `${product.productName}, `);
  //   const body = new URLSearchParams({
  //     restaurantType: loggedUser.type,
  //     products: products
  //   });
  //   fetch(process.env.REACT_APP_DB_CONNECT+'API/lazy-assistant', {
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     method: 'PATCH',
  //     body: body
  //   })
  //     .then(res => res.status)
  //     .catch(error => console.log(error));
  // }, [loggedUser]);

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
        <InfoSection as='restaurant' place="home" />
      </div>
      <div className="home__control-panel">
        <NavLink to='/restaurant/menu' className="control-panel__main-box">
          <div className="menu">
            <div className="menu__title"><i className="fa fa-cutlery menu-icon" aria-hidden="true"></i>Menu</div>
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
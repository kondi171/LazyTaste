import logo from '../../assets/img/restaurant-logo.jpg';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
const Home = () => {
  let [indexOfPromotions, changeIndexOfPromotions] = useState(0);
  const promotions = [
    {
      name: 'Saray',
      content: '1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero error eligendi magni tempore at in debitis, ullam nobis voluptatum facilis.',
    },
    {
      name: 'Alibaba',
      content: '2Sed harum quod, est, deleniti ut et fugiat dignissimos quam, veritatis porro deserunt asperiores possimus ipsa maiores recusandae.',
    },
    {
      name: 'McDonals',
      content: '3Sint sed quaerat vel corporis assumenda id, voluptatum a odit. Perspiciatis aperiam adipisci alias, odit, voluptates recusandae nesciunt dicta exercitationem'
    },
  ];
  useEffect(() => {
    setInterval(() => {
      if (indexOfPromotions >= promotions.length - 1) changeIndexOfPromotions(indexOfPromotions = 0);
      else changeIndexOfPromotions(indexOfPromotions += 1);
      console.log(indexOfPromotions);
    }, 10000);
  }, []);
  return (
    <section className="home">
      <div className="home__account-column">
        <img src={logo} alt="Avatar" />
        <h3>Try This Kebab</h3>
        <div className="account-column__info">
          <div className='single-info'>
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <span>Mail</span>
          </div>
          <span>wk.k.nowak@gmail.com</span>
          <div className='single-info'>
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span>Phone</span>
          </div>
          <span>+48 690 992 435</span>
          <div className='single-info'>
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            <span>Adress</span>
          </div>
          <span>Leszczyńska 69C/69, 25-325 Kielce</span>
        </div>
        <div className="account-column__logout">
          <a href="http://localhost:3000">Logout</a>
        </div>
      </div>
      <div className="home__control-panel">
        <NavLink to='/restaurant/menu' className="control-panel__main-box">
          <div className="menu">
            <div className="menu__title"><i className="fa fa-bars menu-icon" aria-hidden="true"></i>Menu</div>
          </div>
        </NavLink>
        <div className="control-panel__under-boxes">
          <NavLink to='/restaurant/promotion' className="under-box">
            <h2>Set Promotion</h2>
            <i className="fa fa-product-hunt icon" aria-hidden="true"></i>
          </NavLink>
          <NavLink to='/restaurant/orders/active' className="under-box">
            <h2>Orders</h2>
            <i className="fa fa-shopping-cart icon" aria-hidden="true"></i>
            <div className="notifications">
              <i className="fa fa-bell" aria-hidden="true"></i>
              <span>You have <strong>4</strong> orders</span>
            </div>

          </NavLink>
        </div>
        <div className="promotions">
          <h5>Competitors promotions</h5>
          <strong>{`${promotions[indexOfPromotions].name}: `}</strong>
          <span>{promotions[indexOfPromotions].content}</span>
        </div>
      </div>
    </section>
  );
}

export default Home;
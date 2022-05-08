import { useState, useEffect } from 'react';
import Konrad from '../../assets/img/Konrad.png';
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
        <img src={Konrad} alt="Avatar" />
        <h3>Konrad Nowak</h3>
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
        <div className="control-panel__main-box">
          <h2>Smart Assistant</h2>
          <div className="smart-assistant">
            <div className="smart-assistant__welcome-message">Maybe you want to eat today:</div>
            <div className="smart-assistant__response">Kebsiwo na cienkim</div>
            {/* <div className="smart-assistant__response">Pizza</div> */}
          </div>
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
          <strong>{`${promotions[indexOfPromotions].name}: `}</strong>
          <span>{promotions[indexOfPromotions].content}</span>
        </div>
      </div>
    </section>
  );
}

export default Home;
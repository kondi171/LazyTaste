import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfoSection from '../features/InfoSection';
import blank from '../../assets/img/blank-photo.png';

const Home = () => {

  const [indexOfPromotions, changeIndexOfPromotions] = useState(0);
  const promotions = [
    {
      img: blank,
      title: 'Saray Kebab',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Alibaba Kebab',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Maxi Pizza',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Pizza Adriano',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'McDonalds',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'KFC',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Wieś Pizza',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'North Fish',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
  ];

  useEffect(() => {
    const changePromoTimeout = setTimeout(() => {
      if (indexOfPromotions >= promotions.length - 1) changeIndexOfPromotions(0);
      else changeIndexOfPromotions(indexOfPromotions + 1);
    }, 10000);
    return () => {
      clearTimeout(changePromoTimeout);
    }
  }, [indexOfPromotions, promotions.length]);

  return (
    <section className="home">
      <div className="home__account-column">
        <InfoSection as='customer' place="home" />
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
          {/* <img src={promotions[indexOfPromotions].img} alt={`${promotions[indexOfPromotions].title} Promotion`} /> */}
          <strong>{`${promotions[indexOfPromotions].title}: `}</strong>
          <span>{promotions[indexOfPromotions].content}</span>
        </div>
      </div>
    </section>
  );
}

export default Home;
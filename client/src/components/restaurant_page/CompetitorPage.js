import blank from '../../assets/img/logo/blank.png';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';

const CompetitorPage = () => {
  const { loggedUser, chosenRestaurant, setChosenRestaurant } = useContext(AppContext);
  const [message, setMessage] = useState({
    content: '',
    visible: false,
  });

  const handleShowMessage = message => {
    const messageDiv = document.querySelector('div.message-info');
    setMessage({ content: message, visible: true });
    messageDiv.style.transform = 'scale(1)';
  }
  const handleHideMessage = () => {
    const messageDiv = document.querySelector('div.message-info');
    setMessage({ content: message.content, visible: false });
    messageDiv.style.transform = 'scale(0)';
  }

  return (
    <section className="restaurant-page">
      <div className="restaurant-info">
        {chosenRestaurant.avatar === 'blank' ? <img src={blank} alt={`Avatar of ${chosenRestaurant.name}`} /> :
          <img src={chosenRestaurant.avatar} alt={`Avatar of ${chosenRestaurant.name}`} />}
        <h3>{chosenRestaurant.name}</h3>
        <div className="account-column__info">
          <div className='single-info'>
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <span>Mail</span>
          </div>
          <span>{chosenRestaurant.mail}</span>
          <div className='single-info'>
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span>Phone</span>
          </div>
          <span>{chosenRestaurant.phone}</span>
          <div className='single-info'>
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            <span>Adress</span>
          </div>
          <span>{chosenRestaurant.adress}</span>
          <div className='single-info'>
            <i className="fa fa-product-hunt" aria-hidden="true"></i>
            <span>Promotion</span>
          </div>
          <span>{chosenRestaurant.promotion}</span>
          <div className='single-info'>
            <i className="fa fa-money" aria-hidden="true"></i>
            <span>Delivery Cost</span>
          </div>
          <span>{chosenRestaurant.deliveryCost} PLN</span>
        </div>
        <div className="account-column__logout">
          <Link onClick={() => setChosenRestaurant(null)} to="/restaurant/competitors" onMouseEnter={() => handleShowMessage('Back to Competitors')} onMouseLeave={handleHideMessage}>Back</Link>
        </div>
      </div>
      <div className="access-system">
        <div className="menu menu--competitor">
          <div className="menu-items">
            <h3 className="menu__title">Menu</h3>
            <ul className="menu__list">
              {chosenRestaurant.menu.map((product) => {
                return (
                  <li data-id={product._id} key={product._id}>
                    <span>{product.productName} - <strong>{product.productPrice} PLN</strong></span>
                  </li>
                )
              })}
            </ul>
            <br />
          </div>
        </div>
        <div className="message-info">{message.content}</div>
      </div>
    </section >
  );
}
export default CompetitorPage;
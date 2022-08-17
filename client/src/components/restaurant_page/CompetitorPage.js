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
        </div>
        <div className="account-column__logout">
          <Link onClick={() => setChosenRestaurant(null)} to="/restaurant/competitors" onMouseEnter={() => handleShowMessage('Back to Competitors')} onMouseLeave={handleHideMessage}>Back</Link>
        </div>
      </div>
      <div className="access-system access-system--competitor">
        <div className="menu menu--competitor">
          <div className="menu-items">
            <h3 className="menu__title">Menu</h3>
            <ul className="menu__list">
              {chosenRestaurant.productsSections.map(section => {
                return (
                  <div key={section._id}>
                    <div className="section__title">
                      <h3 data-id={section._id}>{section.sectionName}</h3>
                    </div>
                    <ul>
                      {chosenRestaurant.menu.map(product => {
                        if (product.sectionID === section._id) {
                          return (
                            <li data-id={product._id} key={product._id}>
                              <span>{product.productName} - <strong>{product.productPrice} PLN</strong></span>
                              <div className='cyan'>{product.productDescription}</div>
                            </li>
                          );
                        }
                        else return null;
                      })}
                    </ul>
                  </div>
                )
              })}
            </ul>
            <br />
          </div>
        </div>
        <div className="delivery">
          {chosenRestaurant.delivery.deliveryActive ? <>
            <p><b>Delivery Cost: </b>{chosenRestaurant.delivery.deliveryCost} PLN</p>
            <p><b>Min Order Value: </b>{chosenRestaurant.delivery.orderMinValue} PLN</p>
            <p><b>Free delivery from: </b>{chosenRestaurant.delivery.orderValueToFreeDelivery} PLN</p>
          </> : <span>Restaurant is not open to delivery!</span>}
        </div>
        <div className="message-info">{message.content}</div>
      </div>

    </section >
  );
}
export default CompetitorPage;
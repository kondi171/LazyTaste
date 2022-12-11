import blank from '../../assets/img/logo/blank.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
const SuccessOrder = () => {
  const { setChosenRestaurant, chosenRestaurant, loggedUser, newOrder } = useContext(AppContext);


  return (
    <div className="success-order">
      <h2>Success!</h2>
      <h3>Your Order:</h3>
      <div className="order">
        <div className="order__information">
          <div className="logo-part">
            {newOrder.restaurantAvatar !== 'blank' ?
              <img src={newOrder.restaurantAvatar} alt={`Logo of ${newOrder.restaurantName} restaurant`} /> :
              <img src={blank} alt={`Logo of ${newOrder.restaurantName} restaurant`} />
            }
          </div>
          <div className="info-part">
            <div className="order-date">Date: <strong>{newOrder.date}</strong></div>
            <div className="order-paid">Paid: <strong>{newOrder.paid} PLN</strong></div>
            <div className="order-paid">Payment: <strong>{newOrder.paymentMethod}</strong></div>
            <div className="order-paid">Adress: <strong>{newOrder.adress}</strong></div>
            <div className="order-message">Message: <strong>{newOrder.message}</strong></div>
          </div>
        </div>
        <div className="items-part">
          <h4>{newOrder.restaurantName}</h4>
          <ul>
            {newOrder.products.map(product => <li key={product._id}>{product.productName} - {product.productPrice} PLN</li>)}
            <li key="delivery">Delivery - {chosenRestaurant.delivery.deliveryCost <= newOrder.paid ? <span className='free'>Free!</span> : chosenRestaurant.delivery.deliveryCost + "PLN"} </li>
          </ul>
        </div>
      </div>
      <div className="back-btn">
        <Link onClick={() => setChosenRestaurant(null)} to="/customer/offer">Back to Offer</Link>
      </div>
    </div>
  );
}
export default SuccessOrder;
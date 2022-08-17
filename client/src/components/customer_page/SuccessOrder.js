import blank from '../../assets/img/logo/blank.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
const SuccessOrder = () => {
  const { setChosenRestaurant, chosenRestaurant, loggedUser } = useContext(AppContext);
  const [order, setOrder] = useState([]);
  const [init, setInit] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:4000/API/customers/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => setOrder(data.orders[data.orders.length - 1]));
  }, []);

  useEffect(() => {
    if ((Object.keys(order).length) === 0) setInit(false);
    else setInit(true);
  }, [order])
  return (
    <div className="success-order">
      <h2>Success!</h2>
      <h3>Your Order:</h3>
      <div className="order">
        <div className="order__information">
          <div className="logo-part">
            {order.restaurantAvatar !== 'blank' ?
              <img src={order.restaurantAvatar} alt={`Logo of ${order.restaurantName} restaurant`} /> :
              <img src={blank} alt={`Logo of ${order.restaurantName} restaurant`} />
            }
          </div>
          <div className="info-part">
            <div className="order-date">Date: <strong>{order.date}</strong></div>
            <div className="order-paid">Paid: <strong>{order.paid} PLN</strong></div>
            <div className="order-paid">Payment: <strong>{order.paymentMethod}</strong></div>
            <div className="order-paid">Adress: <strong>{order.adress}</strong></div>
            <div className="order-message">Message: <strong>{order.message}</strong></div>
          </div>
        </div>
        <div className="items-part">
          <h4>{order.restaurantName}</h4>
          <ul>
            {init && order.products.map(product => <li key={product._id}>{product.productName} - {product.productPrice} PLN</li>)}
            <li key="delivery">Delivery - {chosenRestaurant.delivery.deliveryCost <= order.paid ? <span className='free'>Free!</span> : chosenRestaurant.delivery.deliveryCost + "PLN"} </li>
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
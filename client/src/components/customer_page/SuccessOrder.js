import blank from '../../assets/img/logo/blank.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
const SuccessOrder = () => {
  const { setChosenRestaurant } = useContext(AppContext);
  const restaurantAvatar = 'blank';
  const restaurantName = "Saray Kebab"
  const date = '26.06.2022 15:34';
  const paid = 10.99;
  const paymentMethod = 'Cash';
  const message = 'None';
  return (
    <div className="success-order">
      <h2>Success!</h2>
      <h3>Your Order:</h3>
      <div className="order">
        <div className="order__information">
          <div className="logo-part">
            {restaurantAvatar !== 'blank' ?
              <img src={restaurantAvatar} alt={`Logo of ${restaurantName} restaurant`} /> :
              <img src={blank} alt={`Logo of ${restaurantName} restaurant`} />
            }
          </div>
          <div className="info-part">
            <div className="order-date">Date: <strong>{date}</strong></div>
            <div className="order-paid">Paid: <strong>{paid} PLN</strong></div>
            <div className="order-paid">Payment: <strong>{paymentMethod}</strong></div>
            <div className="order-message">Message: <strong>{message}</strong></div>
          </div>
        </div>
        <div className="items-part">
          <h4>{restaurantName}</h4>
          <ul>
            {/* {products.map(product => <li key={product._id}>{product.productName} - {product.productPrice} PLN</li>)} */}
            <li >Kebab - 29.99 PLN</li>
            <li >Kebab - 29.99 PLN</li>
            <li >Kebab - 29.99 PLN</li>
            <li >Kebab - 29.99 PLN</li>
            <li key="delivery">Delivery - 19.99 PLN</li>
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
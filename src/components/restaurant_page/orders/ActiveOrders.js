import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import MiniFooter from '../../features/MiniFooter';
import blank from '../../../assets/img/blank-photo.png';
const ActiveOrders = () => {
  const { setNotifications, loggedUser, setBalance } = useContext(AppContext);
  const [numberOfActiveOrders, setNumberOfActiveOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [reverse, setReverse] = useState([]);
  const [ordersValue, setOrdersValue] = useState(0);

  const handleCompleteOrder = () => {
    // fetch
  }
  const countStartOverallOrdersValue = (orders) => {
    let amount = 0;
    orders.orders.forEach(order => { if (order.active) amount += order.paid });
    setOrdersValue(amount.toFixed(2));
    setBalance(amount);
    console.log(amount);
  }

  const fetchData = async () => {
    await fetch(`http://localhost:4000/API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data)
      });
  }

  useEffect(() => {
    const orderValues = document.querySelectorAll('.order-info__value');
    setNumberOfActiveOrders(orderValues.length);
    setNotifications(orderValues.length);
  }, [numberOfActiveOrders, setNotifications]);

  useEffect(() => {
    fetchData();
    document.body.style.overflowY = 'visible';
  }, [loggedUser]);

  useEffect(() => {
    if (Object.keys(orders).length !== 0) setReverse(orders.orders.reverse());
  }, [orders]);
  return (
    <div className="orders-section">
      <div className="orders__active-orders">
        {Object.keys(orders).length !== 0 ? orders.orders.map(order => {
          const { _id, customerName, customerLastname, customerAdress, customerAvatar, date, message, paid, paymentMethod, products } = order;
          return (
            <div data-id={_id} onClick={handleCompleteOrder} key={_id} className="single-order single-order--active">
              <div className="order-header">
                <h4>Order #000</h4>
                <h5>{date}</h5>
              </div>
              <div className="order-image">
                {customerAvatar !== 'blank' ? <img src={customerAvatar} alt={`${customerName} ${customerLastname}`} /> :
                  <img src={blank} alt={`${customerName} ${customerLastname}`} />}
              </div>
              <div className="order-customer">
                <strong>{customerName} {customerLastname}</strong>
              </div>
              {products.map(product => <div className='order-item'>{product.productName} - {product.productPrice} PLN</div>)}
              <div className='order-info'>
                <div className='order-info__value'>Order Value: <span className="color color--info">{paid} PLN</span></div>
                <div className='order-info__adress'>Adress: <span className="color color--info">{customerAdress}</span></div>
                <div className='order-info__payment'>Payment: <span className='color color--bad'>{paymentMethod}</span></div>
                <div className='order-info__message'>Customer message: <span className='color color--good'>{message}</span> </div>
              </div>
            </div>
          )
        }) : <span className='info'>Orders list is empty</span>}
      </div>
      <MiniFooter />
    </div>
  );
}

export default ActiveOrders;
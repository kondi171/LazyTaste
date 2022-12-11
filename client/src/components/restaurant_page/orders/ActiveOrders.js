import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import MiniFooter from '../../features/MiniFooter';
import blank from '../../../assets/img/logo/blank.png';
const ActiveOrders = () => {
  const { setNotifications, loggedUser, setBalance } = useContext(AppContext);
  const [numberOfActiveOrders, setNumberOfActiveOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const handleCompleteOrder = e => {
    const body = new URLSearchParams({
      orderID: e.currentTarget.dataset.id,
    })
    fetch(process.env.REACT_APP_DB_CONNECT + `API/restaurants/${loggedUser._id}`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
      body: body,
    });
    fetchData();
  }

  const fetchData = async () => {
    let balance = 0;
    await fetch(process.env.REACT_APP_DB_CONNECT + `API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        const activeOrders = data.orders.filter(order => order.active === true);
        setOrders(activeOrders.reverse());
        setOrdersLoaded(true);
        setNotifications(activeOrders.length);
        const completedOrders = data.orders.filter(order => {
          const today = new Date();
          const currentDate = `${today.getDate() > 10 ? today.getDate() : '0' + today.getDate()}.${today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}.${today.getFullYear()}`;
          if (order.active === false && currentDate === order.date.slice(0, 10)) return order;
          else return null;
        });
        completedOrders.forEach(completeOrder => balance += completeOrder.paid);
      });
    setBalance(balance.toFixed(2));
  }

  useEffect(() => {
    const orderValues = document.querySelectorAll('.order-info__value');
    setNumberOfActiveOrders(orderValues.length);
    setNotifications(orderValues.length);
  }, [numberOfActiveOrders, setNotifications]);

  useEffect(() => {
    fetchData();
    document.body.style.overflowY = 'visible';
  }, [orders]);

  const initOrders = () => {
    const array = orders.map(order => {
      const { _id, customerName, customerLastname, customerAdress, customerAvatar, date, message, paid, paymentMethod, products, active } = order;
      if (active === true) {
        return (
          <div data-id={_id} onClick={handleCompleteOrder} key={_id} className="single-order single-order--active">
            <div className="order-header">
              <h4>Order #{_id}</h4>
              <h5>{date}</h5>
            </div>
            <div className="order-image">
              {customerAvatar !== 'blank' ? <img src={customerAvatar} alt={`${customerName} ${customerLastname}`} /> :
                <img src={blank} alt={`${customerName} ${customerLastname}`} />}
            </div>
            <div className="order-customer">
              <strong>{customerName} {customerLastname}</strong>
            </div>
            {products.map(product => <div key={product._id} className='order-item'>{product.productName} - {product.productPrice} PLN</div>)}
            <div key="delivery" className='order-item'>
              Delivery - {paid - loggedUser.delivery.deliveryCost >= loggedUser.delivery.orderValueToFreeDelivery ? <span className='free'>Free!</span> : loggedUser.delivery.deliveryCost + " PLN"}</div>
            <div className='order-info'>
              <div className='order-info__value'>Order Value: <span className="color color--info">{paid} PLN</span></div>
              <div className='order-info__adress'>Adress: {customerAdress === "Pickup" ? <span className='color color--good'>{customerAdress}</span> : <span className="color color--info">{customerAdress}</span>}</div>
              <div className='order-info__payment'>Payment: {paymentMethod === 'Cash' ? <span className='color color--bad'>{paymentMethod}</span> : <span className='color color--good'>{paymentMethod}</span>}</div>
              <div className='order-info__message'>Customer message: {message === 'none' ? <span className='color color--good'>{message}</span> : <span className='color color--info'>{message}</span>} </div>
            </div>
          </div>
        )
      } else return null;
    });
    if (array.length === 0) return <span className='info info--active'>You don't have active Orders!</span>
    else return array;
  }

  return (
    <div className="orders-section">
      <div className="orders__active-orders">
        {ordersLoaded && initOrders()}
      </div>
      <MiniFooter />
    </div>
  );
}

export default ActiveOrders;
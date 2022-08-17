import { useContext, useEffect, useState } from 'react';
import blank from '../../../assets/img/logo/blank.png';
import { AppContext } from '../../AppContext';
import MiniFooter from '../../features/MiniFooter';

const ArchiveOrders = () => {
  const { loggedUser } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [reverse, setReverse] = useState([]);
  const [archiveOrdersAmount, setArchiveOrdersAmount] = useState(0);

  const fetchData = async () => {
    await fetch(`http://localhost:4000/API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        const archiveOrders = data.orders.filter(order => {
          const today = new Date();
          const currentDate = `${today.getDate() > 10 ? today.getDate() : '0' + today.getDate()}.${today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}.${today.getFullYear()}`;
          if (order.active === false && currentDate !== order.date.slice(0, 10)) return order;
        })
        setArchiveOrdersAmount(archiveOrders.length);
      });
  }

  useEffect(() => {
    fetchData();
    document.body.style.overflowY = 'visible';
  }, []);

  useEffect(() => {
    if (Object.keys(orders).length !== 0) setReverse(orders.orders.reverse());
  }, [orders]);
  return (
    <div className="orders-section">
      <div className="orders__archive-orders">
        {Object.keys(orders).length !== 0 && orders.orders.map(order => {
          const { _id, customerName, customerLastname, customerAdress, customerAvatar, date, message, paid, paymentMethod, products, active, deliveryCost } = order;
          const today = new Date();
          const currentDate = `${today.getDate() > 10 ? today.getDate() : '0' + today.getDate()}.${today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}.${today.getFullYear()}`;
          if (active === false && currentDate !== date.slice(0, 10)) {
            return (
              <div data-id={_id} key={_id} className="single-order single-order--archive">
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
                {products.map(product => <div className='order-item'>{product.productName} - {product.productPrice} PLN</div>)}
                <div key="delivery" className='order-item'>Delivery - {deliveryCost} PLN</div>
                <div className='order-info'>
                  <div className='order-info__value'>Order Value: <span className="color color--info">{paid} PLN</span></div>
                  <div className='order-info__adress'>Adress: {customerAdress === "Pickup" ? <span className='color color--good'>{customerAdress}</span> : <span className="color color--info">{customerAdress}</span>}</div>
                  <div className='order-info__payment'>Payment: {paymentMethod === 'Cash' ? <span className='color color--bad'>{paymentMethod}</span> : <span className='color color--good'>{paymentMethod}</span>}</div>
                  <div className='order-info__message'>Customer message: {message === 'none' ? <span className='color color--good'>{message}</span> : <span className='color color--info'>{message}</span>} </div>
                </div>
              </div>
            )
          }
        })}
        {archiveOrdersAmount === 0 && <span className='info info--archive'>Archive orders list is empty</span>}
      </div>
      <MiniFooter />
    </div>
  );
}
export default ArchiveOrders;
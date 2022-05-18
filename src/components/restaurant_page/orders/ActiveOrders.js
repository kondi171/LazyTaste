import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import MiniFooter from '../../features/MiniFooter';

const ActiveOrders = () => {
  const { setNotifications } = useContext(AppContext);

  const [numberOfActiveOrders, setNumberOfActiveOrders] = useState(0);

  const handleCompleteOrder = () => {
    console.log(this);
  }

  useEffect(() => {
    const orderValues = document.querySelectorAll('.order-info__value');
    setNumberOfActiveOrders(orderValues.length);
    setNotifications(orderValues.length);
  }, [numberOfActiveOrders]);

  return (
    <div className="orders-section">
      <div className="orders__active-orders">
        {numberOfActiveOrders <= 0 ? <span className='info'>Orders list is empty</span> : null}
        <div className="single-order single-order--active">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info">62.98 PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div onClick={handleCompleteOrder.bind(this)} className="single-order single-order--active">
          <div className="order-header">
            <h4>Order #002</h4>
            <h5>13:21 22-04-2022</h5>
          </div>
          <div className='order-item'>Sałatka - 11.99PLN</div>
          <div className='order-item'>Woda Mineralna 0.5l - 4.50 PLN</div>
          <div className='order-item'>Ciastko Owsiane - 3.00 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info">21.98 PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--active">
          <div className="order-header">
            <h4>Order #003</h4>
            <h5>13:39 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XXL - 24.99 PLN</div>
          <div className='order-item'>Coca-Cola 0.85l - 9.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info">31.98 PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--active">
          <div className="order-header">
            <h4>Order #004</h4>
            <h5>15:01 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XXL - 24.99 PLN</div>
          <div className='order-item'>Coca-Cola 0.85l - 9.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info">61.98 PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--active">
          <div className="order-header">
            <h4>Order #005</h4>
            <h5>16:15 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info">61.98 PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default ActiveOrders;
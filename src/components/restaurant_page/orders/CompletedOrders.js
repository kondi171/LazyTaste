import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContext';
import MiniFooter from '../../features/MiniFooter';

const CompletedOrders = () => {

  const [numberOfCompletedOrders, setNumberOfCompletedOrders] = useState(0);
  const [sumOfTodaysOrders, setSumOfTodaysOrders] = useState(0);

  useEffect(() => {
    let sum = 0;
    const orders = document.querySelectorAll('.single-order');
    const orderValues = document.querySelectorAll('.single-order .value');
    orderValues.forEach(orderValue => {
      sum += parseFloat(orderValue.textContent);
      setSumOfTodaysOrders(sum);
    });
    setNumberOfCompletedOrders(orders.length);

  }, [numberOfCompletedOrders]);
  return (
    <div className="orders-section">
      <div className="orders__completed-orders">
        <div className="searchbox">
          <div className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input className="search-input" placeholder="Type to search..." type="text" />
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </div>
        </div>
        {numberOfCompletedOrders <= 0 ? <span className='info'>List of Archive Orders is empty</span> : null}
        <div className="single-order single-order--completed">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info"><span className='value'>61.98</span> PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--completed">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info"><span className='value'>61.98</span> PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--completed">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info"><span className='value'>61.98</span> PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--completed">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info"><span className='value'>61.98</span> PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--completed">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info"><span className='value'>61.98</span> PLN</span></div>
            <div className='order-info__adress'>Adress: <span className="color color--info">Warszawska 145, Kielce 25-324</span></div>
            <div className='order-info__payment'>Payment: <span className='color color--bad'>Cash</span></div>
            <div className='order-info__message'>Customer message: <span className='color color--good'>Empty</span> </div>
          </div>
        </div>
        <div className="single-order single-order--completed">
          <div className="order-header">
            <h4>Order #001</h4>
            <h5>12:24 22-04-2022</h5>
          </div>
          <div className='order-item'>Kebab XL - 21.99 PLN</div>
          <div className='order-item'>Pizza 45cm - 39.99 PLN</div>
          <div className='order-info'>
            <div className='order-info__value'>Order Value: <span className="color color--info"><span className='value'>61.98</span> PLN</span></div>
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
export default CompletedOrders;
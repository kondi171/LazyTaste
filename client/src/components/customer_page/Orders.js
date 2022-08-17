import blank from "../../assets/img/logo/blank.png";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import CustomerOrdersSearchbar from '../features/searchbars/CustomerOrdersSearchbar';
import LoadingLazyAssistant from "../features/LoadingLazyAssistant";
const Orders = () => {
  const { loggedUser, predictedRestaurant, activateLazyAssistant } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [searchType, setSearchType] = useState('searchByName');
  const [ordersValue, setOrdersValue] = useState(0);

  const handleSearchingOptions = e => {
    const radio = document.querySelector('input[name="radio"]:checked');
    const searchType = radio.getAttribute('id');
    setSearchType(searchType);
  }

  const countStartOverallOrdersValue = (orders) => {
    let amount = 0;
    orders.orders.forEach(order => amount += order.paid)
    setOrdersValue(amount.toFixed(2));
  }

  const fetchData = async () => {
    await fetch(`http://localhost:4000/API/customers/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setFilterOrders(data.orders);
        countStartOverallOrdersValue(data)
      });
  }
  const filteredOrders = () => {
    const array = filterOrders.map(order => {
      const { _id, restaurantName, restaurantAvatar, paid, message, date, products, deliveryCost, paymentMethod, adress } = order;
      return (
        <div className="orders__single-order" key={_id}>
          <div className="single-order__information">
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
              <div className="order-paid">Adress: <strong>{adress}</strong></div>
              <div className="order-message">Message: <strong>{message}</strong></div>
            </div>
          </div>

          <div className="items-part">
            <h4>{restaurantName}</h4>
            <ul>
              {products.map(product => <li key={product._id}>{product.productName} - {product.productPrice} PLN</li>)}
              <li key="delivery">Delivery - {deliveryCost === 0 ? <span className='free'>Free!</span> : deliveryCost + "PLN"} </li>
            </ul>
          </div>

        </div>
      )
    });
    if (array.length === 0) return <p className="empty-orders">No orders!</p>
    else return array.reverse();
  }

  useEffect(() => {
    fetchData();
  }, [loggedUser]);
  return (
    <section className="orders">
      <div className="searchbox">
        <CustomerOrdersSearchbar data={orders.orders} setFilter={setFilterOrders} searchType={searchType} setOrdersValue={setOrdersValue} />
      </div>
      <div className="row-view">
        <div className="column-view">
          <div className="searching-options">
            <h3 className="searching-options__title">
              <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
              <span>Searching Options</span>
            </h3>
            <form className='radio-container'>

              <div className="radio">
                <input id="searchByName" type="radio" name="radio" onClick={handleSearchingOptions} />
                <label className="radio-label" htmlFor="searchByName">Search by Name</label>
              </div>

              <div className="radio">
                <input id="searchByPrice" type="radio" name="radio" onClick={handleSearchingOptions} />
                <label className="radio-label" htmlFor="searchByPrice">Search by Price</label>
              </div>

              <div className="radio">
                <input id="searchByDate" type="radio" name="radio" onClick={handleSearchingOptions} />
                <label className="radio-label" htmlFor="searchByDate">Search by Date</label>
              </div>

              <div className="radio">
                <input id="searchByMessage" type="radio" name="radio" onClick={handleSearchingOptions} />
                <label className="radio-label" htmlFor="searchByMessage">Search by Message</label>
              </div>
            </form>
          </div>
          <div className="expenses">
            {activateLazyAssistant ? <>
              {(Object.keys(orders).length) === 0 ? <div className="loading-message"> Lazy Assistant is predicting restaurants, please be patient</div> :
                <span>You spent<i> {ordersValue}</i>PLN</span>
              }
            </> : <span>You spent<i> {ordersValue}</i>PLN</span>}
          </div>
        </div>
        <div className="orders__order-list">
          <h3>Your Orders:</h3>
          {activateLazyAssistant ? <>
            {(Object.keys(orders).length) === 0 ? <div className="lazy-assistant" style={{ marginTop: '15vh' }}><LoadingLazyAssistant /></div> : filteredOrders()}
          </> : filteredOrders()}
        </div>
      </div>
      <br />
    </section >
  );
}

export default Orders;
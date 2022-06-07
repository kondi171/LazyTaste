import blank from "../../assets/img/blank-photo.png";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import CustomerOrdersSearchbar from '../features/searchbars/CustomerOrdersSearchbar';
const Orders = () => {
  const { loggedUser } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [reverse, setReverse] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [searchType, setSearchType] = useState('searchByName');
  const [ordersValue, setOrdersValue] = useState(0);
  const [isOrdersEmpty, setIsOrdersEmpty] = useState(true);


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
        countStartOverallOrdersValue(data)
      });
  }

  useEffect(() => {
    fetchData();
  }, [loggedUser]);

  useEffect(() => {
    if (Object.keys(orders).length !== 0) setReverse(orders.orders.reverse());
  }, [orders]);

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
            <span>You spent<i> {ordersValue}</i>PLN</span>
          </div>
        </div>
        <div className="orders__order-list">
          <h3>Your Orders:</h3>
          {console.log(isOrdersEmpty)}
          {!isOrdersEmpty && <p className="empty-orders">You don't have any orders yet!</p>}
          {Object.keys(orders).length !== 0 &&
            filterOrders.length === 0 ? orders.orders.map(order => {
              const { _id, restaurantName, restaurantAvatar, paid, message, date, products } = order;
              return (
                <div className="orders__single-order" key={_id}>
                  <div className="logo-part">
                    {restaurantAvatar !== 'blank' ?
                      <img src={restaurantAvatar} alt={`Logo of ${restaurantName} restaurant`} /> :
                      <img src={blank} alt={`Logo of ${restaurantName} restaurant`} />

                    }
                  </div>
                  <div className="items-part">
                    <h4>{restaurantName}</h4>
                    <ul>
                      {products.map(product => <li key={product._id}>{product.productName} - {product.productPrice}</li>)}
                    </ul>
                  </div>
                  <div className="info-part">
                    <div className="order-date">Date: <strong>{date}</strong></div>
                    <div className="order-paid">Paid: <strong>{paid} PLN</strong></div>
                    <div className="order-message">Message: <strong>{message}</strong></div>
                  </div>
                </div>
              )
            }) :
            filterOrders.map(order => {
              const { _id, restaurantName, restaurantAvatar, paid, message, date, products } = order;
              return (
                <div className="orders__single-order" key={_id}>
                  <div className="logo-part">
                    {restaurantAvatar !== 'blank' ?
                      <img src={restaurantAvatar} alt={`Logo of ${restaurantName} restaurant`} /> :
                      <img src={blank} alt={`Logo of ${restaurantName} restaurant`} />
                    }
                  </div>
                  <div className="items-part">
                    <h4>{restaurantName}</h4>
                    <ul>
                      {products.map(product => <li key={product._id}>{product.productName} - {product.productPrice}</li>)}
                    </ul>
                  </div>
                  <div className="info-part">
                    <div className="order-date">Date: <strong>{date}</strong></div>
                    <div className="order-paid">Paid: <strong>{paid} PLN</strong></div>
                    <div className="order-message">Message: <strong>{message}</strong></div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <br />
    </section >
  );
}

export default Orders;
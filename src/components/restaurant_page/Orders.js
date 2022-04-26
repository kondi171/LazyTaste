import logo from '../../assets/img/restaurant-logo.jpg';
const Orders = () => {
  let numberOfActiveOrders = 1;
  let numberOfReadyOrders = 1;
  return (
    <section className="restaurant-orders">
      <div className="banner">
        <img src={logo} alt="Logo of restaurant" />
        <h2 className="title">Try this Kebab!</h2>
        <div className="balance">
          Today's balance:
          <span>1241.98 PLN</span>
        </div>
      </div>
      <div className="orders">
        <h3 className="orders__title">Active Orders</h3>
        <div className="orders__active-orders">
          {numberOfActiveOrders <= 0 ? <span className='info'>Orders list is empty</span> : ''}

          <i className="fa fa-file single-order single-order--active" aria-hidden="true">
            <h4>Order #001</h4>
            <div>Kebab XL</div>
            <div>Pizza 45cm</div>
          </i>
          <i className="fa fa-file single-order single-order--active" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--active" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--active" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--active" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--active" aria-hidden="true"></i>
        </div>
        <h3 className="orders__title">Done Orders</h3>
        <div className="orders__ready-orders">
          {numberOfReadyOrders <= 0 ? <span className='info'>No order has been performed yet</span> : ''}
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
          <i className="fa fa-file single-order single-order--inactive" aria-hidden="true"></i>
        </div>
      </div>

    </section>
  );
}

export default Orders;
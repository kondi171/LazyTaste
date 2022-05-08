import logo from '../../../assets/img/restaurant-logo.jpg';
import { NavLink } from 'react-router-dom'

const Orders = () => {
  return (
    <section className="restaurant-orders">
      <div className="banner">
        <NavLink id='home' className='navlink' to='/restaurant/home'><img src={logo} alt="Logo of restaurant" /></NavLink>
        <h2 className="title">Try this Kebab!</h2>
        <div className="balance">
          Today's balance:
          <span>1241.98 PLN</span>
        </div>
      </div>
      <nav className="orders-navigation">
        <NavLink className='navlink' to='/restaurant/orders/active'>
          <div className="orders__title active">Active Orders</div>
        </NavLink>
        <NavLink className='navlink' to='/restaurant/orders/completed'>
          <div className="orders__title completed">Completed Orders</div>
        </NavLink>
        <NavLink className='navlink' to='/restaurant/orders/archive'>
          <div className="orders__title archive">Archive Orders</div>
        </NavLink>
      </nav>
    </section>
  );
}
export default Orders;
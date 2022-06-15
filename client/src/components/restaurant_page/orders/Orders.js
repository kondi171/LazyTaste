import blank from '../../../assets/img/logo/blank.png';
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

const Orders = () => {
  const { balance, loggedUser } = useContext(AppContext);

  return (
    <section className="restaurant-orders">
      <div className="banner">
        <NavLink id='home' className='navlink' to='/restaurant/home'>{loggedUser.avatar === 'blank' ? <img src={blank} alt={`Avatar of ${loggedUser.name}`} /> :
          <img src={loggedUser.avatar} alt={`Avatar of ${loggedUser.name}`} />}</NavLink>
        <h2 className="title">{loggedUser.name}</h2>
        <div className="balance">
          Today's balance:
          <span>{balance} PLN</span>
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
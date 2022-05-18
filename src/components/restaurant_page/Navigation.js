import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
const Navigation = () => {
  const { notifications } = useContext(AppContext);
  return (
    <nav className='navigation'>
      <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      <NavLink id='home' className='navlink tooltip' to='/restaurant/home'>
        <i className='fa fa-home' aria-hidden="true"></i>
        <span className="tooltip-text">Home</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/restaurant/menu'>
        <i className="fa fa-bars icon" aria-hidden="true"></i>
        <span className="tooltip-text">Menu</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/restaurant/orders/active'>
        <i className="fa fa-shopping-cart" aria-hidden="true">
          <strong>{notifications}</strong>
        </i>
        <span className="tooltip-text">Orders</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/restaurant/promotion'>
        <i className="fa fa-product-hunt" aria-hidden="true"></i>
        <span className="tooltip-text">Promotions</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/restaurant/settings'>
        <i className="fa fa-cog" aria-hidden="true"></i>
        <span className="tooltip-text">Settings</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
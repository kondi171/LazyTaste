import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className='navigation'>
      <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      <NavLink id='home' className='navlink tooltip' to='/customer/home'>
        <i className='fa fa-home' aria-hidden="true"></i>
        <span className="tooltip-text">Home</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/customer/offer'>
        <i className="fa fa-cutlery" aria-hidden="true"></i>
        <span className="tooltip-text">Offer</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/customer/orders'>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        <span className="tooltip-text">Orders</span>
      </NavLink>
      <NavLink className='navlink tooltip' to='/customer/settings'>
        <i className="fa fa-cog" aria-hidden="true"></i>
        <span className="tooltip-text">Settings</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
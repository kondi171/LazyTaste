import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className='navigation'>
      <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      <NavLink id='home' className='navlink' to='/customer/home'>
        <i className='fa fa-home' aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/customer/offer'>
        <i className="fa fa-cutlery" aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/customer/orders'>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/customer/settings'>
        <i className="fa fa-cog" aria-hidden="true"></i>
      </NavLink>
    </nav>
  );
}

export default Navigation;
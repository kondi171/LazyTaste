import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className='navigation'>
      <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      <NavLink id='home' className='navlink' to='/restaurant/home'>
        <i className='fa fa-home' aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/restaurant/menu'>
        <i className="fa fa-bars icon" aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/restaurant/promotion'>
        <i className="fa fa-product-hunt" aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/restaurant/orders'>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
      </NavLink>
      <NavLink className='navlink' to='/restaurant/settings'>
        <i className="fa fa-cog" aria-hidden="true"></i>
      </NavLink>
    </nav>
  );
}

export default Navigation;
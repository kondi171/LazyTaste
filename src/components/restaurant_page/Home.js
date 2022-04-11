import Konrad from '../../assets/img/Konrad.png';
import Navigation from '../features/Navigation';
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
    <section className="home">
      <Navigation />
      <div className="home__account-column">
        <img src={Konrad} alt="Avatar" />
        <h3>Try This Kebab</h3>
        <div className="account-column__info">
          <div className='single-info'>
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <span>Mail</span>
          </div>
          <span>wk.k.nowak@gmail.com</span>
          <div className='single-info'>
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span>Phone</span>
          </div>
          <span>+48 690 992 435</span>
          <div className='single-info'>
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            <span>Adress</span>
          </div>
          <span>Leszczyńska 69C/69, 25-325 Kielce</span>
        </div>
        <div className="account-column__logout">
          <button>Logout</button>
        </div>
      </div>
      <div className="home__control-panel">
        <div className="control-panel__main-box">
          <div className="menu">
            <div className="menu__title"><i className="fa fa-bars icon" aria-hidden="true"></i>Menu</div>
          </div>
        </div>
        <div className="control-panel__under-boxes">
          <NavLink to='customer/offer' className="under-box">
            <h2>Set Promotion</h2>
            <i className="fa fa-product-hunt icon" aria-hidden="true"></i>
          </NavLink>
          <NavLink to='customer/orders' className="under-box">
            <h2>Orders</h2>
            <i className="fa fa-shopping-cart icon" aria-hidden="true"></i>
          </NavLink>
        </div>
        <div className="promotions">
          <h5>Competitors promotions</h5>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero error eligendi magni tempore at in debitis, ullam nobis voluptatum facilis.
        </div>
      </div>
    </section>
  );
}

export default Home;
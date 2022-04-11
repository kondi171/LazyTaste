import Home from './Home';
import Orders from './Orders';
import Menu from './Menu';
import Settings from './Settings';

const RestaurantPage = () => {
  return (
    <div className="restaurant-wrapper">
      <Home />
      <Orders />
      <Menu />
      <Settings />
    </div>
  );
}

export default RestaurantPage;
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
const RestaurantOutlet = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RestaurantOutlet;

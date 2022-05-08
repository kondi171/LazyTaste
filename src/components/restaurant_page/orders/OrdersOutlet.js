import { Outlet } from 'react-router-dom';
import Orders from '../../restaurant_page/orders/Orders';
import Navigation from '../Navigation';
const OrdersOutlet = () => {
  return (
    <>
      <Navigation />
      <Orders />
      <Outlet />
    </>
  );
}
export default OrdersOutlet;
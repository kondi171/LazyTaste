import { Outlet } from 'react-router-dom';
import Orders from './Orders';
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
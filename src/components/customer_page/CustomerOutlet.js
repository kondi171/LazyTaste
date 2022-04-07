import { Outlet } from 'react-router-dom';
import CustomerPage from './CustomerPage';
const CustomerOutlet = () => {
  return (
    <>
      <CustomerPage />
      <Outlet />
    </>
  );
}

export default CustomerOutlet;

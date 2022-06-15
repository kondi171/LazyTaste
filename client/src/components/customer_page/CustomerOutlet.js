import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
const CustomerOutlet = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default CustomerOutlet;

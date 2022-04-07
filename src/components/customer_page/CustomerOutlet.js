import { Outlet } from 'react-router-dom';
import Navigation from '../features/Navigation';
const CustomerOutlet = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default CustomerOutlet;

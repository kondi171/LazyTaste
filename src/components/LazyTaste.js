import { Routes, Route } from 'react-router-dom';
import CustomerOutlet from './customer_page/CustomerOutlet';
import Home from './customer_page/Home';
import Offer from './customer_page/Offer';
import Orders from './customer_page/Orders';
import Settings from './customer_page/Settings';
import LandingPage from './landing_page/LandingPage';
const LazyTaste = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<LandingPage />} />
        {/* <Route path='customer' element={<CustomerOutlet />} > */}
        <Route path='customer' exact element={<Home />} />
        {/* <Route path='customer/home' element={<Home />} /> */}
        <Route path='customer/offer' element={<Offer />} />
        <Route path='customer/orders' element={<Orders />} />
        <Route path='customer/settings' element={<Settings />} />
        {/* </Route> */}
        <Route path='*' exact element={<Home />} />
      </Routes>
    </>
  );
}

export default LazyTaste;
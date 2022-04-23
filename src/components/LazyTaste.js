import { Routes, Route } from 'react-router-dom';

import CustomerOutlet from './customer_page/CustomerOutlet';
import CustomerHome from './customer_page/Home';
import CustomerOffer from './customer_page/Offer';
import CustomerOrders from './customer_page/Orders';
import CustomerSettings from './customer_page/Settings';

import RestaurantHome from './restaurant_page/Home';
import RestaurantMenu from './restaurant_page/Menu';
import RestaurantOrders from './restaurant_page/Orders';
import RestaurantSettings from './restaurant_page/Settings';
import RestaurantPromotion from './restaurant_page/Promotion';
import LandingPage from './landing_page/LandingPage';
import RestaurantOutlet from './restaurant_page/RestaurantOutlet';
const LazyTaste = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {/* Customer */}
        <Route path='customer' element={<CustomerOutlet />}>
          <Route path='/customer' exact element={<CustomerHome />} />
          <Route path='/customer/home' element={<CustomerHome />} />
          <Route path='/customer/offer' element={<CustomerOffer />} />
          <Route path='/customer/orders' element={<CustomerOrders />} />
          <Route path='/customer/settings' element={<CustomerSettings />} />
          <Route path='*' element={<CustomerHome />} />
        </Route>
        {/* Restaurant */}
        <Route path='restaurant' element={<RestaurantOutlet />}>
          <Route path='/restaurant' exact element={<RestaurantHome />} />
          <Route path='/restaurant/home' element={<RestaurantHome />} />
          <Route path='/restaurant/menu' element={<RestaurantMenu />} />
          <Route path='/restaurant/promotion' element={<RestaurantPromotion />} />
          <Route path='/restaurant/orders' element={<RestaurantOrders />} />
          <Route path='/restaurant/settings' element={<RestaurantSettings />} />
          <Route path='*' element={<RestaurantHome />} />
        </Route>

      </Routes>
    </>
  );
}

export default LazyTaste;
import { Routes, Route } from 'react-router-dom';

import LandingPage from './landing_page/LandingPage';

import CustomerHome from './customer_page/Home';
import CustomerOffer from './customer_page/Offer';
import CustomerOrders from './customer_page/Orders';
import CustomerOutlet from './customer_page/CustomerOutlet';
import CustomerSettings from './features/options/Settings';
import RestaurantHome from './restaurant_page/Home';
import RestaurantMenu from './restaurant_page/menu/Menu';
import RestaurantSettings from './features/options/Settings';
import RestaurantPromotion from './restaurant_page/Promotion';
import RestaurantOutlet from './restaurant_page/RestaurantOutlet';

import RestaurantOrdersActive from './restaurant_page/orders/ActiveOrders';
import RestaurantOrdersCompleted from './restaurant_page/orders/CompletedOrders';
import RestaurantOrdersArchive from './restaurant_page/orders/ArchiveOrders';
import OrdersOutlet from './restaurant_page/orders/OrdersOutlet';

const LazyTaste = () => {
  return (
    <nav className="router-navigation">
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
          <Route path='/restaurant/settings' element={<RestaurantSettings />} />
          <Route path='*' element={<RestaurantHome />} />
        </Route>
        {/* Orders */}
        <Route path='restaurant/orders' element={<OrdersOutlet />} >
          <Route path='/restaurant/orders' exact element={<RestaurantOrdersActive />} />
          <Route path='/restaurant/orders/active' element={<RestaurantOrdersActive />} />
          <Route path='/restaurant/orders/completed' element={<RestaurantOrdersCompleted />} />
          <Route path='/restaurant/orders/archive' element={<RestaurantOrdersArchive />} />
        </Route>
      </Routes>
    </nav>
  );
}

export default LazyTaste;
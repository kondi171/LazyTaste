import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import LandingPage from './landing_page/LandingPage';

import CustomerHome from './customer_page/Home';
import CustomerOffer from './customer_page/Offer';
import RestaurantPage from './customer_page/RestaurantPage';
import CustomerOrders from './customer_page/Orders';
import CustomerOutlet from './customer_page/CustomerOutlet';
import CustomerSettings from './features/options/Settings';
import RestaurantHome from './restaurant_page/Home';
import RestaurantMenu from './restaurant_page/menu/Menu';
import RestaurantSettings from './features/options/Settings';
import RestaurantCompetitors from './restaurant_page/Competitors';
import CompetitorPage from './restaurant_page/CompetitorPage';
import RestaurantOutlet from './restaurant_page/RestaurantOutlet';

import RestaurantOrdersActive from './restaurant_page/orders/ActiveOrders';
import RestaurantOrdersCompleted from './restaurant_page/orders/CompletedOrders';
import RestaurantOrdersArchive from './restaurant_page/orders/ArchiveOrders';
import OrdersOutlet from './restaurant_page/orders/OrdersOutlet';
import LazyAssistant from './customer_page/LazyAssistant';

const LazyTaste = () => {
  const { loggedUser } = useContext(AppContext);
  const [loggedCustomer, setLoggedCustomer] = useState(undefined);
  const [loggedRestaurant, setLoggedRestaurant] = useState(undefined);

  useEffect(() => {
    if (typeof loggedUser.lastname === 'undefined') setLoggedCustomer(false);
    else setLoggedCustomer(true);
    if (typeof loggedUser.NIP === 'undefined') setLoggedRestaurant(false);
    else setLoggedRestaurant(true);
  }, [loggedUser]);

  return (
    <nav className="router-navigation">
      <Routes>
        <Route path='*' element={<LandingPage />} />
        <Route path='/smart' element={<LazyAssistant />} />
        {loggedCustomer ? (
          <Route path='customer' element={<CustomerOutlet />}>
            <Route path='/customer' exact element={<CustomerHome />} />
            <Route path='/customer/home' element={<CustomerHome />} />
            <Route path='/customer/offer/*' element={<CustomerOffer />} />
            <Route path='/customer/offer/restaurant' element={<RestaurantPage />} />
            <Route path='/customer/orders' element={<CustomerOrders />} />
            <Route path='/customer/settings' element={<CustomerSettings />} />
            <Route path='*' element={<CustomerHome />} />
          </Route>
        ) : <Route path='/*' exact element={<Navigate to='/' />} />}
        {/* Restaurant */}
        {loggedRestaurant ? (
          <Route path='restaurant' element={<RestaurantOutlet />}>
            <Route path='/restaurant' exact element={<RestaurantHome />} />
            <Route path='/restaurant/home' element={<RestaurantHome />} />
            <Route path='/restaurant/menu' element={<RestaurantMenu />} />
            <Route path='/restaurant/competitors/*' element={<RestaurantCompetitors />} />
            <Route path='/restaurant/competitors/competitor' element={<CompetitorPage />} />
            <Route path='/restaurant/settings' element={<RestaurantSettings />} />
            <Route path='*' element={<RestaurantHome />} />
          </Route>
        ) : <Route path='/*' exact element={<Navigate to='/' />} />}
        {/* Orders */}
        {loggedRestaurant ? (
          <Route path='restaurant/orders' element={<OrdersOutlet />} >
            <Route path='/restaurant/orders' exact element={<RestaurantOrdersActive />} />
            <Route path='/restaurant/orders/active' element={<RestaurantOrdersActive />} />
            <Route path='/restaurant/orders/completed' element={<RestaurantOrdersCompleted />} />
            <Route path='/restaurant/orders/archive' element={<RestaurantOrdersArchive />} />
          </Route>
        ) : <Route path='/*' exact element={<Navigate to='/' />} />}
      </Routes>
    </nav>
  );
}

export default LazyTaste;
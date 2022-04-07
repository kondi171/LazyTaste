import { Routes, Route } from 'react-router-dom';
import CustomerPage from './customer_page/CustomerPage';
import LandingPage from './landing_page/LandingPage';
const LazyTaste = () => {
  return (
    <Routes>
      <Route path='' element={<LandingPage />} />
      <Route path='lazytaste' element={<CustomerPage />} />
    </Routes>
    // <LandingPage />
  );
}

export default LazyTaste;
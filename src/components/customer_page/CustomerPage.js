import Home from './Home';
import Offer from './Offer';
import Orders from './Orders';
import Settings from './Settings';
const CustomerPage = () => {
  return (
    <div className="customer-wrapper">
      <Home />
      <Offer />
      <Orders />
      <Settings />
    </div>
  );
}

export default CustomerPage;
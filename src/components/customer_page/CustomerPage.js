import Home from './Home';
import Offer from './Offer';
import Orders from './Orders';
const CustomerPage = () => {
  return (
    <div className="customer-wrapper">
      <Home />
      <Offer />
      <Orders />
    </div>
  );
}

export default CustomerPage;
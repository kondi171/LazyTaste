import { useState, useContext } from 'react';
import { AppContext } from '../../../AppContext';

const EditFreeDelivery = () => {
  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const [orderValueToFreeDelivery, setOrderValueToFreeDelivery] = useState(0);

  const handleEditOrderValueToFreeDelivery = e => {
    e.preventDefault();
    const URL = process.env.REACT_APP_DB_CONNECT + `API/restaurants`;
    const body = new URLSearchParams({
      id: loggedUser._id,
      value: orderValueToFreeDelivery,
      field: 'orderValueToFreeDelivery',
    });
    fetch(URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
      body: body,
    })
      .then(res => res.status)
      .catch(error => console.log(error));
    const delivery = loggedUser.delivery;
    setLoggedUser({ ...loggedUser, delivery: { ...delivery, orderValueToFreeDelivery } });
  }
  return (
    <div className="product">
      <form>
        <div className="current-delivery-cost">Current Order Value to free delivery: <strong>{loggedUser.delivery.orderValueToFreeDelivery} PLN</strong></div>
        <label htmlFor="delivery">New Order Value To Free Delivery</label>
        <input onChange={e => setOrderValueToFreeDelivery(e.target.value)} type='number' name='delivery' placeholder='Type order value to free delivery...' />
        <input onClick={e => handleEditOrderValueToFreeDelivery(e)} value="Edit Free Delivery" type="button" />
      </form>
    </div>
  );
}
export default EditFreeDelivery;
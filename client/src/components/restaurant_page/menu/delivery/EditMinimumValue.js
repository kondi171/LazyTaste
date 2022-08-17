import { useState, useContext } from 'react';
import { AppContext } from '../../../AppContext';

const EditDeliveryValue = () => {
  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const [orderMinValue, setOrderMinValue] = useState(0);

  const handleEditOrderMinValue = e => {
    e.preventDefault();
    const URL = `http://localhost:4000/API/restaurants`;
    const body = new URLSearchParams({
      id: loggedUser._id,
      value: orderMinValue,
      field: 'orderMinValue',
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
    setLoggedUser({ ...loggedUser, delivery: { ...delivery, orderMinValue } });
  }
  return (
    <div className="product">
      <form>
        <div className="current-delivery-cost">Current minimum order value for delivery: <strong>{loggedUser.delivery.orderMinValue} PLN</strong></div>
        <label htmlFor="delivery">New Minimum Order Value</label>
        <input onChange={e => setOrderMinValue(e.target.value)} type='number' name='delivery' placeholder='Type minimum order value...' />
        <input onClick={e => handleEditOrderMinValue(e)} value="Edit Min Value" type="button" />
      </form>
    </div>
  );
}
export default EditDeliveryValue;
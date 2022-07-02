import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
const EditDeliveryCostModal = () => {
  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const [deliveryCost, setDeliveryCost] = useState(0);

  const handleEditDeliveryCost = e => {
    e.preventDefault();
    const URL = `http://localhost:4000/API/restaurants`;
    const body = new URLSearchParams({
      id: loggedUser._id,
      value: deliveryCost,
      field: 'deliveryCost',
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
    setLoggedUser({ ...loggedUser, delivery: { ...delivery, deliveryCost } });
  }
  return (
    <div className="product">
      <form>
        <div className="current-delivery-cost">Current delivery cost: <strong>{loggedUser.delivery.deliveryCost} PLN</strong></div>
        <label htmlFor="delivery">New Delivery Cost</label>
        <input onChange={e => setDeliveryCost(e.target.value)} type='number' name='delivery' placeholder='Type delivery cost...' />
        <input onClick={e => handleEditDeliveryCost(e)} value="Edit Delivery Cost" type="button" />
      </form>
    </div>
  );
}
export default EditDeliveryCostModal;
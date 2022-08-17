import { useEffect } from "react";
import { useState, useContext } from "react";
import { AppContext } from "../../../AppContext";

const EditDeliveryStatus = () => {
  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const [status, setStatus] = useState(loggedUser.delivery.deliveryActive);

  const changeStatus = (status) => {
    setStatus(status)
    const URL = `http://localhost:4000/API/restaurants`;
    const body = new URLSearchParams({
      id: loggedUser._id,
      value: status,
      field: 'deliveryActive',
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
    setLoggedUser({ ...loggedUser, delivery: { ...delivery, status } });
  }
  useEffect(() => {
    if (status) {
      const delivery = document.querySelector('button[value=Delivery]');
      const pickup = document.querySelector('button[value=Pickup]');
      delivery.classList.add('active');
      pickup.classList.remove('active');
    }
    else {
      const delivery = document.querySelector('button[value=Delivery]');
      const pickup = document.querySelector('button[value=Pickup]');
      delivery.classList.remove('active');
      pickup.classList.add('active');;
    }
  }, [loggedUser, status]);

  useEffect(() => {
    fetch(`http://localhost:4000/API/restaurants/${loggedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.delivery.deliveryActive);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="product">
      <form className="delivery-status">
        <div className="current-delivery-cost">
          Current delivery status:<br></br>
          <strong>
            {status ?
              <span> Delivery is Active</span> :
              <span className="red"> Delivery is closed - only pickup</span>
            }
          </strong>
        </div>
        <div className="btn-group">
          <button onClick={() => changeStatus(true)} value="Delivery" type="button">Delivery</button>
          <button onClick={() => changeStatus(false)} value="Pickup" type="button">Pickup</button>
        </div>
      </form>
    </div>
  );
}
export default EditDeliveryStatus;
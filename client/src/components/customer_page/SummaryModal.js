import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppContext } from "../AppContext";
import PaypalCheckoutButton from '../features/PaypalCheckoutButton';

const SummaryModal = ({ setIsOpen, cartContent, cartValue, additionalMessage, setRedirect }) => {

  const { setMessageContent, setMessageType, setMessageVisible, chosenRestaurant, loggedUser, setNewOrder } = useContext(AppContext);

  const [adress, setAdress] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState('Delivery');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const changeStatus = status => {
    const deliveryBtn = document.querySelector("button[value=Delivery]");
    const pickupBtn = document.querySelector("button[value=Pickup]");
    if (status === 'Delivery') {
      deliveryBtn.classList.add('active');
      pickupBtn.classList.remove('active');
    }
    else if (status === 'Pickup') {
      deliveryBtn.classList.remove('active');
      pickupBtn.classList.add('active');
    }
    setDeliveryStatus(status);
  }
  const handleAdress = () => {
    const inputValue = document.querySelector('input[name=adress]').value;
    if (inputValue.length < 20 || inputValue.length > 60) {
      setAdress('');
      setMessageContent('Adress must has street, number of the building, apartment number, city and postcode!');
      setMessageType('info');
      setMessageVisible(true);
      setTimeout(() => {
        setMessageContent('');
        setMessageVisible(false);
      }, 2000);
    }
    else {
      setAdress(inputValue);
      setMessageContent('');
      setMessageVisible(false);
    }
  }

  const handleAddOrder = paymentMethod => {
    setIsOpen(false);
    const today = new Date();
    const date = `${today.getDate() > 10 ? today.getDate() : '0' + today.getDate()}.${today.getMonth() + 1 > 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}.${today.getFullYear()} ${today.getHours() > 10 ? today.getHours() : '0' + today.getHours()}:${today.getMinutes() > 10 ? today.getMinutes() : '0' + today.getMinutes()}`;
    setNewOrder({
      restaurantName: chosenRestaurant.name,
      restaurantAvatar: chosenRestaurant.avatar,
      message: additionalMessage ? additionalMessage : 'None',
      paymentMethod: paymentMethod,
      paid: cartValue,
      products: cartContent,
      adress: checkAdress(),
      date: date,
    });
    //Add order to user
    const customerURL = process.env.REACT_APP_DB_CONNECT + 'API/customer/add-order';
    const customerBody = new URLSearchParams({
      id: loggedUser._id,
      deliveryCost: chosenRestaurant.delivery.deliveryCost,
      deliveryFree: chosenRestaurant.delivery.orderValueToFreeDelivery,
      order: JSON.stringify({
        restaurantName: chosenRestaurant.name,
        restaurantAvatar: chosenRestaurant.avatar,
        restaurantType: chosenRestaurant.type,
        message: additionalMessage,
        paymentMethod: paymentMethod,
        paid: cartValue,
        products: cartContent,
        adress: checkAdress(),
      }),
    });
    fetch(customerURL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: customerBody
    })
      .then(res => res.status)
      .catch(error => console.log(error));

    // Add order to restaurant

    const restaurantURL = process.env.REACT_APP_DB_CONNECT + 'API/restaurant/add-order';
    const restaurantBody = new URLSearchParams({
      id: chosenRestaurant._id,
      deliveryCost: chosenRestaurant.delivery.deliveryCost,
      order: JSON.stringify({
        customerName: loggedUser.name,
        customerLastname: loggedUser.lastname,
        customerAvatar: loggedUser.avatar,
        customerAdress: checkAdress(),
        message: additionalMessage,
        paymentMethod: paymentMethod,
        paid: cartValue,
        products: cartContent,
      })
    });
    fetch(restaurantURL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: restaurantBody
    })
      .then(res => res.status)
      .catch(error => console.log(error));

    // Add order to LazyAssistant 

    const body = new URLSearchParams({
      id: loggedUser._id,
      name: loggedUser.name,
      lastname: loggedUser.lastname,
      mail: loggedUser.mail,
      products: JSON.stringify(cartContent),
      restaurant: chosenRestaurant.name,
    });
    fetch(process.env.REACT_APP_DB_CONNECT + 'API/lazy-assistant', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
      body: body
    })
      .then(res => res.status)
      .catch(error => console.log(error));

  }

  const checkAdress = () => {
    if (deliveryStatus === 'Pickup') return deliveryStatus;
    else if (!adress) return loggedUser.adress;
    else return adress;
  }
  const renderDeliveryInfo = () => {
    if (deliveryStatus === 'Pickup') return <span>Pickup your order from restaurant adress: <strong>{chosenRestaurant.adress}</strong></span>
    else if (deliveryStatus === 'Delivery') return (<>
      <span>Your order will be delivered to your adress: <strong>{!adress ? loggedUser.adress : adress}</strong></span><br /><br />
      <div className="change">
        <span>If you want to change your delivery address, you can do it here</span><br /><br />
        <input name="adress" placeholder="Type another adress..." type="text" /><br /><br />
        <button onClick={handleAdress}>Change Adress</button>
      </div>
    </>
    )
  }
  useEffect(() => {
    const layer = document.getElementById('layer');
    const modal = document.getElementById('modal');
    const close = document.getElementById('close');

    layer.style.opacity = '1';
    layer.style.zIndex = '10';
    modal.style.transform = 'scale(1)';
    // disallow scroll
    document.body.style.overflowY = 'hidden';
    close.addEventListener('click', () => {
      layer.style.opacity = '0';
      layer.style.zIndex = '-10';
      modal.style.transform = 'scale(0)';
      // allow scroll
      document.body.style.overflowY = 'visible';
      setMessageContent('');
      setMessageVisible(false);
      setIsOpen(false);
    });
  }, [setIsOpen]);
  useEffect(() => {
    const deliveryBtn = document.querySelector("button[value=Delivery]");
    const pickupBtn = document.querySelector("button[value=Pickup]");
    if (chosenRestaurant.delivery.orderMinValue > cartValue - chosenRestaurant.delivery.deliveryCost || !chosenRestaurant.delivery.deliveryActive) {
      setDisabledBtn(true);
      deliveryBtn.classList.remove('active');
      deliveryBtn.classList.add('inactive');
      pickupBtn.classList.add('active');
      setDeliveryStatus('Pickup');
    }
    else {
      setDisabledBtn(false);
      deliveryBtn.classList.add('active');
      deliveryBtn.classList.remove('inactive');
      pickupBtn.classList.remove('active');
      setDeliveryStatus('Delivery');
    }
  }, []);
  useEffect(() => {
    renderDeliveryInfo();
  }, [deliveryStatus]);

  return (
    <section id='layer' className="modal">
      <div id="modal" className="modal__content">
        <i id='close' className="fa fa-times" aria-hidden="true"></i>
        <h3>Order Summary</h3>
        <div className="summary-content">
          <div className="delivery">
            <button disabled={disabledBtn} onClick={e => changeStatus(e.target.value)} value="Delivery" >Delivery</button>
            <button onClick={e => changeStatus(e.target.value)} value="Pickup" >Pickup</button>
          </div>
          <div className="adress">
            <div className="delivery-info">
              {renderDeliveryInfo()}
            </div>
          </div>
          <div className="order">
            <div className='paypal-button-container'>
              <PaypalCheckoutButton cartValue={cartValue} chosenRestaurant={chosenRestaurant} setRedirect={setRedirect} handleAddOrder={handleAddOrder} />
            </div>
            <div className="cash-button-container">
              <Link to='/customer/orders/success' onClick={() => handleAddOrder('Cash')} className="order-with-cash">Order with cash</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SummaryModal;
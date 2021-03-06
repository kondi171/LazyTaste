import blank from '../../assets/img/logo/blank.png';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';
import PaypalCheckoutButton from '../features/PaypalCheckoutButton';
const RestaurantPage = () => {
  const { loggedUser, chosenRestaurant, setChosenRestaurant } = useContext(AppContext);
  const [cartContent, setCartContent] = useState([]);
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [cartValue, setCartValue] = useState(0);
  const [message, setMessage] = useState({
    content: '',
    visible: false,
  });

  const product = {
    description: "Design + Code React Hooks Course",
    price: 19,
  };

  const handleAddToCart = e => {
    const clickedProduct = e.target.parentElement.dataset.id;
    const filterArray = chosenRestaurant.menu.filter(product => product._id === clickedProduct);
    const filterObject = {
      _id: filterArray[0]._id,
      id: Date.now(),
      productName: filterArray[0].productName,
      productPrice: filterArray[0].productPrice,
    }
    setCartContent(cart => [...cart, filterObject]);
  }

  const handleRemoveFromCart = e => {
    const id = e.target.parentElement.dataset.id;
    const updateCart = cartContent.filter(element => String(element.id) !== id);
    setCartContent(updateCart);
  }

  const handleAdditionalMessage = () => {
    const textarea = document.getElementById('area-content');
    setAdditionalMessage(textarea.value)
  }

  const handleShowMessage = message => {
    const messageDiv = document.querySelector('div.message-info');
    setMessage({ content: message, visible: true });
    messageDiv.style.transform = 'scale(1)';
  }

  const handleHideMessage = () => {
    const messageDiv = document.querySelector('div.message-info');
    setMessage({ content: message.content, visible: false });
    messageDiv.style.transform = 'scale(0)';
  }

  const addOrder = () => {
    if (cartContent.length === 0) {
      handleShowMessage("Your cart is empty!");
    } else {
      //Add order to user
      const customerURL = 'http://localhost:4000/API/customer/add-order';
      const customerBody = new URLSearchParams({
        id: loggedUser._id,
        deliveryCost: chosenRestaurant.delivery.deliveryCost,
        deliveryFree: chosenRestaurant.delivery.orderValueToFreeDelivery,
        order: JSON.stringify({
          restaurantName: chosenRestaurant.name,
          restaurantAvatar: chosenRestaurant.avatar,
          restaurantType: chosenRestaurant.type,
          message: additionalMessage,
          paymentMethod: 'Cash',
          paid: cartValue,
          products: cartContent
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
      const restaurantURL = 'http://localhost:4000/API/restaurant/add-order';
      const restaurantBody = new URLSearchParams({
        id: chosenRestaurant._id,
        deliveryCost: chosenRestaurant.delivery.deliveryCost,
        order: JSON.stringify({
          customerName: loggedUser.name,
          customerLastname: loggedUser.lastname,
          customerAvatar: loggedUser.avatar,
          customerAdress: loggedUser.adress,
          message: additionalMessage,
          paymentMethod: 'Cash',
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
    }
  }

  useEffect(() => {
    if (cartContent.length !== 0) {
      let total = 0;
      cartContent.forEach(eachProduct => total += eachProduct.productPrice);
      if (total < chosenRestaurant.delivery.orderValueToFreeDelivery) total += chosenRestaurant.delivery.deliveryCost;
      setCartValue(total.toFixed(2));
    }
    else {
      setCartValue(0);
    }
  }, [cartContent])
  return (
    <section className="restaurant-page">
      <div className="restaurant-info">
        {chosenRestaurant.avatar === 'blank' ? <img src={blank} alt={`Avatar of ${chosenRestaurant.name}`} /> :
          <img src={chosenRestaurant.avatar} alt={`Avatar of ${chosenRestaurant.name}`} />}
        <h3>{chosenRestaurant.name}</h3>
        <div className="account-column__info">
          <div className='single-info'>
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <span>Mail</span>
          </div>
          <span>{chosenRestaurant.mail}</span>
          <div className='single-info'>
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span>Phone</span>
          </div>
          <span>{chosenRestaurant.phone}</span>
          <div className='single-info'>
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            <span>Adress</span>
          </div>
          <span>{chosenRestaurant.adress}</span>
          <div className='single-info'>
            <i className="fa fa-product-hunt" aria-hidden="true"></i>
            <span>Promotion</span>
          </div>
          <span>{chosenRestaurant.promotion}</span>
        </div>
        <div className="account-column__logout">
          <Link onClick={() => setChosenRestaurant(null)} to="/customer/offer" onMouseEnter={() => handleShowMessage('Back to Offer')} onMouseLeave={handleHideMessage}>Back</Link>
        </div>
      </div>
      <div className="access-system">
        <div className="column-direction">
          <div className="menu">
            <div className="menu-items">
              <h3 className="menu__title">Menu</h3>
              <ul className="menu__list">
                {chosenRestaurant.menu.map((product) => {
                  return (
                    <li data-id={product._id} key={product._id}>
                      <div className='info'>
                        <span>{product.productName} - <strong>{product.productPrice} PLN</strong></span>
                        <div className='cyan'>{product.productDescription}</div>
                      </div>
                      <i onClick={handleAddToCart} onMouseEnter={() => handleShowMessage('Add to Cart')} onMouseLeave={handleHideMessage} className="fa fa-plus" aria-hidden="true"></i>
                    </li>
                  )
                })}
              </ul>
              <br />
            </div>
          </div>
          <div className="delivery-info">
            {chosenRestaurant.delivery.deliveryActive ? <>
              <p><b>Delivery Cost: </b>{chosenRestaurant.delivery.deliveryCost} PLN</p>
              <p><b>Min Order Value: </b>{chosenRestaurant.delivery.orderMinValue} PLN</p>
              <p><b>Free delivery from: </b>{chosenRestaurant.delivery.orderValueToFreeDelivery} PLN</p>
            </> : <span>Restaurant is not open to delivery!</span>}
          </div>
        </div>

        <div className="cart">
          <div className="cart-items">
            <h3 className="cart-items__title">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span>Cart</span>
            </h3>
            {cartContent.length === 0 ? <p className="empty-cart">You don't have any items in your cart yet!</p> :
              <ul className="cart-items__list">
                {cartContent.map(content => {
                  return (
                    <li data-id={content.id} key={content.id}>
                      <span>&bull; {content.productName} - <strong>{content.productPrice} PLN</strong></span>
                      <i onClick={handleRemoveFromCart} onMouseEnter={() => handleShowMessage('Remove from Cart')} onMouseLeave={handleHideMessage} className="fa fa-times" aria-hidden="true"></i>
                    </li>
                  )
                })}
                {cartContent.length !== 0 &&
                  <li data-id={'delivery'} key={'delivery'}>
                    <span>&bull; Delivery - <strong>
                      {chosenRestaurant.delivery.orderValueToFreeDelivery >= cartValue - chosenRestaurant.delivery.deliveryCost ? chosenRestaurant.delivery.deliveryCost + " PLN" : <span className='free'>Free!</span>}
                    </strong></span>
                  </li>}
              </ul>
            }
            <br />
          </div>
          <div className="order-summary">
            <h3 className="order-summary__title">Order Summary:</h3>
            <div className="order-summary__value">You have to pay: <strong>{cartValue} PLN</strong></div>
            <textarea onChange={handleAdditionalMessage} className="order-summary__area" placeholder="Write message... (optional)" name="area-content" id="area-content"></textarea>
            <button onClick={addOrder} onMouseEnter={() => handleShowMessage('Submit Order!')} onMouseLeave={handleHideMessage} className="order-summary__btn">Order</button>
            <div className='paypal-button-container'>
              <PaypalCheckoutButton product={product} />
            </div>

            {/* <form method="POST" action="https://secure.snd.payu.com/api/v2_1">
              <input type="hidden" name="customerIp" value="123.123.123.123" />
              <input type="hidden" name="merchantPosId" value="436329" />
              <input type="hidden" name="description" value="Opis zam??wienia" />
              <input type="hidden" name="totalAmount" value="1000" />
              <input type="hidden" name="currencyCode" value="PLN" />
              <input type="hidden" name="products[0].name" value="Produkt 1" />
              <input type="hidden" name="products[0].unitPrice" value="1000" />
              <input type="hidden" name="products[0].quantity" value="1" />
              <input type="hidden" name="notifyUrl" value="http://lazytaste.com:3000/customer/orders/success" />
              <input type="hidden" name="continueUrl" value="http://lazytaste.com:3000/customer/orders/success" />
              <input type="hidden" name="OpenPayu-Signature" value="sender=436329;algorithm=SHA-256;signature=565f9f4dda43c8e24ccab4472133d680e2aa58e1f58bea845c4cf2926965144d" />
              <button type="submit" formtarget="_blank">P??ac?? z PayU</button>
            </form> */}
          </div>

        </div>
        <div className="message-info">{message.content}</div>
      </div>
    </section >
  );
}
export default RestaurantPage;
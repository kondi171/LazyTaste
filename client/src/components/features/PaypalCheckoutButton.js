import { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
  const { cartValue, chosenRestaurant, handleAddOrder, setRedirect } = props;
  const [error, setError] = useState(null);


  const handleApprove = orderID => {
    handleAddOrder('Internet Payment');
    setRedirect(true);
    console.log('Approved!');
  }
  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <PayPalButtons
      style={{
        color: 'silver',
        layout: 'horizontal',
        tagline: false,
        shape: 'rect'
      }}
      onClick={(data, actions) => {
        // Validate on button click, client or server side
        const hasAlreadyBought = false;
        if (hasAlreadyBought) {
          setError('You already bough this');
          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: `Payment for ${chosenRestaurant.name} Restaurant`,
              amount: {
                value: cartValue,
              }
            }
          ]
        })
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        handleApprove(data.orderID);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
      onError={err => {
        setError(err);
        console.error("Paypal Checkout onError", err);
      }}
    />
  );

};
export default PaypalCheckoutButton;
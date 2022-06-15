import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
const RemoveProductModal = ({ productItems }) => {
  const { productID, loggedUser, isOpen, setIsOpen } = useContext(AppContext);

  const handleRemove = () => {
    setIsOpen(!isOpen);
    fetch(`http://localhost:4000/API/restaurant/${loggedUser._id}/${productID}`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'DELETE',
    })
      .then(res => res.status)
      .catch(error => console.log(error));
  }

  return (
    <>
      <h3>Are you sure to remove?</h3>
      <div className="product">
        <div className="product__name">{productItems[0]}</div>
        <div className="product__price">{productItems[1]}</div>
      </div>
      <input onClick={handleRemove} value="Remove" type="button" />
    </>
  );
}
export default RemoveProductModal;
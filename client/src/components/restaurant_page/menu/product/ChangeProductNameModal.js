import { useState, useContext } from "react";
import { AppContext } from "../../../AppContext";
const ChangeProductNameModal = ({ productName, productPrice, productDescription, setProductName }) => {
  const { productID, loggedUser, isOpen, setIsOpen } = useContext(AppContext);

  const [inputValue, setInputValue] = useState('');
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    e.preventDefault();
    setProductName(inputValue);
    setIsOpen(!isOpen);
    const body = new URLSearchParams({
      value: inputValue,
      type: 'name',
    });
    fetch(process.env.REACT_APP_DB_CONNECT + `API/restaurant/menu/${loggedUser._id}/${productID}`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
      body: body,
    })
      .then(res => res.status)
      .catch(error => console.log(error));
  }
  return (
    <>
      <h3>Change product name of: {productName}</h3>
      <div className="product">
        <div className="product__name">{productName}</div>
        <div className="product__price">{productPrice}</div>
        <div className="product__description">{productDescription}</div>
      </div>
      <div className="product__to">to:</div>
      <form>
        <input onChange={e => handleChangeInputValue(e)} type='text' placeholder='Type new name of product...' />
        <input onClick={e => handleChange(e)} value="Change" type="button" />
      </form>
    </>
  );
}
export default ChangeProductNameModal;
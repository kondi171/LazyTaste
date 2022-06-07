import { useState, useContext } from "react";
import { AppContext } from "../../AppContext";
const ChangeProductNameModal = ({ productName, productPrice, setProductValue }) => {
  const { productID, loggedUser, isOpen, setIsOpen } = useContext(AppContext);

  const [inputValue, setInputValue] = useState('');
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    const testID = `629f15980a8c49d791e1819e`;

    e.preventDefault();
    setProductValue(inputValue);
    setIsOpen(!isOpen);
    fetch(`http://localhost:4000/API/restaurant/${testID}/${productID}`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
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
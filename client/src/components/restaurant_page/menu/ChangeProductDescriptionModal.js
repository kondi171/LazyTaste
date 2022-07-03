import { useState, useContext } from "react";
import { AppContext } from "../../AppContext";
const ChangeProductDescriptionModal = ({ productName, productPrice, productDescription, setProductDescription }) => {
  const { productID, loggedUser, isOpen, setIsOpen } = useContext(AppContext);

  const [inputValue, setInputValue] = useState('');
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    e.preventDefault();
    setProductDescription(inputValue);
    setIsOpen(!isOpen);
    const body = new URLSearchParams({
      value: inputValue,
      type: 'description',
    });
    fetch(`http://localhost:4000/API/restaurant/${loggedUser._id}/${productID}`, {
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
      <h3>Change product description of: {productName}</h3>
      <div className="product">
        <div className="product__name">{productName}</div>
        <div className="product__price">{productPrice}</div>
        <div className="product__description">{productDescription}</div>
      </div>
      <div className="product__to">to:</div>
      <form>
        <textarea onChange={e => handleChangeInputValue(e)} name='description' placeholder='Type new product description...' />
        <input onClick={e => handleChange(e)} value="Change" type="button" />
      </form>
    </>
  );
}
export default ChangeProductDescriptionModal;
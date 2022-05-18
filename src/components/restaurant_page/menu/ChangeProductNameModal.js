import { useState } from "react";

const ChangeProductNameModal = ({ productName, productPrice, setProductValue }) => {
  const [inputValue, setInputValue] = useState('');
  const [changeInfo, setChangeInfo] = useState(false);
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    e.preventDefault();
    setProductValue(inputValue);
    setChangeInfo(true);
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
        <input onClick={e => handleChange(e)} value="Change" type="submit" />
      </form>
      <div className="return-info">{changeInfo ? 'Changed!' : ''}</div>
    </>
  );
}
export default ChangeProductNameModal;
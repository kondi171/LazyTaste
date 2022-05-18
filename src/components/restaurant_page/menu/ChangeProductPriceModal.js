import { useState } from "react";
const ChangeProductPriceModal = ({ productName, productPrice, setPriceValue }) => {
  const [inputValue, setInputValue] = useState('');
  const [changeInfo, setChangeInfo] = useState(false);
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    e.preventDefault();
    setPriceValue(inputValue);
    setChangeInfo(true);
    console.log(productPrice);

  }
  return (
    <>
      <h3>Change price of: {productName}</h3>
      <div className="product">
        <div className="product__name">{productName}</div>
        <div className="product__price">{productPrice}</div>
      </div>
      <div className="product__to">to:</div>
      <form>
        <input onChange={e => handleChangeInputValue(e)} type='number' placeholder='Type new price of product...' />
        <input onClick={e => handleChange(e)} value="Change" type="submit" />
      </form>
      <div className="return-info">{changeInfo ? 'Changed!' : ''}</div>
    </>
  );
}
export default ChangeProductPriceModal;
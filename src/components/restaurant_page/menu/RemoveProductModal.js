import { useContext, useState } from "react";
import { MenuContext } from "../../contexts/MenuContext";
const RemoveProductModal = ({ productItems }) => {
  const { removeProduct, setRemoveProduct, isOpen, setIsOpen } = useContext(MenuContext);

  const handleRemove = () => {
    setRemoveProduct(!removeProduct);
    setIsOpen(!isOpen);
    // console.log(removeProduct);
  }
  return (
    <>
      <h3>Are you sure to remove?</h3>
      <div className="product">
        <div className="product__name">{productItems[0]}</div>
        <div className="product__price">{productItems[1]}</div>
      </div>
      <input onClick={handleRemove} value="Remove" type="submit" />
    </>
  );
}
export default RemoveProductModal;
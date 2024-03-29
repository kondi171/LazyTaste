import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
const AddProductModal = ({ productItems }) => {
  const { loggedUser, isOpen, setIsOpen, sectionID } = useContext(AppContext);
  const [nameProduct, setNameProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');

  const handleAdd = e => {
    e.preventDefault();
    const testID = '629f15980a8c49d791e1819e';
    setIsOpen(!isOpen);
    const body = new URLSearchParams({
      id: loggedUser._id,
      product: JSON.stringify(
        {
          productName: nameProduct,
          productPrice: priceProduct,
          productDescription: descriptionProduct,
          sectionID: sectionID,
        },
      )
    });
    fetch(process.env.REACT_APP_DB_CONNECT + `API/restaurant/menu/add-product`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: body
    });
  }

  return (
    <>
      <h3>Add Product:</h3>
      <div className="product">
        <form>
          <label htmlFor="name">Product Name</label>
          <input onChange={e => setNameProduct(e.target.value)} type='text' name='name' placeholder='Type product name' />
          <label htmlFor="price">Product Price</label>
          <input onChange={e => setPriceProduct(e.target.value)} type='number' name='price' placeholder='Type product price...' />
          <label htmlFor="description">Product Description</label>
          <textarea onChange={e => setDescriptionProduct(e.target.value)} name='description' placeholder='Type product description...' />
          <input onClick={e => handleAdd(e)} value="Add" type="button" />
        </form>
      </div>
    </>
  );
}
export default AddProductModal;
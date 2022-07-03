import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import InfoSection from "../../features/InfoSection";
import MenuModal from './MenuModal';
const Menu = () => {
  const { setProductID, isOpen, setIsOpen, loggedUser } = useContext(AppContext);
  const [whatClicked, setWhatClicked] = useState('');
  const [typeClick, setTypeClick] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [additionalItems, setAdditionalItems] = useState('');
  const [removeProduct, setRemoveProduct] = useState(false);
  const [removedProduct, setRemovedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [menuLoaded, setMenuLoaded] = useState(false);

  const handleClick = (type, click, additionalItems = []) => {
    setTypeClick(type);
    setWhatClicked(click);
    setIsOpen(!isOpen);
    setAdditionalItems(additionalItems);
  }

  const handleChangeMenu = (e, type) => {
    if (type === 'removeProduct') {
      const product = e.target.parentElement.parentElement;
      const productID = product.dataset.id;
      const name = e.target.parentElement.previousSibling.previousSibling.previousSibling.firstChild.textContent;
      const price = e.target.parentElement.previousSibling.previousSibling.firstChild.textContent;
      const description = e.target.parentElement.previousSibling.firstChild.textContent;
      handleClick(type, product, [name, price, description]);
      setRemovedProduct(product);
      setProductID(productID);
    }
    else if (type === 'addProduct') {
      handleClick(type);
    }
    else if (type === 'editDeliveryCost') {
      handleClick(type);
    }
    else if (type === 'editName') {
      const productID = e.target.parentElement.parentElement.dataset.id;
      const name = e.target.previousSibling.textContent;
      const price = e.target.parentElement.nextSibling.firstChild.textContent;
      const description = e.target.parentElement.nextSibling.nextSibling.firstChild.textContent;
      handleClick(type, name, [price, description]);
      setProductID(productID);
    } else if (type === 'editPrice') {
      const productID = e.target.parentElement.parentElement.dataset.id;
      const price = e.target.previousSibling.textContent
      const name = e.target.parentElement.previousSibling.firstChild.textContent;
      const description = e.target.parentElement.nextSibling.firstChild.textContent;
      handleClick(type, price, [name, description]);
      setProductID(productID);
    } else if (type === 'editDescription') {
      const productID = e.target.parentElement.parentElement.dataset.id;
      const name = e.target.parentElement.previousSibling.previousSibling.firstChild.textContent
      const price = e.target.parentElement.previousSibling.firstChild.textContent;
      const description = e.target.previousSibling.textContent;
      handleClick(type, description, [name, price]);
      setProductID(productID);
    }
  }

  const initMenu = () => {
    const array = products.menu.map(product => {

      return (
        <li data-id={product._id} key={product._id}>
          <div className="notification-parent">
            <span className="content">{product.productName}</span>
            <i onClick={(e) => handleChangeMenu(e, 'editName')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
            <span className="notification-info">Edit Name</span>
          </div>
          <div className="notification-parent">
            <span className="price">{product.productPrice} PLN</span>
            <i onClick={(e) => handleChangeMenu(e, 'editPrice')} className="fa fa-refresh fa-refresh--green notification-dependant-hover" aria-hidden="true"></i>
            <span className="notification-info">Edit Price</span>
          </div>
          <div className="notification-parent">
            <span className="description">{product.productDescription}</span>
            <i onClick={(e) => handleChangeMenu(e, 'editDescription')} className="fa fa-refresh fa-refresh--cyan notification-dependant-hover" aria-hidden="true"></i>
            <span className="notification-info">Edit Description</span>
          </div>
          <div className="notification-parent">
            <i onClick={(e) => handleChangeMenu(e, 'removeProduct')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
            <span className="notification-info">Delete product</span>
          </div>
        </li>
      )
    });
    if (array.length === 0) return <span className="empty-assortment">Your Assortment is Empty!</span>
    else return array;
  }

  useEffect(() => {
    setProductName(productName);
    setProductPrice(productPrice);
    setProductDescription(productDescription);
    if (removeProduct) {
      removedProduct.remove();
      setRemoveProduct(null);
    }
  }, [whatClicked, productName, productPrice, productDescription, removeProduct, removedProduct, isOpen]);

  useEffect(() => {
    const URL = `http://localhost:4000/API/restaurants/${loggedUser._id}`;
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setMenuLoaded(true);
      })
      .catch(error => console.log(error));
  }, [products]);
  return (
    <section className="menu">
      <div className="menu__account-column">
        <InfoSection as='restaurant' place='menu' />
      </div>
      <div className="menu__control-panel">
        <h2>Menu</h2>
        <section className="menu__edit">
          <div className="menu__title">
            <h3>Edit Assortment</h3>
            <div className="notification-parent">
              <i onClick={(e) => handleChangeMenu(e, 'editDeliveryCost')} className="fa fa-truck notification-dependant-hover" aria-hidden="true"></i>
              <span className="notification-info">Edit delivery</span>
            </div>
          </div>
          <ul>
            {menuLoaded && initMenu()}
            <li className="add-item">
              <div className="notification-parent">
                <i onClick={(e) => handleChangeMenu(e, 'addProduct')} className="fa fa-plus notification-dependant-hover" aria-hidden="true"></i>
                <span className="notification-info">Add product</span>
              </div>
            </li>
          </ul>
        </section>
      </div >
      {isOpen &&
        <MenuModal clicked={whatClicked}
          setProductName={setProductName}
          setProductPrice={setProductPrice}
          setProductDescription={setProductDescription}
          additionalItems={additionalItems}
          type={typeClick}
          setIsOpen={setIsOpen}
        />}
    </section >
  );
}
export default Menu;

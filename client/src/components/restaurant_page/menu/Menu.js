import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import InfoSection from "../../features/InfoSection";
import MenuModal from './MenuModal';
const Menu = () => {
  const { setProductID, isOpen, setIsOpen, loggedUser } = useContext(AppContext);
  const [whatClicked, setWhatClicked] = useState('');
  const [typeClick, setTypeClick] = useState('');
  const [productValue, setProductValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
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
      // const product = e.target.parentElement.parentElement.remove();
      const name = e.target.parentElement.previousSibling.previousSibling.firstChild.textContent;
      const price = e.target.parentElement.previousSibling.firstChild.textContent;
      handleClick(type, product, [name, price]);
      setRemovedProduct(product);
      setProductID(productID);
    }
    else if (type === 'addProduct') {
      handleClick(type);
    }
    else if (type === 'editDeliveryCost') {
      handleClick(type);
    }
    else if (type === 'product') {
      const name = e.target.previousSibling.textContent;
      const productID = e.target.parentElement.parentElement.dataset.id;
      const price = e.target.parentElement.nextSibling.firstChild.textContent;
      handleClick(type, name, price);
      setProductID(productID);
    } else if (type === 'price') {
      const price = e.target.previousSibling.textContent
      const name = e.target.parentElement.previousSibling.firstChild.textContent;
      handleClick(type, price, name);
    }
  }

  const initMenu = () => {
    const array = products.menu.map(product => {
      return (
        <li data-id={product._id} key={product._id}>
          <div className="notification-parent">
            <span className="content">{product.productName}</span>
          </div>
          <div className="notification-parent">
            <span className="price">{product.productPrice} PLN</span>
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
    setProductName(productValue);
    setProductPrice(priceValue);
    if (removeProduct) {
      removedProduct.remove();
      setRemovedProduct(null);
    }
  }, [whatClicked, productValue, priceValue, removeProduct, isOpen]);

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
              <i onClick={(e) => handleChangeMenu(e, 'editDeliveryCost')} className="fa fa-money notification-dependant-hover" aria-hidden="true"></i>
              <span className="notification-info">Edit delivery cost</span>
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
          setProductValue={setProductValue}
          setPriceValue={setPriceValue}
          additionalItems={additionalItems}
          type={typeClick}
          setIsOpen={setIsOpen}
        />}
    </section >
  );
}
export default Menu;

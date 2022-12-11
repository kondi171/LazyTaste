import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import InfoSection from "../../features/InfoSection";
import MenuModal from './MenuModal';
const Menu = () => {
  const { setProductID, isOpen, setIsOpen, loggedUser, setSectionID } = useContext(AppContext);
  const [whatClicked, setWhatClicked] = useState('');
  const [typeClick, setTypeClick] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [sectionName, setSectionName] = useState('');
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
      const sectionID = e.target.parentElement.parentElement.dataset.id;
      setSectionID(sectionID);
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
    } else if (type === 'addSection') {
      handleClick(type);
    } else if (type === 'editSection') {
      const name = e.target.parentElement.parentElement.previousSibling.textContent;
      const sectionID = e.target.parentElement.parentElement.previousSibling.dataset.id;
      setSectionID(sectionID);
      handleClick(type, name);
    } else if (type === 'removeSection') {
      const name = e.target.parentElement.parentElement.previousSibling.textContent;
      const sectionID = e.target.parentElement.parentElement.previousSibling.dataset.id;
      setSectionID(sectionID);
      handleClick(type, name);
    }
  }
  const initSections = () => {
    const array = products.productsSections.map(section => {
      return (
        <div key={section._id}>
          <div className="section__title">
            <h3 data-id={section._id}>{section.sectionName}</h3>
            <div className="manipulate-section">
              <div className="notification-parent">
                <i onClick={(e) => handleChangeMenu(e, 'editSection')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                <span className="notification-info">Edit {section.sectionName} Section</span>
              </div>
              <div className="notification-parent">
                <i onClick={(e) => handleChangeMenu(e, 'removeSection')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                <span className="notification-info">Remove {section.sectionName} Section</span>
              </div>
            </div>
          </div>
          <ul>
            {initProducts(section._id)}
            <li className="add-item" data-id={section._id}>
              <div className="notification-parent">
                <i onClick={(e) => handleChangeMenu(e, 'addProduct')} className="fa fa-plus notification-dependant-hover" aria-hidden="true"></i>
                <span className="notification-info">Add Product</span>
              </div>
            </li>
          </ul>
        </div>
      )
    });
    if (array.length === 0) return <span className="empty-assortment">Your Assortment is Empty!</span>
    else return array;
  }
  const initProducts = sectionID => {
    const array = products.menu.map(product => {
      if (product.sectionID === sectionID) {
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
              <span className="notification-info">Delete {product.productName}</span>
            </div>
          </li>
        )
      }
      else return null;
    });

    if (array.length === 0) return;
    else return array;
  }

  useEffect(() => {
    setProductName(productName);
    setProductPrice(productPrice);
    setProductDescription(productDescription);
    setSectionName(sectionName);
    if (removeProduct) {
      removedProduct.remove();
      setRemoveProduct(null);
    }
  }, [whatClicked, productName, productPrice, productDescription, sectionName, removeProduct, removedProduct, isOpen]);

  useEffect(() => {
    const URL = process.env.REACT_APP_DB_CONNECT + `API/restaurants/${loggedUser._id}`;
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
              <span className="notification-info">Edit Delivery</span>
            </div>
          </div>
          {menuLoaded && initSections()}


          <div className="section__title">
            <h3>Add New Products Section</h3>
            <div className="notification-parent">
              <i onClick={(e) => handleChangeMenu(e, 'addSection')} className="fa fa-plus notification-dependant-hover" aria-hidden="true"></i>
              <span className="notification-info">Add Section</span>
            </div>
          </div>
        </section>
      </div >
      {isOpen &&
        <MenuModal clicked={whatClicked}
          setProductName={setProductName}
          setProductPrice={setProductPrice}
          setProductDescription={setProductDescription}
          setSectionName={setSectionName}
          additionalItems={additionalItems}
          type={typeClick}
          setIsOpen={setIsOpen}
        />}
    </section >
  );
}
export default Menu;

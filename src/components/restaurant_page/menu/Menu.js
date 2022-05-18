import { useEffect, useState } from "react";
import { MenuContext } from "../../contexts/MenuContext";
import InfoColumn from "../../features/InfoColumn";
import MenuModal from './MenuModal';
const Menu = () => {

  const [whatClicked, setWhatClicked] = useState('');
  const [typeClick, setTypeClick] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [sectionValue, setSectionValue] = useState('');
  const [productValue, setProductValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const [sectionName, setSectionName] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [additionalItems, setAdditionalItems] = useState('');

  const [removeProduct, setRemoveProduct] = useState(false);
  const [removedProduct, setRemovedProduct] = useState(null);

  const handleClick = (type, click, additionalItems = []) => {
    setTypeClick(type);
    setWhatClicked(click);
    setIsOpen(!isOpen);
    setAdditionalItems(additionalItems);
  }

  const handleChangeMenu = (e, type) => {
    if (type === 'section') {
      const section = e.target.parentElement.previousSibling.textContent;
      handleClick(type, section);
    } else if (type === 'product') {
      const name = e.target.previousSibling.textContent;
      const price = e.target.parentElement.nextSibling.firstChild.textContent;
      handleClick(type, name, price);
    } else if (type === 'price') {
      const price = e.target.previousSibling.textContent
      const name = e.target.parentElement.previousSibling.firstChild.textContent;
      handleClick(type, price, name);
    }
    else if (type === 'removeProduct') {
      const product = e.target.parentElement.parentElement;
      // const product = e.target.parentElement.parentElement.remove();
      const name = e.target.parentElement.previousSibling.previousSibling.firstChild.textContent;
      const price = e.target.parentElement.previousSibling.firstChild.textContent;
      handleClick(type, product, [name, price]);
      setRemovedProduct(product);
    }
  }

  const handleAddItem = () => {

  }

  useEffect(() => {

    setSectionName(sectionValue);
    setProductName(productValue);
    // setProductPrice(priceValue + ' PLN');
    setProductPrice(priceValue);
    if (removeProduct) {
      removedProduct.remove();
      setRemovedProduct(null);
    }
  }, [whatClicked, sectionValue, productValue, priceValue, removeProduct, isOpen]);

  return (
    <MenuContext.Provider value={{ removeProduct, setRemoveProduct, isOpen, setIsOpen }}>
      <section className="menu">
        <div className="menu__account-column">
          <InfoColumn as='restaurant' place='menu' />
        </div>
        <div className="menu__control-panel">
          <h2>Menu</h2>
          <section className="menu__section">
            <div className="single-section">
              <div className="section__title">
                <h3>{sectionName ? sectionName : 'Fast Food'}</h3>
                <div className="notification-parent">
                  <i onClick={(e) => handleChangeMenu(e, 'section')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                  <span className="notification-info">Change Section Name</span>
                </div>
                <div className="notification-parent">
                  <i className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                  <span className="notification-info">Delete Section</span>
                </div>
              </div>
              <ul>
                <li>
                  <div className="notification-parent">
                    <span className="content">{productName ? productName : 'Kebab XL'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'product')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Rename product</span>
                  </div>
                  <div className="notification-parent">
                    <span className="price">{productPrice ? productPrice : '19.99 PLN'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'price')} className="fa fa-refresh notification-dependant-hover notification-dependant-hover--color" aria-hidden="true"></i>
                    <span className="notification-info">Change price</span>
                  </div>
                  <div className="notification-parent">
                    <i onClick={(e) => handleChangeMenu(e, 'removeProduct')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Delete product</span>
                  </div>
                </li>
                <li>
                  <div className="notification-parent">
                    <span className="content">{productName ? productName : 'Kebab XL'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'product')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Rename product</span>
                  </div>
                  <div className="notification-parent">
                    <span className="price">{productPrice ? productPrice : '19.99 PLN'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'price')} className="fa fa-refresh notification-dependant-hover notification-dependant-hover--color" aria-hidden="true"></i>
                    <span className="notification-info">Change price</span>
                  </div>
                  <div className="notification-parent">
                    <i onClick={(e) => handleChangeMenu(e, 'removeProduct')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Delete product</span>
                  </div>
                </li>
                <li>
                  <div className="notification-parent">
                    <span className="content">{productName ? productName : 'Kebab XL'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'product')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Rename product</span>
                  </div>
                  <div className="notification-parent">
                    <span className="price">{productPrice ? productPrice : '19.99 PLN'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'price')} className="fa fa-refresh notification-dependant-hover notification-dependant-hover--color" aria-hidden="true"></i>
                    <span className="notification-info">Change price</span>
                  </div>
                  <div className="notification-parent">
                    <i onClick={(e) => handleChangeMenu(e, 'removeProduct')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Delete product</span>
                  </div>
                </li>
                <li>
                  <div className="notification-parent">
                    <span className="content">{productName ? productName : 'Kebab XL'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'product')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Rename product</span>
                  </div>
                  <div className="notification-parent">
                    <span className="price">{productPrice ? productPrice : '19.99 PLN'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'price')} className="fa fa-refresh notification-dependant-hover notification-dependant-hover--color" aria-hidden="true"></i>
                    <span className="notification-info">Change price</span>
                  </div>
                  <div className="notification-parent">
                    <i onClick={(e) => handleChangeMenu(e, 'removeProduct')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Delete product</span>
                  </div>
                </li>
                <li>
                  <div className="notification-parent">
                    <span className="content">{productName ? productName : 'Kebab XL'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'product')} className="fa fa-refresh notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Rename product</span>
                  </div>
                  <div className="notification-parent">
                    <span className="price">{productPrice ? productPrice : '19.99 PLN'}</span>
                    <i onClick={(e) => handleChangeMenu(e, 'price')} className="fa fa-refresh notification-dependant-hover notification-dependant-hover--color" aria-hidden="true"></i>
                    <span className="notification-info">Change price</span>
                  </div>
                  <div className="notification-parent">
                    <i onClick={(e) => handleChangeMenu(e, 'removeProduct')} className="fa fa-times notification-dependant-hover" aria-hidden="true"></i>
                    <span className="notification-info">Delete product</span>
                  </div>
                </li>
                <li onClick={handleAddItem} className="add-item">
                  <h4>Add item</h4>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </li>
              </ul>
              <div className="add-section">
                <h4>Add Section</h4>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </div>
            </div>

          </section>
        </div>
        {isOpen &&
          <MenuModal clicked={whatClicked}
            setSectionValue={setSectionValue}
            setProductValue={setProductValue}
            setPriceValue={setPriceValue}
            additionalItems={additionalItems}
            type={typeClick}
            setIsOpen={setIsOpen}
          />}
      </section>
    </MenuContext.Provider>
  );
}
export default Menu;

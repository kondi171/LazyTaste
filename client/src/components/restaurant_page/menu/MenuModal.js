import { useEffect, useState } from "react";
import ChangeProductNameModal from "./product/ChangeProductNameModal";
import ChangeProductPriceModal from "./product/ChangeProductPriceModal";
import ChangeProductDescriptionModal from "./product/ChangeProductDescriptionModal";
import RemoveProductModal from "./product/RemoveProductModal";
import AddProductModal from "./product/AddProductModal";
import EditDeliveryModal from "./delivery/EditDeliveryModal";
import AddSectionModal from "./section/AddSectionModal";
import EditSectionModal from "./section/EditSectionModal";
import RemoveSectionModal from "./section/RemoveSectionModal";
const MenuModal = ({ clicked, setIsOpen, type, setSectionName, setProductName, setProductPrice, setProductDescription, additionalItems }) => {

  const [mainChange, setMainChange] = useState('');

  useEffect(() => {
    const layer = document.getElementById('layer');
    const modal = document.getElementById('modal');
    const close = document.getElementById('close');
    if (clicked !== '') {
      setMainChange(clicked);
      layer.style.opacity = '1';
      layer.style.zIndex = '10';
      modal.style.transform = 'scale(1)';
      // disallow scroll
      document.body.style.overflowY = 'hidden';
    }
    close.addEventListener('click', () => {
      layer.style.opacity = '0';
      layer.style.zIndex = '-10';
      modal.style.transform = 'scale(0)';
      // allow scroll
      document.body.style.overflowY = 'visible';
      setIsOpen(false);
    });
  }, [clicked, setIsOpen]);

  return (
    <section id='layer' className="modal">
      <div id="modal" className="modal__content">
        <i id='close' className="fa fa-times" aria-hidden="true"></i>
        {type === 'editName' && <ChangeProductNameModal productName={mainChange} productPrice={additionalItems[0]} productDescription={additionalItems[1]} setProductName={setProductName} />}
        {type === 'editPrice' && <ChangeProductPriceModal productName={additionalItems[0]} productPrice={mainChange} productDescription={additionalItems[1]} setProductPrice={setProductPrice} />}
        {type === 'editDescription' && <ChangeProductDescriptionModal productName={additionalItems[0]} productPrice={additionalItems[1]} productDescription={mainChange} setProductDescription={setProductDescription} />}
        {type === 'removeProduct' && <RemoveProductModal productItems={additionalItems} />}
        {type === 'addProduct' && <AddProductModal />}
        {type === 'editDeliveryCost' && <EditDeliveryModal />}
        {type === 'addSection' && <AddSectionModal />}
        {type === 'editSection' && <EditSectionModal sectionName={mainChange} setSectionName={setSectionName} />}
        {type === 'removeSection' && <RemoveSectionModal sectionName={clicked} />}
      </div>
    </section>
  );
}
export default MenuModal;
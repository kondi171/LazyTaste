import { useEffect, useState } from "react";
import ChangeSectionNameModal from "./ChangeSectionNameModal";
import ChangeProductNameModal from "./ChangeProductNameModal";
import ChangeProductPriceModal from "./ChangeProductPriceModal";
import RemoveProductModal from "./RemoveProductModal";
const MenuModal = ({ clicked, setIsOpen, type, setSectionValue, setProductValue, setPriceValue, additionalItems }) => {

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
        {type === 'section' && <ChangeSectionNameModal sectionName={mainChange} setSectionValue={setSectionValue} />}
        {type === 'product' && <ChangeProductNameModal productName={mainChange} productPrice={additionalItems} setProductValue={setProductValue} />}
        {type === 'price' && <ChangeProductPriceModal productName={additionalItems} productPrice={mainChange} setPriceValue={setPriceValue} />}
        {type === 'removeProduct' && <RemoveProductModal productItems={additionalItems} />}
      </div>
    </section>
  );
}
export default MenuModal;
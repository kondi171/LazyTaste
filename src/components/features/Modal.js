import { useEffect, useState } from "react";
import logo from './../../assets/img/LT-logo-transparent.png';
import Login from '../landing_page/Login';
import Register from '../landing_page/Register';
const Modal = ({ clicked, setIsOpen }) => {
  const [whatClicked, setWhatClicked] = useState('');



  useEffect(() => {
    const layer = document.getElementById('layer');
    const modal = document.getElementById('modal');
    const close = document.getElementById('close');
    if (clicked !== '') {
      setWhatClicked(clicked);
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
    return () => close.removeEventListener('click');

  }, [clicked]);

  return (
    <section id='layer' className="modal">
      <div id="modal" className="modal__content">
        <i id='close' className="fa fa-times" aria-hidden="true"></i>
        {(clicked === 'customerLogin' || whatClicked === 'customerLogin') && <Login name="Customer" />}
        {(clicked === 'customerRegister' || whatClicked === 'customerRegister') && <Register name="Customer" />}
        {(clicked === 'restaurantLogin' || whatClicked === 'restaurantLogin') && <Login name="Restaurant" />}
        {(clicked === 'restaurantRegister' || whatClicked === 'restaurantRegister') && <Register name="Restaurant" />}
        {(clicked === 'login' && whatClicked !== 'customerLogin' && whatClicked !== 'restaurantLogin') &&
          <>
            <img className="modal__logo" src={logo} alt="LaztyTaste logo" />
            <div className="btn-wrapper">
              <button onClick={() => setWhatClicked('customerLogin')}>Login as Customer</button>
              <button onClick={() => setWhatClicked('restaurantLogin')}>Login as Restaurant</button>
            </div>
          </>
        }
        {(clicked === 'register' && whatClicked !== 'customerRegister' && whatClicked !== 'restaurantRegister') &&
          <>
            <img className="modal__logo" src={logo} alt="LaztyTaste logo" />
            <div className="btn-wrapper">
              <button onClick={() => setWhatClicked('customerRegister')}>Register as Customer</button>
              <button onClick={() => setWhatClicked('restaurantRegister')}>Register as Restaurant</button>
            </div>
          </>
        }
      </div>
    </section>
  );
}
export default Modal;
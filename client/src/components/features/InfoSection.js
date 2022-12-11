import blank from '../../assets/img/logo/blank.png';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
const InfoSection = ({ place }) => {
  const { loggedUser } = useContext(AppContext);
  return (
    <>
      {loggedUser.avatar === 'blank' ? <img src={blank} alt={`Avatar of ${loggedUser.name}`} /> :
        <img src={loggedUser.avatar} alt={`Avatar of ${loggedUser.name}`} />}
      <h3>{loggedUser.name} {loggedUser.lastname}</h3>
      <div className="account-column__info">
        <div className='single-info'>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <span>Mail</span>
        </div>
        <span>{loggedUser.mail}</span>
        <div className='single-info'>
          <i className="fa fa-phone" aria-hidden="true"></i>
          <span>Phone</span>
        </div>
        <span>{loggedUser.phone}</span>
        <div className='single-info'>
          <i className="fa fa-location-arrow" aria-hidden="true"></i>
          <span>Adress</span>
        </div>
        <span>{loggedUser.adress}</span>
        {place === 'customerView' &&
          <>
            <div className='single-info'>
              <i className="fa fa-product-hunt" aria-hidden="true"></i>
              <span>Promotion</span>
            </div>
            <span>{loggedUser.promotion}</span>
          </>}
        {place === 'menu' &&
          <>
            <div className='single-info'>
              <i className="fa fa-product-hunt" aria-hidden="true"></i>
              <span>Promotion</span>
            </div>
            <span>{loggedUser.promotion}</span>
          </>
        }
      </div>
      <div className="account-column__logout">
        {place === 'home' && <a href='https://zesty-malabi-0aaf06.netlify.app'>Logout</a>}
        {place === 'customerView' && <a href='https://zesty-malabi-0aaf06.netlify.app'>Back</a>}
      </div>
    </>
  );
}

export default InfoSection;
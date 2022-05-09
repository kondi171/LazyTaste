import logo from '../../assets/img/restaurant-logo.jpg';
const InfoColumn = ({ place }) => {
  return (
    <>
      <img src={logo} alt="Avatar" />
      <h3>Try This Kebab</h3>
      <div className="account-column__info">
        <div className='single-info'>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <span>Mail</span>
        </div>
        <span>wk.k.nowak@gmail.com</span>
        <div className='single-info'>
          <i className="fa fa-phone" aria-hidden="true"></i>
          <span>Phone</span>
        </div>
        <span>+48 690 992 435</span>
        <div className='single-info'>
          <i className="fa fa-location-arrow" aria-hidden="true"></i>
          <span>Adress</span>
        </div>
        <span>Leszczyńska 69C/69, 25-325 Kielce</span>
      </div>
      <div className="account-column__logout">
        {place === 'menu' ? <a href="http://localhost:3000">Public Menu</a> : <a href="http://localhost:3000">Logout</a>}
      </div>
    </>
  );
}

export default InfoColumn;
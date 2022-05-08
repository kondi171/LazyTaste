import blank from "../../assets/img/blank-photo.png";
import logo from './../../assets/img/LT-logo-transparent.png';
const Promotion = () => {
  return (
    <section className="promotion">
      <div className="searchbox">
        <div className="searchbar">
          <img className="logo" src={logo} alt="LazyTaste logo" />
          <i className="fa fa-search" aria-hidden="true"></i>
          <input className="search-input" placeholder="Type to search..." type="text" />
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </div>
      <div className="promotion-content">
        <div className="create-promo">
          <h3 className="create-area__title">
            <i className="fa fa-product-hunt" aria-hidden="true"></i>
            <span>Set Promotion</span>
          </h3>
          <textarea className="area-content" placeholder="Write Promotion..." name="area-content" id="area-content"></textarea>
          <button className="set-area-btn">Set Promotion</button>
        </div>
        <div className="promo-restaurant-list">
          <h3 className="promo-restaurant-list__title">Restaurant List:</h3>
          <ul className="promo-restaurant-list__list">
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Saray Kebab</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Alibaba Kebab</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Maxi Pizza</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Adriano Pizza</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Saray Kebab</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Alibaba Kebab</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Maxi Pizza</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Adriano Pizza</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Saray Kebab</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Alibaba Kebab</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Maxi Pizza</h4>
            </li>
            <li>
              <img src={blank} alt="Restaurant logo" />
              <h4>Adriano Pizza</h4>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default Promotion;
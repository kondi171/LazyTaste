import blank from "../../assets/img/blank-photo.png";
import logo from './../../assets/img/LT-logo-transparent.png';

const Offer = () => {
  const clearIcon = document.querySelector(".fa-times-circle");
  const searchBar = document.querySelector(".fa-search");
  const handleChangeVisibility = () => {

    if (searchBar.value && clearIcon.style.visibility !== "visible") {
      clearIcon.style.visibility = "visible";
    } else if (!searchBar.value) {
      clearIcon.style.visibility = "hidden";
    }
  }
  const handleClickVisibility = () => {
    searchBar.value = "";
    clearIcon.style.visibility = "hidden";
  }
  return (
    <>
      <section className="offer">
        <div className="searchbox">
          <div className="searchbar">
            <img className="logo" src={logo} alt="LazyTaste logo" />
            <i className="fa fa-search" aria-hidden="true"></i>
            <input className="search-input" onClick={handleClickVisibility} onChange={handleChangeVisibility} placeholder="Type to search..." type="text" />
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </div>
        </div>
        <div className="section-content">
          <div className="favourites">
            <h3 className="favourites__title">
              <i className="fa fa-heart" aria-hidden="true"></i>
              <span>Favourites</span>
            </h3>
            <ul className="favourites__list">
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
            <div className="favourites__result">
              You have <span>4</span> favourites restaurants.
            </div>
          </div>

          <div className="restaurant-list">
            <h3 className="restaurant-list__title">Restaurant List:</h3>
            <ul className="restaurant-list__list">
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
        <div className="offer__result">
          Result: <span>34</span>
        </div>
      </section>

    </>
  );
}

export default Offer;
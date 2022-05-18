import { useState } from "react";
import blank from "../../assets/img/blank-photo.png";
import logo from './../../assets/img/LT-logo-transparent.png';
const Promotion = () => {
  const competitors = [
    {
      img: blank,
      title: 'Saray Kebab',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Alibaba Kebab',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Maxi Pizza',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Pizza Adriano',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'McDonalds',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'KFC',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'Wieś Pizza',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
    {
      img: blank,
      title: 'North Fish',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi sapiente inventore aperiam, architecto ducimus quaerat vitae temporibus eius iste.'
    },
  ];
  const [activePromotion, setActivePromotion] = useState('None');
  const [filter, setFilter] = useState(competitors);

  const handleSetPromotion = () => {
    const newPromotion = document.querySelector('.area-content');
    setActivePromotion(newPromotion.value);
    newPromotion.value = '';
  }

  const handleSearch = () => {
    const search = document.getElementById('search').value.toLowerCase();
    const result = competitors.filter(competitor => competitor.title.toLowerCase().includes(search));
    setFilter(result);
  }

  return (
    <section className="promotion">
      <div className="searchbox">
        <div className="searchbar">
          <img className="logo" src={logo} alt="LazyTaste logo" />
          <i className="fa fa-search" aria-hidden="true"></i>
          <input onChange={handleSearch} id="search" className="search-input" placeholder="Type restaurant to search..." type="search" />
        </div>
      </div>
      <div className="promotion-content">
        <div className="create-promo">
          <h3 className="create-area__title">
            <i className="fa fa-product-hunt" aria-hidden="true"></i>
            <span>Set Promotion</span>
          </h3>
          <textarea className="area-content" placeholder="Write Promotion..." required minLength="5" maxLength="100" name="area-content" id="area-content"></textarea>
          <button onClick={handleSetPromotion} className="set-area-btn">Set Promotion</button>
          <div className="active-promo">
            <h4>* Active Promotion *</h4>
            <p>{activePromotion}</p>
          </div>
        </div>
        <div className="promo-restaurant-list">
          <h3 className="promo-restaurant-list__title">Competitors promotions:</h3>
          <ul className="promo-restaurant-list__list">

            {filter && filter.map(competitor => {
              return (
                <li key={competitor.title}>
                  <img src={competitor.img} alt={`${competitor.title} logo`} />
                  <div className="content-info">
                    <h4>{competitor.title}</h4>
                    <p>{competitor.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="promotion__result">
        Result: <span>{filter.length}</span>
      </div>
    </section>
  );
}
export default Promotion;
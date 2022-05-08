import logo from './../../assets/img/LT-logo-transparent.png';
const Orders = () => {
  return (
    <section className="orders">
      <div className="searchbox">
        <div className="searchbar">
          <img className="logo" src={logo} alt="LazyTaste logo" />
          <i className="fa fa-search" aria-hidden="true"></i>
          <input className="search-input" placeholder="Type to search..." type="text" />
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </div>
      <div className="row-view">
        <div className="column-view">
          <div className="sort">
            <h3 className="sort__title">
              <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
              <span>Sort</span>
            </h3>
            <label htmlFor="sortByHighestPrice">Highest Price</label>
            <input id="sortByHighestPrice" type="radio" name="sort" />

            <label htmlFor="sortByLowestPrice">Lowest Price</label>
            <input id="sortByLowestPrice" type="radio" name="sort" />

            <label htmlFor="sortByEarliestDate">Earliest Date</label>
            <input id="sortByEarliestDate" type="radio" name="sort" />

            <label htmlFor="sortByLatestDate">Latest Date</label>
            <input id="sortByLatestDate" type="radio" name="sort" />
          </div>
          <div className="expenses">
            <span>You spent<i> 893.34 </i>PLN</span>
          </div>
        </div>
        <div className="orders__order-list">
          <h3>Your Orders:</h3>
          <p className="empty-orders">You don't have any orders yet!</p>
        </div>
      </div>
    </section>
  );
}

export default Orders;
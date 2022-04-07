import Navigation from '../features/Navigation';
const Orders = () => {
  return (
    <section className="orders">
      <Navigation />
      <div className="searchbox">
        <div className="searchbar">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input className="search-input" placeholder="Type to search..." type="text" />
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </div>
      <div className="row-view">
        <div className="column-view">
          <div className="sort">

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
            <span>You spent 893.34 PLN</span>
          </div>
        </div>
        <div className="orders__order-list">
          list
        </div>
      </div>
    </section>
  );
}

export default Orders;
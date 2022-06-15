import logo from './../../../assets/img/logo/LT-logo-transparent.png';
import Searchbar from './Searchbar';
const CustomerOrdersSearchbar = ({ data, setFilter, searchType, setOrdersValue }) => {
  const handleSearch = () => {
    let result = null;
    let amount = 0;
    const search = document.getElementById('search').value.toLowerCase();

    if (searchType === 'searchByName') result = data.filter(data => data.restaurantName.toLowerCase().includes(search));
    else if (searchType === 'searchByPrice') result = data.filter(data => data.paid.toString().includes(search));
    else if (searchType === 'searchByDate') result = data.filter(data => data.date.toLowerCase().includes(search));
    else if (searchType === 'searchByMessage') result = data.filter(data => data.message.toLowerCase().includes(search));
    else result = data.filter(data => data.name.toLowerCase().includes(search));
    result.forEach(element => amount += element.paid);
    setOrdersValue(amount.toFixed(2));
    setFilter(result);
  }
  return (
    <div className="searchbar">
      <img className="logo" src={logo} alt="LazyTaste logo" />
      <i className="fa fa-search" aria-hidden="true"></i>
      <input onChange={handleSearch} id="search" className="search-input" placeholder="Search in orders..." type="search" />
    </div>
  );
}
export default CustomerOrdersSearchbar;
import logo from './../../../assets/img/logo/LT-logo-transparent.png';
const Searchbar = ({ data, setFilter, searchType, setOrdersValue }) => {
  const handleSearch = () => {

    const search = document.getElementById('search').value.toLowerCase();
    const result = data.filter(data => data.name.toLowerCase().includes(search));
    setFilter(result);
  }
  return (
    <div className="searchbar">
      <img className="logo" src={logo} alt="LazyTaste logo" />
      <i className="fa fa-search" aria-hidden="true"></i>
      <input onChange={handleSearch} id="search" className="search-input" placeholder="Type restaurant to search..." type="search" />
    </div>
  );
}
export default Searchbar;
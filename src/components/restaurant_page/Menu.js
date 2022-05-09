import InfoColumn from "../features/InfoColumn";

const Menu = () => {
  return (
    <section className="menu">
      <div className="menu__account-column">
        <InfoColumn as='restaurant' place='menu' />
      </div>
      <div className="menu__control-panel">
        <h2>Menu</h2>
        <section className="menu__section">
          <div className="single-section">
            <div className="section__title">
              <h3>Fast Food</h3>
              <i className="fa fa-refresh" aria-hidden="true"></i>
              <i id='close' className="fa fa-times" aria-hidden="true"></i>
            </div>
            <ul>
              <li>
                <div className="content">Kebab XL <i className="fa fa-refresh" aria-hidden="true"></i></div>
                <div className="price">19.99 PLN <i className="fa fa-refresh" aria-hidden="true"></i></div>
              </li>
              <li>
                <div className="content">Pizza 45cm <i className="fa fa-refresh" aria-hidden="true"></i></div>
                <div className="price">39.99 PLN <i className="fa fa-refresh" aria-hidden="true"></i></div>
              </li>
              <li>
                <div className="content">Coca-cola 0.5l <i className="fa fa-refresh" aria-hidden="true"></i></div>
                <div className="price">9.99 PLN <i className="fa fa-refresh" aria-hidden="true"></i></div>
              </li>
              <li>
                <div className="content">Zakąska do wódki <i className="fa fa-refresh" aria-hidden="true"></i></div>
                <div className="price">Gratis <i className="fa fa-refresh" aria-hidden="true"></i></div>
              </li>
              <li>
                <div className="content">Ciostko <i className="fa fa-refresh" aria-hidden="true"></i></div>
                <div className="price">4.99 PLN <i className="fa fa-refresh" aria-hidden="true"></i></div>
              </li>
              <li className="add-item">
                <h4>Add item</h4>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </li>
            </ul>
            <div className="add-section">
              <h4>Add Section</h4>

              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>

        </section>
      </div>
    </section>
  );
}
export default Menu;

import { Link as ScrollLink } from 'react-scroll';
const Header = () => {
  const followMouse = (e) => {
    // const header = document.getElementById('header');
    // const title = header.querySelector('h1');
    // console.log(title);
  }
  return (
    <header id="header" onMouseOver={followMouse} className="header">
      <div className="admission">
        <h1>LazyTaste</h1>
        <h3>Hungry? We are everything, what you need!</h3>
      </div>
      <ScrollLink className="pull" to="introduction" smooth={true} duration={400} offset={-100}><i className="fa fa-angle-double-down" aria-hidden="true"></i></ScrollLink>

    </header>
  );
}

export default Header;
import logo from '../../assets/img/logo/LT-logo-transparent.png';
const MiniFooter = () => {
  return (
    <footer className="footer__mini-footer">
      <div className="mini-footer__logo">
        <img src={logo} alt="LazyTaste logo" />
      </div>
      <div className="text-container">
        <div className="author"> Web Developer - Konrad Nowak</div>
      </div>
      <div className="footer__socials">
        <a href="#" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
        <a href="#" target="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
        <a href="#" target="_blank"><i className="fa fa-id-card" aria-hidden="true"></i></a>
      </div>
    </footer>
  );
}
export default MiniFooter;
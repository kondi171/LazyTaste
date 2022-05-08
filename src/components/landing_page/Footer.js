import logo from './../../assets/img/LT-logo-transparent.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <section className="footer__content--sources">
          <h4 className="subtitle">Sources</h4>
          <ul>
            {/* Photo by <a href="https://unsplash.com/@briewilly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chad Montano</a> on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}

            {/* <li><a href="https://www.freepik.com/photos/countertop" target="_blank"><b>Countertop photo created by yingyang</b> - www.freepik.com</a></li> */}
            <li>Photo by <a href="https://unsplash.com/@fabmag?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Fabrizio Magoni</a> on <a href="https://unsplash.com/s/photos/gastronomy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a>
            </li>
            <li>Photo by <a href="https://unsplash.com/@alexhaney?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Alex Haney</a> on <a href="https://unsplash.com/s/photos/restaurant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a>
            </li>
            <li>Photo by <a href="https://unsplash.com/@louishansel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Louis Hansel</a> on <a href="https://unsplash.com/s/photos/restaurant?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a>
            </li>
            <li><a href='https://www.freepik.com/photos/fresh-vegetables' target="_blank" rel="noreferrer"><b>Fresh vegetables photo created by valeria_aksakova</b> - www.freepik.com</a></li>
          </ul>
        </section>
        <section className="footer__content--contact">
          <h4 className="subtitle">Direct Contact</h4>
          <span><i className="fa fa-envelope" aria-hidden="true"></i> wk.k.nowak@gmail.com</span>
          <span><i className="fa fa-envelope-o" aria-hidden="true"></i> kondi.171@wp.pl</span>
          <span><i className="fa fa-phone" aria-hidden="true"></i> +48 690 992 435</span>
          <span><i className="fa fa-heart" aria-hidden="true"></i> Social Media</span>
        </section>
        <section className="footer__content--documents">
          <h4 className="subtitle">Documents</h4>
          <ul>
            <li><a href="#" target="_blank">Statute</a></li>
            <li><a href="#" target="_blank">FAQ</a></li>
            <li><a href="#" target="_blank">Support</a></li>
          </ul>
        </section>
      </div>
      <section className="footer__logo">
        <img src={logo} alt="LazyTaste logo" />
      </section>
      <section className="footer__socials">
        <a href="#" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
        <a href="#" target="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
        <a href="#" target="_blank"><i className="fa fa-id-card" aria-hidden="true"></i></a>
      </section>
      <section className="footer__author"> Web Developer - Konrad Nowak</section>
    </footer>
  );
}

export default Footer;
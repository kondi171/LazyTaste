import Header from './Header';
import Nav from './Nav';
import Introduction from './Introduction';
import Join from './Join';
import Opinions from './Opinions';
import Footer from './Footer';
import Login from './Login';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <Header />
      <Nav />
      <Introduction />
      <Join />
      {/* <Login /> */}
      <div className="layer">
        <Opinions />
        <Footer />
      </div>

    </div>
  );
}

export default LandingPage;
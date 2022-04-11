import Header from './Header';
import Nav from './Nav';
import Introduce from './Introduce';
import Join from './Join';
import Opinions from './Opinions';
import Footer from './Footer';


const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <Header />
      <Nav />
      <Introduce />
      <div className="layer">

        {/* <Join /> */}
        <Opinions />
        <Footer />
      </div>

    </div>
  );
}

export default LandingPage;
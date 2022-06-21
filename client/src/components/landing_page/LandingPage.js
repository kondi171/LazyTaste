import Header from './Header';
import Nav from './Nav';
import Introduction from './Introduction';
import Join from './Join';
import Opinions from './Opinions';
import Footer from './Footer';
import Message from '../features/Message';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useEffect } from 'react';

const LandingPage = () => {
  const { setPredictedRestaurant } = useContext(AppContext);

  useEffect(() => {
    setPredictedRestaurant({});
  }, []);
  return (
    <div className="landing-wrapper">
      <Header />
      <Nav />
      <Introduction />
      <Join />
      <div className="layer">
        <Opinions />
        <Footer />
      </div>
      <Message />
    </div>
  );
}

export default LandingPage;
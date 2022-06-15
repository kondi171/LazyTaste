import Header from './Header';
import Nav from './Nav';
import Introduction from './Introduction';
import Join from './Join';
import Opinions from './Opinions';
import Footer from './Footer';
import Message from '../features/Message';

const LandingPage = () => {
  // const testID = '629c7bb6eb03e6d436cd6987';
  // const fillMenu = () => {
  //   const body = new URLSearchParams({
  //     id: testID,
  //     product: JSON.stringify(
  //       {
  //         productName: 'Krewetki',
  //         productPrice: 49.99,
  //       },
  //       {
  //         productName: 'Przecier pomidorowy',
  //         productPrice: 12.99,
  //       },
  //     )
  //   });
  //   fetch(`http://localhost:4000/API/restaurant/menu/add-product`, {
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     method: 'PUT',
  //     body: body
  //   });


  // ADD SECTION 
  // const body = new URLSearchParams({
  //   id: testID,
  //   sectionName: "Drinks",
  // })
  // fetch(`http://localhost:4000/API/restaurant/menu/add-section`, {
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   method: 'PUT',
  //   body: body
  // })

  // }
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
import { Link as ScrollLink } from 'react-scroll';

const Introduction = () => {
  return (
    <section id="introduction" className="introduce">
      <div id="introMotto" className="introduce__title fade-motto">
        <h2 className="introduce__title--large-subtitle">We are everything, what you need!</h2>
        <h4 className="introduce__title--small-subtitle">Hungry?</h4>
      </div>
      <div id="introContent" className="introduce__content fade-content">
        <h3 className="introduce__main-title">Introduction</h3>
        <p>
          Do you want to explore a world where all of your favourites dishes ale in one place?
          Or maybe you are the owner or represantative of a restaurant and you want to expand your ranges?
          You have come to the right place! Our system offers safe cooperation between the client and the restaurant,
          thanks to which you can order anything what you want without leaving your home! For customers, we offer
          an smart assistant who will help you choose your today's meal! Join us and take adventage of our services!
        </p>
        <ScrollLink to="join" smooth={true} duration={400} offset={-100} className="check"><span className="visible">Check this out!</span><span className="invisible">Click!</span></ScrollLink>
      </div>
    </section>
  );
}

export default Introduction;
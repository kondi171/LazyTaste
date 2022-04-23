import logo from './../../assets/img/LT-logo-transparent.png';
import { animateScroll as scroll } from "react-scroll/modules";
import { Link as ScrollLink } from 'react-scroll';
import { useEffect } from 'react';
const Nav = () => {
  useEffect(() => {
    const header = document.getElementById('header');
    const nav = document.querySelector('.nav');
    const logo = document.getElementById('logo');
    const introMotto = document.getElementById('introMotto');
    const introContent = document.getElementById('introContent');
    window.addEventListener('scroll', () => {
      if (window.scrollY + 150 > header.offsetHeight) {
        nav.classList.add('rolled');
        logo.classList.add('display');
      } else {
        nav.classList.remove('rolled');
        logo.classList.remove('display');
      }
      if (window.scrollY + 350 > header.offsetHeight) {
        introMotto.classList.remove('fade-motto');
        introContent.classList.remove('fade-content');
      } else {
        introMotto.classList.add('fade-motto');
        introContent.classList.add('fade-content');
      }
    });
  });



  return (
    <nav className="nav">
      <nav className="nav__access">
        <div className="nav__access nav__access--sign-in">Sign In</div>
        <div className="nav__access nav__access--sign-up">Sign Up</div>
      </nav>
      <img id="logo" onClick={() => scroll.scrollToTop()} className="nav__logo" src={logo} alt="LazyTaste logo" />
      <nav className="nav__options">
        <ScrollLink className="nav__options--option" to="introduction" smooth={true} duration={400} offset={-100}>Introduction</ScrollLink>
        <ScrollLink className="nav__options--option" to="join" smooth={true} duration={400} offset={-100}>Join</ScrollLink>
        <ScrollLink className="nav__options--option" to="opinions" smooth={true} duration={400} offset={-100}>Opinions</ScrollLink>
      </nav>
    </nav>
  );
}

export default Nav;
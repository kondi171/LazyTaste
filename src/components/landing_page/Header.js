import { useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
const Header = () => {

  useEffect(() => {
    const spnText = document.querySelector('.text');
    const spnCursor = document.querySelector('.cursor');
    const txt = ['Hungry?', 'We are everything, what you need!'];
    let letterAdding = 1;
    let newWord = false;
    for (let i = 0; i < txt.length; i++) {
      setTimeout(() => {
        for (let j = 0; j < txt[i].length; j++) {
          setTimeout(() => {
            if ((txt[i].length - 1) === j) newWord = true;
            spnText.textContent += txt[i][j];
            if (txt.length - 1 === i && txt[i].length - 1 === j) spnText.textContent = txt[i];
          }, 50 * letterAdding);
          letterAdding++;
        }
        if (newWord) {
          newWord = false;
          spnText.textContent = '';
        }
      }, 2000 * (i + 1));
    }

    setInterval(() => {
      spnCursor.classList.toggle('active');
    }, 400);
  }, []);

  return (
    <header id="header" className="header">
      <div className="admission">
        <h1>LazyTaste</h1>
        <h3 className='typing'>
          <span className="text"></span><span className="cursor">|</span>
        </h3>
      </div>
      <ScrollLink className="pull" to="introduction" smooth={true} duration={400} offset={-100}><i className="fa fa-angle-double-down" aria-hidden="true"></i></ScrollLink>
    </header>
  );
}

export default Header;
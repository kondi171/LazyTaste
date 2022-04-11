const Nav = () => {
  return (
    <nav className="nav">
      <nav className="nav__access">
        <div className="nav__access--sign-in">Sign In</div>
        <div className="nav__access--sign-up">Sign Up</div>
      </nav>
      <nav className="nav__options">
        <div className="nav__options--option">Introduce</div>
        <div className="nav__options--option">Join</div>
        <div className="nav__options--option">Opinions</div>
      </nav>
    </nav>
  );
}

export default Nav;
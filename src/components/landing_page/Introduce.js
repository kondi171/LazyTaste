import { Link } from 'react-router-dom';

const Introduce = () => {
  return (
    <section className="introduce">
      <div className="introduce__title">
        <h2 className="introduce__title--large-subtitle">We are everything, what you need!</h2>
        <h4 className="introduce__title--small-subtitle">Hungry?</h4>
      </div>
      <div className="introduce__content">
        <h3 className="introduce__main-title">Introduce</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nulla maxime quia ipsa iure, doloremque eius,
          maiores unde atque fuga quibusdam fugit velit nisi nostrum
          sapiente expedita tempora excepturi sed totam voluptate numquam,
          earum laboriosam. Voluptatibus animi recusandae fugiat esse sed qui temporibus?
          Beatae nam deleniti repudiandae reprehenderit eaque nostrum id eos, itaque,
          unde adipisci inventore, cum optio voluptas non nesciunt voluptatem
          vel saepe recusandae alias. Vero animi saepe molestias et!
        </p>
        <Link to='/lazytaste' className="check"><span className="visible">Check this out!</span><span className="invisible">Click!</span></Link>
      </div>
    </section>
  );
}

export default Introduce;
const Opinions = () => {
  return (
    <section id="opinions" className="opinions">
      <h3 className="opinions__title">Opinions</h3>
      <div className="opinions__opinions">
        <div className="opinions__container">
          <div className="opinions__review">
            <div className="stars">
              <div className="author">Ania</div>
              <span>★★★★</span>★
            </div>

          </div>
          <div className="opinions__opinion">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta aperiam nobis praesentium assumenda
            hic animi ab, asperiores quaerat repellat, sint et ut, placeat commodi architecto! Illum ullam
            sapiente nam beatae? Sequi voluptas ipsa numquam tempore molestias consequatur dolorum culpa recusandae.
          </div>
        </div>
        <div className="opinions__container">
          <div className="opinions__review">
            <div className="author">Maciek</div>
            <div className="stars">
              <span>★★★★★</span>
            </div>

          </div>
          <div className="opinions__opinion">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta aperiam nobis praesentium assumenda
            hic animi ab, asperiores quaerat repellat, sint et ut, placeat commodi architecto! Illum ullam
            sapiente nam beatae? Sequi voluptas ipsa numquam tempore molestias consequatur dolorum culpa recusandae.
          </div>
        </div>
        <div className="opinions__container">
          <div className="opinions__review">
            <div className="author">Grzegorz</div>
            <div className="stars">
              <span>★★★</span>★★
            </div>

          </div>
          <div className="opinions__opinion">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta aperiam nobis praesentium assumenda
            hic animi ab, asperiores quaerat repellat, sint et ut, placeat commodi architecto! Illum ullam
            sapiente nam beatae? Sequi voluptas ipsa numquam tempore molestias consequatur dolorum culpa recusandae.
          </div>

        </div>
      </div>
      <div className="rating">
        Overall Rating: 4.7
      </div>

    </section>
  );
}

export default Opinions;
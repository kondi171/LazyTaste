import { useEffect, useState } from "react";

const Opinions = () => {
  const constantTime = 9;
  let average = 0;
  const [reviewsIndex, setReviewsIndex] = useState(0);
  const [timeToChange, setTimeToChange] = useState(constantTime);
  const [opinions, setOpinions] = useState(null);

  const calculateAverage = () => {
    if (opinions) {
      let sum = 0;
      opinions.forEach(opinion => {
        sum += opinion.rate
      });
      average = sum / opinions.length;
      return average.toFixed(2);
    }
  }

  useEffect(() => {
    fetch('http://localhost:4000/API/opinions')
      .then(res => res.json())
      .then(opinions => setOpinions(opinions))

  }, []);

  useEffect(() => {
    let fadeTimeout;
    let unfadeTimeout;
    let transitionTimeout;
    if (opinions) {
      const review = document.querySelector('.opinions__container');
      const transitionDuration = parseFloat(getComputedStyle(review).transitionDuration) * 1000;

      unfadeTimeout = setTimeout(() => {
        review.classList.add('fade');
      }, constantTime * 1000 - transitionDuration);
      fadeTimeout = setTimeout(() => {
        if (reviewsIndex === opinions.length - 1) setReviewsIndex(0);
        else setReviewsIndex(reviewsIndex + 1);
      }, constantTime * 1000);
      transitionTimeout = setTimeout(() => {
        review.classList.remove('fade');
      }, constantTime * 1000 + transitionDuration);
    }
    // return () => {
    //   clearTimeout(fadeTimeout);
    //   clearTimeout(unfadeTimeout);
    //   clearTimeout(transitionTimeout);
    // }
  }, [reviewsIndex, opinions]);

  useEffect(() => {
    const changeTimeout = setTimeout(() => {
      if (timeToChange === 1) setTimeToChange(constantTime);
      else setTimeToChange(timeToChange - 1);
    }, 1000);
    return () => clearTimeout(changeTimeout);
  }, [timeToChange]);

  return (

    <section id="opinions" className="opinions">
      <h3 className="opinions__title">Opinions</h3>
      <div className="opinions__flex">
        {opinions && <div className="opinions__container">
          <div className="opinions__review">
            <div className="stars">
              <div className="author">{opinions[reviewsIndex].user}</div>
              {opinions[reviewsIndex].rate === 5 ? <div><span>★★★★★</span></div> : ''}
              {opinions[reviewsIndex].rate === 4 ? <div><span>★★★★</span>★</div> : ''}
              {opinions[reviewsIndex].rate === 3 ? <div><span>★★★</span>★★</div> : ''}
              {opinions[reviewsIndex].rate === 2 ? <div><span>★★</span>★★★</div> : ''}
              {opinions[reviewsIndex].rate === 1 ? <div><span>★</span>★★★★</div> : ''}
            </div>
          </div>
          <div className="opinions__opinion">
            {opinions[reviewsIndex].content}
          </div>
        </div>}
        <div className="opinions__rating">
          <h4>Overall Rating:</h4>
          <div>{calculateAverage()}</div>
          {average > 4.7 ? <div><span>★★★★★</span></div> : ''}
          {average > 3.7 && average <= 4.7 ? <div><span>★★★★</span>★</div> : ''}
          {average > 2.7 && average <= 3.7 ? <div><span>★★★</span>★★</div> : ''}
          {average > 1.7 && average <= 2.7 ? <div><span>★★</span>★★★</div> : ''}
          {average >= 1 && average <= 1.7 ? <div><span>★</span>★★★★</div> : ''}
        </div>
      </div>
      <div className="time">Next review in <i>{timeToChange}</i> seconds</div>
    </section>
  );
}

export default Opinions;
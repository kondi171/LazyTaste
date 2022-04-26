import { useEffect, useState } from "react";

const Opinions = () => {
  const constantTime = 2;
  let average = 0;
  let [reviewsIndex, changeReviewsIndex] = useState(0);
  let [timeToChange, changeTimeToChange] = useState(constantTime);
  const reviews = [
    {
      user: 'Ania',
      rate: 4,
      opinion: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    },
    {
      user: 'Maciek',
      rate: 5,
      opinion: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32`
    },
    {
      user: 'Wojtek',
      rate: 3,
      opinion: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
    },
    {
      user: 'Bożena',
      rate: 5,
      opinion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    },
  ];
  const calculateAverage = () => {
    let sum = 0;
    reviews.forEach(review => {
      sum += review.rate
    });
    average = sum / reviews.length;
    return average;
  }
  // const fadeIn = setInterval(() => {
  // review.classList.remove('fade');
  // clearInterval(fadeIn);
  // }, 100);
  useEffect(() => {
    // const review = document.querySelector('.opinions__container');
    // const fadeOut = setInterval(() => {
    //   review.classList.add('fade');
    //   clearInterval(fadeOut);

    // }, 100);

    setInterval(() => {
      if (reviewsIndex === reviews.length - 1) changeReviewsIndex(reviewsIndex = 0);
      else changeReviewsIndex(reviewsIndex += 1);
    }, constantTime * 1000);
    setInterval(() => {
      if (timeToChange === 1) changeTimeToChange(timeToChange = constantTime);
      else changeTimeToChange(timeToChange -= 1);
    }, 1000);
  }, []);
  return (
    <section id="opinions" className="opinions">
      <h3 className="opinions__title">Opinions</h3>
      <div className="opinions__flex">
        <div className="opinions__container">
          <div className="opinions__review">
            <div className="stars">
              <div className="author">{reviews[reviewsIndex].user}</div>
              {reviews[reviewsIndex].rate === 5 ? <div><span>★★★★★</span></div> : ''}
              {reviews[reviewsIndex].rate === 4 ? <div><span>★★★★</span>★</div> : ''}
              {reviews[reviewsIndex].rate === 3 ? <div><span>★★★</span>★★</div> : ''}
              {reviews[reviewsIndex].rate === 2 ? <div><span>★★</span>★★★</div> : ''}
              {reviews[reviewsIndex].rate === 1 ? <div><span>★</span>★★★★</div> : ''}
            </div>
          </div>
          <div className="opinions__opinion">
            {reviews[reviewsIndex].opinion}
          </div>
        </div>
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
import { useState } from "react";

const WriteOpinion = () => {
  const constantTime = 2000;
  let variousTime = constantTime;
  //DB
  const [rate, setRate] = useState(4);
  const [opinion, setOpinion] = useState('lorem ipsum dolor sit amet, dispatch strine vesion of veruas kwe quoraz libiere.');
  const [newRate, setNewRate] = useState(0);
  // Current inputs
  const [textareaValue, setTextAreaValue] = useState('');
  const [infoContent, setInfoContent] = useState('');

  const handleSubmitOpinion = () => {
    // clearTimeout(clearInfoTimeout);
    variousTime += constantTime;
    const infoDiv = document.querySelector('.info');
    if (textareaValue === '') {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('Opinion is empty!');
    }
    else if (textareaValue.length >= 100) {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('Opinion is too long! Max 100 characters');
    }
    else if (textareaValue.length <= 5) {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('Opinion is too short! Min 5 characters');
    }
    else if (newRate <= 0) {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('You not rated our app!');
    }
    else {
      infoDiv.classList.add('success');
      infoDiv.classList.remove('error');
      setInfoContent('Your opinion has been added!');
      setRate(newRate);
      setOpinion(textareaValue);
      // send to db *** HERE ***

    }
    var clearInfoTimeout = setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, variousTime);
  }

  const handleTextArea = () => {
    const textarea = document.getElementById('area-content');
    setTextAreaValue(textarea.value);
  }

  return (
    <section className="write-opinion">
      <div className="stars">
        <input onClick={() => setNewRate(5)} type="radio" id="star5" name="star" value="5" />
        <label htmlFor="star5"> Five Stars </label>
        <input onClick={() => setNewRate(4)} type="radio" id="star4" name="star" value="4" />
        <label htmlFor="star4"> Four Stars </label>
        <input onClick={() => setNewRate(3)} type="radio" id="star3" name="star" value="3" />
        <label htmlFor="star3"> Three Stars </label>
        <input onClick={() => setNewRate(2)} type="radio" id="star2" name="star" value="2" />
        <label htmlFor="star2"> Two Stars </label>
        <input onClick={() => setNewRate(1)} type="radio" id="star1" name="star" value="1" />
        <label htmlFor="star1"> One Star </label>
      </div>
      <textarea onChange={handleTextArea} className="area-content" placeholder="Write Opinion..." name="area-content" id="area-content"></textarea>
      <button onClick={handleSubmitOpinion} className="set-area-btn">Send Opinion</button>
      <div className="opinion__container">
        <div className="opinion__review">
          <div className="stars">
            {rate === 5 ? <div><span>★★★★★</span></div> : ''}
            {rate === 4 ? <div><span>★★★★</span>★</div> : ''}
            {rate === 3 ? <div><span>★★★</span>★★</div> : ''}
            {rate === 2 ? <div><span>★★</span>★★★</div> : ''}
            {rate === 1 ? <div><span>★</span>★★★★</div> : ''}
            {rate <= 0 ? <div><span></span>★★★★★</div> : ''}
            <h4>Your Opinion: </h4>
          </div>
        </div>
        <div className="opinion__opinion">
          {opinion ? opinion : "You haven't rated our app yet!"}
        </div>
      </div>
      <div className="info">{infoContent}</div>
    </section>
  );
}
export default WriteOpinion;
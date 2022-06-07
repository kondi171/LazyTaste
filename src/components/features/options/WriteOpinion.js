import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

const WriteOpinion = () => {
  const { loggedUser } = useContext(AppContext);

  const [rate, setRate] = useState(0);
  const [opinion, setOpinion] = useState("You haven't rated our app yet!");

  const [newRate, setNewRate] = useState(0);
  const [textareaValue, setTextAreaValue] = useState('');
  const [infoContent, setInfoContent] = useState('');
  const sendOpinion = async () => {
    const URL = 'http://localhost:4000/API/opinions';
    const body = new URLSearchParams({
      user: `${loggedUser.name}`,
      rate: newRate,
      content: textareaValue,
    });
    fetch(URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: body
    })
      .then(res => res.status)
      .catch(error => console.log(error));
  }

  const handleSubmitOpinion = () => {
    const infoDiv = document.querySelector('.info');

    if (textareaValue === '') {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('Opinion is empty!');
    }
    else if (textareaValue.length >= 500) {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('Opinion is too long! Max 500 characters');
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
    else if (opinion !== "You haven't rated our app yet!") {
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
      setInfoContent('You have already rated our application');
    }
    else {
      infoDiv.classList.add('success');
      infoDiv.classList.remove('error');
      setInfoContent('Your opinion has been added!');
      setRate(newRate);
      setOpinion(textareaValue);
      sendOpinion();
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }

  const handleTextArea = () => {
    const textarea = document.getElementById('area-content');
    setTextAreaValue(textarea.value);
  }
  useEffect(() => {
    fetch('http://localhost:4000/API/opinions')
      .then(res => res.json())
      .then(data => data.forEach(element => {
        if (element.user === `${loggedUser.name} ${loggedUser.lastname}`) {
          setRate(element.rate);
          setOpinion(element.content);
        }
      }));
  }, [loggedUser.name, loggedUser.lastname]);

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
          {opinion}
        </div>
      </div>
      <div className="info">{infoContent}</div>
    </section>
  );
}
export default WriteOpinion;
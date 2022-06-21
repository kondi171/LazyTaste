import { useState, useContext, useEffect } from 'react';
import blank from '../../../assets/img/logo/blank.png';
import { AppContext } from '../../AppContext';
const AvatarSettings = () => {

  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const [avatar, setAvatar] = useState('');
  const [infoContent, setInfoContent] = useState('');
  const [apiSystem, setApiSystem] = useState('');
  const infoDiv = document.querySelector('.info');

  const handleValidateAvatar = () => {
    const inputValue = document.getElementById('avatar').value;
    if (inputValue.length < 15) {
      setInfoContent('URL is too short!');
      infoDiv.classList.add('information');
    } else {
      setAvatar(inputValue);
      setInfoContent('Avatar has been updated!');
      updateData('avatar', inputValue);
      setLoggedUser({ ...loggedUser, avatar: inputValue });
    }
    setTimeout(() => {
      infoDiv.classList.remove('information');

    }, 2000);
  }

  const updateData = (field, fieldValue) => {
    // infoDiv.classList.remove('error');
    // infoDiv.classList.add('succes');
    infoDiv.classList.add('information')
    const URL = `http://localhost:4000/API/${apiSystem}`;
    const body = new URLSearchParams({
      id: loggedUser._id,
      value: fieldValue,
      field: field,
    });
    fetch(URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
      body: body,
    })
      .then(res => res.status)
      .catch(error => console.log(error));
  }
  const handleNotFoundImage = () => {
    setLoggedUser({ ...loggedUser, avatar: 'blank' });
    setInfoContent('Image was not found!');
    infoDiv.classList.add('information');

    updateData('avatar', 'blank');
  }
  useEffect(() => {
    if (loggedUser.NIP !== undefined) setApiSystem('restaurants');
    else setApiSystem('customers');
  }, [avatar, loggedUser])

  return (
    <section className="avatar-settings">
      {loggedUser.avatar === 'blank' ? <img src={blank} alt={`Avatar of ${loggedUser.name}`} /> :
        <img src={loggedUser.avatar} onError={handleNotFoundImage} alt={`Avatar of ${loggedUser.name}`} />}
      <input onChange={e => setAvatar(e.target.value)} id="avatar" type='text' name="avatar" placeholder="Paste URL to your new Avatar" />
      <button onClick={handleValidateAvatar}>Change Avatar</button>
      <div className="info">{infoContent}</div>
    </section>
  );
}
export default AvatarSettings;
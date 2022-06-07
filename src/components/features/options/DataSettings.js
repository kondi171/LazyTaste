import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";

const DataSettings = () => {
  const { loggedUser, setLoggedUser } = useContext(AppContext);
  const infoDiv = document.querySelector('.info');
  const [infoContent, setInfoContent] = useState('');
  const [data, setData] = useState({
    mail: '',
    password: '',
    name: '',
    lastname: '',
    phone: '',
    adress: '',
    NIP: '',
  });
  const [hashedPassword, setHashedPassword] = useState('');
  const [apiSystem, setApiSystem] = useState('');

  const handleChangeName = () => {
    const inputValue = document.getElementById('name').value;
    if (inputValue.length < 3 || inputValue.length > 16) {
      setData({ ...data, name: '' });
      setInfoContent('First name must be more than 3 characters and less than 16 characters!');
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
    } else {
      setData({ ...data, name: inputValue });
      setInfoContent('First name has been updated!');
      updateData('name', inputValue);
      setLoggedUser({ ...loggedUser, name: data.name });
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }
  const handleChangeLastname = () => {
    const inputValue = document.getElementById('lastname').value;
    if (inputValue.length < 3 || inputValue.length > 24) {
      setData({ ...data, lastname: '' });
      setInfoContent('Lastname must be more than 3 characters and less than 24 characters!');
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
    } else {
      setData({ ...data, lastname: inputValue });
      setInfoContent('Lastname has been updated!');
      infoDiv.classList.remove('error');
      infoDiv.classList.add('success')
      updateData('lastname', inputValue);
      setLoggedUser({ ...loggedUser, lastname: data.lastname });
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }
  const handleChangeMail = () => {
    const inputValue = document.getElementById('mail').value;
    if ((inputValue.indexOf('@') === -1) || (inputValue.length < 6 || inputValue.length > 36)) {
      setData({ ...data, mail: '' });
      setInfoContent('Mail must be more than 6 characters and less than 36 characters and has a @ sign in it!');
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
    } else {
      setData({ ...data, mail: inputValue });
      setInfoContent('Mail has been updated!');
      updateData('mail', inputValue);
      setLoggedUser({ ...loggedUser, mail: data.mail });
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }
  const handleChangePassword = () => {
    const inputValue = document.getElementById('password').value;
    if (inputValue.length < 6 || inputValue.length > 24) {
      setData({ ...data, password: '' });
      setInfoContent('Password must be more than 6 characters and less than 24 characters!');
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
    } else {
      setData({ ...data, password: inputValue });
      setInfoContent('Password has been updated!');
      updateData('password', inputValue);
      setLoggedUser({ ...loggedUser, password: data.password });
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }
  const handleChangePhone = () => {
    const inputValue = document.getElementById('phone').value;
    if (inputValue.length !== 9) {
      setData({ ...data, phone: '' });
      setInfoContent('Phone must be equal 9 numbers!');
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
    } else {
      setData({ ...data, phone: inputValue });
      setInfoContent('Phone has been updated!');
      updateData('phone', inputValue);
      setLoggedUser({ ...loggedUser, phone: data.phone });
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }
  const handleChangeAdress = () => {
    const inputValue = document.getElementById('adress').value;
    if (inputValue.length < 20 || inputValue.length > 60) {
      setData({ ...data, adress: '' });
      setInfoContent('Adress must has street, number of the building, apartment number, city and postcode!');
      infoDiv.classList.add('error');
      infoDiv.classList.remove('success');
    } else {
      setData({ ...data, adress: inputValue });
      setInfoContent('Adress has been updated!');
      updateData('adress', inputValue);
      setLoggedUser({ ...loggedUser, adress: data.adress });
    }
    setTimeout(() => {
      infoDiv.classList.remove('success');
      infoDiv.classList.remove('error');
    }, 2000);
  }

  const hashPassword = () => {
    let hash = '';
    for (let i = 0; i < loggedUser.password.length; i++) hash += '•';
    setHashedPassword(hash);
  }


  const updateData = (field, fieldValue) => {
    infoDiv.classList.remove('error');
    infoDiv.classList.add('success')
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
    hashPassword();
  }

  useEffect(() => {
    if (loggedUser.NIP !== undefined) setApiSystem('restaurants');
    else setApiSystem('customers');
    hashPassword();
  }, [loggedUser]);

  return (
    <section className="data-settings">
      <div className="show-settings show-settings--name">
        <span>Name: <strong>{loggedUser.name}</strong></span>
        <label htmlFor="name">New Name:</label>
        <input onChange={e => setData({ ...data, name: e.target.value })} id="name" type='text' name="name" placeholder="Set new name..." />
        <button onClick={handleChangeName}>Change</button>
      </div>
      {apiSystem === 'customers' ? <div className="show-settings show-settings--lastname">
        <span>Lastname: <strong>{loggedUser.lastname}</strong></span>
        <label htmlFor="lastname">New Lastname:</label>
        <input onChange={e => setData({ ...data, lastname: e.target.value })} id="lastname" type='text' name="lastname" placeholder="Set new name..." />
        <button onClick={handleChangeLastname}>Change</button>
      </div> :
        <div className="show-settings show-settings--mail">
          <span>Mail: <strong>{loggedUser.mail}</strong></span>
          <label htmlFor="mail">New Mail:</label>
          <input onChange={e => setData({ ...data, mail: e.target.value })} id="mail" type='text' name="mail" placeholder="Set new mail..." />
          <button onClick={handleChangeMail}>Change</button>
        </div>
      }
      {/* {loggedUser.password.length} */}
      <div className="show-settings show-settings--password">
        <span>Password: <strong>{hashedPassword}</strong></span>
        <label htmlFor="mail">New Password:</label>
        <input onChange={e => setData({ ...data, password: e.target.value })} id="password" type='password' name="password" placeholder="Set new mail..." />
        <button onClick={handleChangePassword}>Change</button>
      </div>
      <div className="show-settings show-settings--phone">
        <span>Phone: <strong>{loggedUser.phone}</strong></span>
        <label htmlFor="phone">New Phone:</label>
        <input onChange={e => setData({ ...data, phone: e.target.value })} id="phone" type='number' name="phone" placeholder="Set new phone..." />
        <button onClick={handleChangePhone}>Change</button>
      </div>
      <div className="show-settings show-settings--adress">
        <span>Adress: <strong>{loggedUser.adress}</strong></span>
        <label htmlFor="adress">New Adress:</label>
        <input onChange={e => setData({ ...data, adress: e.target.value })} id="adress" type='text' name="adress" placeholder="Set new adress..." />
        <button onClick={handleChangeAdress}>Change</button>
      </div>
      <div className="info">{infoContent}</div>
    </section>
  );
}
export default DataSettings;
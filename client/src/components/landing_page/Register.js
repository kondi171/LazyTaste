import { useContext, useEffect, useState } from 'react';
import photoCustomer from './../../assets/img/landing_images/alex-haney-CAhjZmVk5H4-unsplash.jpg';
import photoRestaurant from './../../assets/img/landing_images/louis-hansel-wVoP_Q2Bg_A-unsplash.jpg';

import { AppContext } from '../AppContext';
const Register = ({ name }) => {
  const { setMessageContent, setMessageType, setMessageVisible } = useContext(AppContext);

  const [data, setData] = useState({
    mail: '',
    password1: '',
    password2: '',
    name: '',
    lastname: '',
    phone: '',
    adress: '',
    NIP: '',
    type: 'Kebab',
  })
  const handleMail = e => {
    const inputValue = e.target.value;
    if ((inputValue.indexOf('@') === -1) || (inputValue.length < 6 || inputValue.length > 36)) {
      setData({ ...data, mail: '' });
      setMessageContent('Mail must be more than 6 characters and less than 36 characters and has a @ sign in it!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, mail: inputValue });
      setMessageContent('');
      setMessageVisible(false);
    }
  }
  const handlePassword1 = e => {
    const inputValue = e.target.value;
    if (inputValue.length < 6 || inputValue.length > 24) {
      setData({ ...data, password1: '' });
      setMessageContent('Password must be more than 6 characters and less than 24 characters!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, password1: inputValue });
      setMessageContent('');
      setMessageVisible(false);
    }
  }
  const handlePassword2 = e => {
    const inputValue = e.target.value;
    if (inputValue !== data.password1) {
      setData({ ...data, password2: '' });
      setMessageContent('Passwords must be equal!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, password2: inputValue });
      setMessageContent('');
      setMessageVisible(false);
    }
  }
  const handleName = e => {
    const inputValue = e.target.value;
    if (name === 'Customer') {
      if (inputValue.length < 3 || inputValue.length > 16) {
        setData({ ...data, name: '' });
        setMessageContent('First name must be more than 3 characters and less than 16 characters!');
        setMessageType('info');
        setMessageVisible(true);
      }
      else {
        setData({ ...data, name: inputValue });
        setMessageContent('');
        setMessageVisible(false);
      }
    } else {
      if (inputValue.length < 3 || inputValue.length > 36) {
        setData({ ...data, name: '' });
        setMessageContent('Restaurant name must be more than 3 characters and less than 36 characters!');
        setMessageType('info');
        setMessageVisible(true);
      }
      else {
        setData({ ...data, name: inputValue });
        setMessageContent('');
        setMessageVisible(false);
      }
    }

  }
  const handleLastname = e => {
    const inputValue = e.target.value;
    if (inputValue.length < 3 || inputValue.length > 24) {
      setData({ ...data, lastname: '' });
      setMessageContent('Lastname must be more than 3 characters and less than 24 characters!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, lastname: inputValue });
      setMessageContent('');
      setMessageVisible(false);
    }
  }
  const handlePhone = e => {
    const inputValue = e.target.value;
    if (inputValue.length !== 9) {
      setData({ ...data, phone: '' });
      setMessageContent('Phone must be equal 9 numbers!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, phone: inputValue });
      setMessageContent('');
      setMessageVisible(false);
    }
  }
  const handleAdress = e => {
    const inputValue = e.target.value;
    if (inputValue.length < 20 || inputValue.length > 60) {
      setData({ ...data, adress: '' });
      setMessageContent('Adress must has street, number of the building, apartment number, city and postcode!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, adress: inputValue });
      setMessageContent('');
      setMessageVisible(false);
    }
  }
  const handleNIP = e => {
    const inputValue = e.target.value;
    if (inputValue.length !== 10) {
      setData({ ...data, NIP: '' });
      setMessageContent('NIP must be equal 10!');
      setMessageType('info');
      setMessageVisible(true);
    }
    else {
      setData({ ...data, NIP: inputValue });
      setMessageContent('');
      setMessageVisible(true);
    }
  }
  const handleRestaurantType = e => {
    const inputValue = e.target.value;
    setData({ ...data, type: inputValue });
  }
  const handleRegister = () => {
    if (name === 'Customer') {
      if (data.mail && data.password2 && data.name && data.lastname && data.phone && data.adress) {
        setMessageContent('Your Customer account has been created! You can  sign in now!');
        setMessageType('success');
        setMessageVisible(true);
        const URL = 'http://localhost:4000/API/customers';
        const body = new URLSearchParams({
          mail: data.mail,
          password: data.password2,
          name: data.name,
          lastname: data.lastname,
          phone: data.phone,
          adress: data.adress,
        });
        fetch(URL, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'PUT',
          body: body
        })
          .then(res => res.text())
          .then(data => {
            if (data === 'The specified user already exists!') {
              setMessageContent(data);
              setMessageType('error');
              setMessageVisible(true);
            }
          })
          .catch(error => console.log(error));
      }
      else {
        setMessageContent('Check fields! There are invalid data!');
        setMessageType('error');
        setMessageVisible(true);
      }
    } else {
      if (data.mail && data.password2 && data.name && data.phone && data.adress && data.NIP) {
        setMessageContent('Your Restaurant account has been created! You can sign in now!');
        setMessageType('success');
        setMessageVisible(true);
        const URL = 'http://localhost:4000/API/restaurants';
        const body = new URLSearchParams({
          mail: data.mail,
          NIP: data.NIP,
          password: data.password2,
          name: data.name,
          phone: data.phone,
          adress: data.adress,
          type: data.type,
        });
        fetch(URL, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'PUT',
          body: body
        })
          .then(res => res.text())
          .then(data => {
            if (data === 'The specified user already exists!') {
              setMessageContent(data);
              setMessageType('error');
            }
          })
          .catch(error => console.log(error));
      } else {
        setMessageContent('Check fields! There are invalid data!');
        setMessageType('error');
        setMessageVisible(true);
      }
    }
  }

  useEffect(() => {
    if (name === 'Customer') document.querySelector('.access form').style.backgroundImage = `url('${photoCustomer}')`;
    else if (name === 'Restaurant') document.querySelector('.access form').style.backgroundImage = `url('${photoRestaurant}')`;
  }, [name]);
  return (
    <section className={`access access--register ${name === "Restaurant" ? 'restaurant' : ''}`}>
      <h3>Register as {name}</h3>
      <form className='register' action="">
        <div className="data">
          <div className="data__login">
            <label htmlFor='mail'>
              <i className='fa fa-envelope'></i> Mail
            </label>
            <input name="mail" onChange={handleMail} placeholder="Type your email..." type="mail" />
            <label htmlFor='password1'>
              <i className='fa fa-unlock'></i> Password
            </label>
            <input name="password1" onChange={handlePassword1} placeholder="Type your password..." type="password" />
            <label htmlFor='password2'>
              <i className='fa fa-unlock-alt'></i> Repeat password
            </label>
            <input name="password2" onChange={handlePassword2} placeholder="Repeat your password..." type="password" />
            {name === 'Restaurant' && <><label htmlFor='type'>
              <i className="fa fa-cutlery"></i> Restaurant Type
            </label>
              <select name="type" onChange={handleRestaurantType} type="text">
                <option value="Kebab">Kebab</option>
                <option value="Burgers">Burgers</option>
                <option value="Chinease">Chinease</option>
                <option value="Italian">Italian</option>
                <option value="Polish">Polish</option>
                <option value="Pizza">Pizza</option>
                <option value="Thai">Thai</option>
                <option value="Vege">Vege</option>
                <option value="Sushi">Sushi</option>
                <option value="Other">Other</option>
              </select>
            </>}
          </div>

          <div className="data__address">
            <label htmlFor='name'>
              <i className='fa fa-user-circle-o'></i> Name
            </label>
            <input name="name" onChange={handleName} placeholder="Type your name..." type="text" />
            {name === 'Restaurant' ? <><label htmlFor='nip'>
              <i className="fa fa-id-card-o"></i> NIP
            </label>
              <input name="nip" onChange={handleNIP} placeholder="Type your NIP..." type="text" /></> : <><label htmlFor='lastname'>
                <i className='fa fa-user-circle'></i> Lastname
              </label>
              <input name="lastname" onChange={handleLastname} placeholder="Type your lastname..." type="text" /></>}
            <label htmlFor='phone'>
              <i className='fa fa-phone'></i> Phone
            </label>
            <input name="phone" onChange={handlePhone} placeholder="Type your phone number..." type="number" />
            <label htmlFor='adress'>
              <i className='fa fa-home'></i>  Adress
            </label>
            <input name="adress" onChange={handleAdress} placeholder="Type your adress..." type="text" />
          </div>
        </div>
        <input onClick={handleRegister} value="Register" type="button" />
      </form>
    </section>
  );
}

export default Register;
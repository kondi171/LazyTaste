import { useContext, useEffect, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { AppContext } from '../AppContext';
import photoCustomer from './../../assets/img/alex-haney-CAhjZmVk5H4-unsplash.jpg';
import photoRestaurant from './../../assets/img/louis-hansel-wVoP_Q2Bg_A-unsplash.jpg';
import LoadingState from '../features/LoadingState';

const Login = ({ name }) => {
  const { setLoggedUser, setMessageVisible } = useContext(AppContext);
  const { setMessageContent, setMessageType } = useContext(AppContext);
  const [loginData, setLoginData] = useState({
    NIP: '',
    mail: '',
    password: ''
  });
  const [isLogged, setIsLogged] = useState(false);
  const [access, setAccess] = useState(false);
  const [system, setSystem] = useState('');

  const handleMail = e => {
    const mailValue = e.target.value;
    setLoginData({ ...loginData, mail: mailValue });
  }
  const handleNIP = e => {
    const NIPValue = e.target.value;
    setLoginData({ ...loginData, NIP: NIPValue });
  }
  const handlePassword = e => {
    const passwordValue = e.target.value;
    setLoginData({ ...loginData, password: passwordValue });
  }

  const handleLogin = (e) => {
    if (name === 'Customer') {
      e.preventDefault();
      const URL = 'http://localhost:4000/API/customers';
      const body = new URLSearchParams({
        mail: loginData.mail,
        password: loginData.password
      });
      fetch(URL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: body
      })
        .then(res => res.json())
        .then(data => {
          if (data.mail === undefined) {
            setMessageContent(data.message);
            setMessageType('error');
            setMessageVisible(true);
          }
          else {
            setMessageContent('Logged!');
            setLoggedUser(data);
            setIsLogged(true);
            setMessageType('success');
            setMessageVisible(true);
            setSystem('Customer');
          }
        })
        .catch(error => console.log(error));
    } else {
      e.preventDefault();
      const URL = 'http://localhost:4000/API/restaurants';
      const body = new URLSearchParams({
        NIP: loginData.NIP,
        password: loginData.password
      });
      fetch(URL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: body
      })
        .then(res => res.json())
        .then(data => {
          if (data.NIP === undefined) {
            setMessageContent(data.message);
            setMessageType('error');
            setMessageVisible(true);
          }
          else {
            setMessageContent('Logged!');
            setLoggedUser(data);
            setIsLogged(true);
            setMessageType('success');
            setMessageVisible(true);
            setSystem('Restaurant');
          }
        })
        .catch(error => console.log(error));
    }

  }

  useEffect(() => {
    let loadingTimeout;
    if (name === 'Customer') document.querySelector('.access form').style.backgroundImage = `url('${photoCustomer}')`;
    else if (name === 'Restaurant') document.querySelector('.access form').style.backgroundImage = `url('${photoRestaurant}')`;
    if (isLogged) {
      loadingTimeout = setTimeout(() => {
        setAccess(true);
      }, 1000);
    }
    return () => {
      clearTimeout(loadingTimeout);
    }
  }, [name, isLogged]);
  return (
    <section className={`access access--login ${name === "Restaurant" ? 'restaurant' : ''}`}>
      <h3>Log In as {name}</h3>
      <form className='login'>
        {name === 'Customer' ? <>
          <label htmlFor='mail'>
            <i className='fa fa-user'></i> Login
          </label>
          <input name="mail" onChange={handleMail} placeholder="Type your mail..." type="text" />
        </> : <><label htmlFor='nip'>
          <i className="fa fa-id-card-o"></i> NIP
        </label>
          <input name="nip" onChange={handleNIP} placeholder="Type your NIP..." type="text" /></>}

        <label htmlFor='password'>
          <i className='fa fa-unlock'></i> Password
        </label>
        <input name="password" onChange={handlePassword} placeholder="Type your password..." type="password" />
        <input value="Login" onClick={handleLogin} type="submit" />
      </form>
      {isLogged && <LoadingState />}
      {(access && system === 'Customer') && <Routes><Route path='/' exact element={<Navigate to='/customer/home' />} /></Routes>}
      {(access && system === 'Restaurant') && <Routes><Route path='/' exact element={<Navigate to='/restaurant/home' />} /></Routes>}
    </section >
  );
}

export default Login;
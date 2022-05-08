import { useEffect } from 'react';
import photoCustomer from './../../assets/img/alex-haney-CAhjZmVk5H4-unsplash.jpg';
import photoRestaurant from './../../assets/img/louis-hansel-wVoP_Q2Bg_A-unsplash.jpg';
const Login = ({ name }) => {
  useEffect(() => {
    if (name === 'Customer') document.querySelector('.access form').style.backgroundImage = `url('${photoCustomer}')`;
    else if (name === 'Restaurant') document.querySelector('.access form').style.backgroundImage = `url('${photoRestaurant}')`;
  });
  return (
    <section className="access access--login">
      <h3>Log In as {name}</h3>
      <form className='login' action="">
        {name === 'Customer' ? <>
          <label htmlFor='login'>
            <i className='fa fa-user'></i> Login
          </label>
          <input name="login" placeholder="Type your mail..." type="text" />
        </> : <><label htmlFor='nip'>
          <i className="fa fa-id-card-o"></i> NIP
        </label>
          <input name="nip" placeholder="Type your NIP..." type="text" /></>}

        <label htmlFor='password'>
          <i className='fa fa-unlock'></i> Password
        </label>
        <input name="password" placeholder="Type your password..." type="password" />
        <input value="Login" type="submit" />
      </form>
    </section >
  );
}

export default Login;
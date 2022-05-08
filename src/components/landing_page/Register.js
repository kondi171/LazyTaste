import { useEffect } from 'react';
import photoCustomer from './../../assets/img/alex-haney-CAhjZmVk5H4-unsplash.jpg';
import photoRestaurant from './../../assets/img/louis-hansel-wVoP_Q2Bg_A-unsplash.jpg';
const Register = ({ name }) => {
  useEffect(() => {
    if (name === 'Customer') document.querySelector('.access form').style.backgroundImage = `url('${photoCustomer}')`;
    else if (name === 'Restaurant') document.querySelector('.access form').style.backgroundImage = `url('${photoRestaurant}')`;
  });
  return (
    <section className="access access--register">
      <h3>Register as {name}</h3>
      <form className='register' action="">
        <div className="data">
          <div className="data__login">
            <label htmlFor='mail'>
              <i className='fa fa-envelope'></i> Mail
            </label>
            <input name="mail" placeholder="Type your email..." type="mail" />
            <label htmlFor='password1'>
              <i className='fa fa-unlock'></i> Password
            </label>
            <input name="password1" placeholder="Type your password..." type="password" />
            <label htmlFor='password2'>
              <i className='fa fa-unlock-alt'></i> Repeat password
            </label>
            <input name="password2" placeholder="Repeat your password..." type="password" />
            {name === 'Restaurant' ? <><label htmlFor='nip'>
              <i className="fa fa-id-card-o"></i> NIP
            </label>
              <input name="nip" placeholder="Type your NIP..." type="text" /></> : null}

          </div>

          <div className="data__address">
            <label htmlFor='name'>
              <i className='fa fa-user-circle-o'></i> Name
            </label>
            <input name="name" placeholder="Type your name..." type="text" />
            <label htmlFor='lastname'>
              <i className='fa fa-user-circle'></i> Lastname
            </label>
            <input name="lastname" placeholder="Type your lastname..." type="text" />
            <label htmlFor='phone'>
              <i className='fa fa-phone'></i> Phone
            </label>
            <input name="phone" placeholder="Type your phone number..." type="text" />
            <label htmlFor='adress'>
              <i className='fa fa-home'></i>  Adress
            </label>
            <input name="adress" placeholder="Type your adress..." type="text" />
          </div>
        </div>
        <input value="Register" type="submit" />
      </form>
    </section>
  );
}

export default Register;
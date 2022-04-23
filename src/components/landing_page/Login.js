const Login = (props) => {
  return (
    <section className="login-modal">
      <h3>Log In as {props.name}</h3>
      <form action="">
        <label htmlFor='login'>
          <i className='fa fa-user'></i> Login
        </label>
        <input name="login" placeholder="Type your login..." type="text" />
        <label htmlFor='password'>
          <i className='fa fa-key'></i> Password
        </label>
        <input name="password" placeholder="Type your password..." type="password" />
        <input value="Login" type="submit" />
      </form>
    </section>
  );
}

export default Login;
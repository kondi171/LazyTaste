import logo from '../../../assets/img/restaurant-logo.jpg';
const AvatarSettings = () => {
  return (
    <section className="avatar-settings">
      <img src={logo} alt="avatar" />
      <button>Change Avatar</button>
    </section>
  );
}
export default AvatarSettings;
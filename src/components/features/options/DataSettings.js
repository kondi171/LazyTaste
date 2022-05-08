const DataSettings = () => {
  return (
    <section className="data-settings">
      <div className="show-settings show-settings--name">
        <span>Name: <strong>Try it Kebab</strong></span>
        <label for="name">New Name:</label>
        <input type='text' name="name" placeholder="Set new name..." />
        <button>Change</button>
      </div>
      <div className="show-settings show-settings--mail">
        <span>Mail: <strong>tryitkebab@gmail.com</strong></span>
        <label for="mail">New mail:</label>
        <input type='text' name="mail" placeholder="Set new mail..." />
        <button>Change</button>
      </div>
      <div className="show-settings show-settings--phone">
        <span>Phone: <strong>+48 690 821 345</strong></span>
        <label for="phone">New Phone:</label>
        <input type='text' name="phone" placeholder="Set new phone..." />
        <button>Change</button>
      </div>
      <div className="show-settings show-settings--adress">
        <span>Adress: <strong>Warszawska 146A, 25-561 Kielce</strong></span>
        <label for="adress">New Adress:</label>
        <input type='text' name="adress" placeholder="Set new adress..." />
        <button>Change</button>
      </div>
    </section>
  );
}
export default DataSettings;
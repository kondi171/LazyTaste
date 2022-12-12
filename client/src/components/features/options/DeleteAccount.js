import { useContext } from "react";
import { AppContext } from "../../AppContext";

const DeleteAccount = () => {
  const { loggedUser } = useContext(AppContext);
  const handleDeleteAccount = () => {
    if (typeof loggedUser.NIP === "undefined") {
      const URL = process.env.REACT_APP_DB_CONNECT + `API/customers/${loggedUser._id}`;
      fetch(URL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'DELETE',
      })
        .then(res => res.status)
        .catch(error => console.log(error));

    } else {
      const URL = process.env.REACT_APP_DB_CONNECT + `API/restaurants/${loggedUser._id}`;
      fetch(URL, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'DELETE',
      })
        .then(res => res.status)
        .catch(error => console.log(error));

    }
  }
  return (
    <div className="delete-account">
      <h3>Are you sure, you want to delete your account?</h3>
      <h4>This operation can not be undone!</h4>
      <a href={`${process.env.REACT_APP_CLIENT}`} onClick={handleDeleteAccount}>Delete Account</a>
    </div>
  );
}
export default DeleteAccount;
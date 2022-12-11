import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
const AddSectionModal = ({ productItems }) => {
  const { loggedUser, isOpen, setIsOpen } = useContext(AppContext);
  const [sectionName, setSectionName] = useState('');

  const handleAdd = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
    const body = new URLSearchParams({
      id: loggedUser._id,
      sectionName: sectionName,
    });
    fetch(process.env.REACT_APP_DB_CONNECT + `API/restaurant/menu/add-section`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
      body: body
    });
  }

  return (
    <>
      <h3>Add Section:</h3>
      <div className="product">
        <form>
          <label htmlFor="name">Section Name</label>
          <input onChange={e => setSectionName(e.target.value)} type='text' name='name' placeholder='Type section name...' />
          <input onClick={e => handleAdd(e)} value="Add" type="button" />
        </form>
      </div>
    </>
  );
}
export default AddSectionModal;
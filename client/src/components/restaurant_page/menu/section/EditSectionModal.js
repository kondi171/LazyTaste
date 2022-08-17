import { useState, useContext } from "react";
import { AppContext } from "../../../AppContext";
const EditSectionModal = ({ sectionName, setSectionName }) => {
  const { sectionID, loggedUser, isOpen, setIsOpen } = useContext(AppContext);

  const [inputValue, setInputValue] = useState('');
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    e.preventDefault();
    setSectionName(inputValue);
    setIsOpen(!isOpen);
    const body = new URLSearchParams({
      id: loggedUser._id,
      sectionID: sectionID,
      value: inputValue,
    });
    fetch(`http://localhost:4000/API/restaurant/menu/edit-section`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'PATCH',
      body: body,
    })
      .then(res => res.status)
      .catch(error => console.log(error));
  }
  return (
    <>
      <h3>Edit {sectionName} Section</h3>
      <div className="product">
        <form>
          <label htmlFor="name">Section Name</label>
          <input onChange={e => handleChangeInputValue(e)} type="text" name='name' placeholder='Type new section name...' />
          <input onClick={e => handleChange(e)} value="Change" type="button" />
        </form>
      </div>
      <form>

      </form>
    </>
  );
}
export default EditSectionModal;
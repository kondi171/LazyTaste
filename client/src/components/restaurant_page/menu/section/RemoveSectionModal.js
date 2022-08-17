import { useState, useContext } from "react";
import { AppContext } from "../../../AppContext";
const RemoveSectionModal = ({ sectionName, setSectionName }) => {
  const { sectionID, loggedUser, isOpen, setIsOpen } = useContext(AppContext);

  const handleRemove = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
    const body = new URLSearchParams({
      id: loggedUser._id,
      sectionID: sectionID,
    });
    fetch(`http://localhost:4000/API/restaurant/menu/remove-section`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'DELETE',
      body: body,
    })
      .then(res => res.status)
      .catch(error => console.log(error));
  }
  return (
    <>
      <h3>Are you sure to remove?</h3>
      <div className="product">
        <div className="product__section">{sectionName} Section</div>
        <input onClick={handleRemove} value="Remove" type="button" />
      </div>
      <form>

      </form>
    </>
  );
}
export default RemoveSectionModal;
import { useState } from "react";

const ChangeSectionNameModal = ({ sectionName, setSectionValue }) => {

  const [inputValue, setInputValue] = useState('');
  const [changeInfo, setChangeInfo] = useState(false);
  const handleChangeInputValue = e => setInputValue(e.target.value);
  const handleChange = e => {
    e.preventDefault();
    setSectionValue(inputValue);
    setChangeInfo(true);
  }
  return (
    <>
      <h3>Change Section Name: {sectionName}</h3>
      <div className="product__to">to:</div>
      <form>
        <input onChange={e => handleChangeInputValue(e)} type='text' placeholder='Type new section name...' />
        <input onClick={e => handleChange(e)} value="Change" type="submit" />
      </form>
      <div className="return-info">{changeInfo ? 'Changed!' : ''}</div>
    </>
  );
}
export default ChangeSectionNameModal;
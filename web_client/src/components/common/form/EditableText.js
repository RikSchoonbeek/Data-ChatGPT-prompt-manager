import React, { useEffect, useState } from "react";

const EditableText = ({ name, value, onChange, onSave }) => {
  // Text displayed as normal text with an edit button. When the edit button is
  // clicked, the text is replaced with an input field and a save button. On save
  // the onChange function (prop) is called with the new value so that the parent
  // component can update its state, which is passed back down to this component
  // as the value prop. The input value is then also updated to match the new
  // value prop using the useEffect hook.
  const [inputValue, setInputValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(name, inputValue);
    onSave();
  };

  return (
    <div className="editable-text-container">
      {isEditing ? (
        <>
          <input type="text" value={inputValue} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <div className="text-div">{value}</div>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EditableText;

import "./OwnerForm";
import { useState } from "react";
import { useEffect } from "react";

const Tags = ({ placeHolder, isMulti, onChange }) => {
  const [menu, setMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

  useEffect(() => {
    const handler = () => setMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (e) => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option) => (
            <div key={option} className="dropdown-tag-item">
              {option}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              ></span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue;
  };
  const removeOption = (option) => {
    return selectedValue.filter((o) => o !== option);
  };
  const onTagRemove = (option) => {
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o === option) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o === option).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue === option;
  };

  const options = [
    "Black Owned",
    "Asian Owned",
    "Latinx Owned",
    "Native Owned",
    "Woman Owned",
    "LGBTQ+ Owned",
    "Veteran Owned",
    "Disabled Owned",
    "Family-Run",
  ];

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
      </div>
      {menu && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;

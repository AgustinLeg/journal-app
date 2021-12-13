import React, { useState } from "react";

const Dropdown = ({ selected, setSelected, options }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className={`dropdown-btn bg-${selected}`} onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map(({ icon, name }) => (
            <div
              className="dropdown-item"
              data-name={name}
              key={name}
              onClick={() => {
                setSelected(name);
                setIsActive(false);
              }}
            >
              <div className="title">
                <div className={`icon bg-${name}`}>
                  <i className={`fas ${icon}`}></i>
                </div>
                {name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

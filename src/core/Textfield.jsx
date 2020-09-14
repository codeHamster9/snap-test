import React from "react";
import PropTypes from "prop-types";

const Textfield = ({ placeholder = "Search", onChange, value }) => {
  return (
    <div className="flex items-center border-b border-teal-500 py-2">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        name="q"
        autoComplete="off"
      />
    </div>
  );
};

Textfield.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Textfield;

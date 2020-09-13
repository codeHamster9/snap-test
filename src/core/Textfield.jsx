import React from "react";
import PropTypes from "prop-types";

const Textfield = ({ placeholder = "Search", onChange, value }) => {
  return (
    <div className="relative text-gray-600 focus-within:text-gray-400 w-full pointer-events-auto">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <i className="fas fa-search"></i>
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="py-2 text-sm -md pl-10 focus:outline-none focus:bg-white w-full block shadow"
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

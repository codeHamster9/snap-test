import React, { useState } from "react";
import PropTypes from "prop-types";

const Textfield = ({ placeholder = "Search", onInput }) => {
  const [value, setValue] = useState("");
  const change = ({ target }) => {
    setValue(target.value);
    onInput(target.value);
  };

  return (
    <div className="flex items-center border-b border-teal-500 py-2">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={change}
        type="text"
        name="q"
        autoComplete="off"
      />
    </div>
  );
};

Textfield.propTypes = {
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Textfield;

import React from "react";
import PropTypes from "prop-types";

const CheckBox = ({ label, onChange, checked }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-teal-900"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

CheckBox.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool,
};

export default CheckBox;

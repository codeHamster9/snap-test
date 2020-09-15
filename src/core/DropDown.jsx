import React, { useState } from "react";

const DropDown = ({ items, onChange }) => {
  const [selected, setSelected] = useState();

  const change = (value = "") => {
    setSelected(value);
    onChange(value);
  };

  return (
    <>
      <button
        onClick={(e) => change(e.target.value)}
        className="text-gray-800 font-bold py-2 rounded inline-flex items-center focus:outline-none "
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <path
            style={{
              stroke: "gray",
              fill: "transparent",
              strokeLinecap: "round",
              strokeWidth: 5,
            }}
            d="M 10,10 L 30,30 M 30,10 L 10,30"
          />
        </svg>
      </button>
      <div className="inline-block relative w-64">
        <select
          onChange={(e) => change(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none"
          value={selected}
        >
          <option value="">{"Select..."}</option>
          {items.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );
};

DropDown.defaultProps = {
  items: [],
};

export default DropDown;

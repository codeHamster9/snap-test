import React from "react";
import NavBar from "../core/NavBar";

const page = ({ children }) => {
  return (
    <div>
      <NavBar title="Snappy" color="teal" />
      {children}
    </div>
  );
};

export default page;

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./styles/tailwind.output.css";
import { Routes } from "./routes";
import { Switch, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>{Routes}</Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/tailwind.output.css";
import { Routes } from "./routes";
import { Switch, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <React.Fragment>{Routes}</React.Fragment>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

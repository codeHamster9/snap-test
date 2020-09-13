import React from "react";
import { Route } from "react-router-dom";
import App from "../App";
import Products from "../views/Products";
import Product from "../views/Product";

export const Routes = [
  <Route exact path="/" component={App}></Route>,
  <Route exact path="/products" component={Products}></Route>,
  <Route exact path="/product/:id" component={Product}></Route>,
];

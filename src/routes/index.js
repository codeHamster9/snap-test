import React from "react";
import { Route } from "react-router-dom";
import Products from "../views/Products";
import Product from "../views/Product";

export const Routes = [
  <Route key="1" exact path="/" component={Products}></Route>,
  <Route key="2" exact path="/product/:id" component={Product}></Route>,
];

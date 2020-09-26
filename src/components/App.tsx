import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../routes/home";
import "./App.css";

export const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" children={<Home />} />
      </Switch>
    </Router>
  </div>
);

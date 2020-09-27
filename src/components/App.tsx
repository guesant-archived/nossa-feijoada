import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Editor } from "../routes/editor";
import { PlayGroud } from "../routes/playground";
import "./App.css";

export const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/editor" children={<Editor />} />
        <Route path="/" children={<PlayGroud />} />
      </Switch>
    </Router>
  </div>
);

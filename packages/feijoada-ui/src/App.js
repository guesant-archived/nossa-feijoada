import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import "./assets/styles/starter";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

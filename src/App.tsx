import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

import Activities from "./components/Activities";
import Values from "./components/Values";
import ValueInfo from "./components/ValueInfo";
import Home from "./components/Home";
import ActivityInfo from "./components/ActivityInfo";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/values">Values</Link>
            </li>
            <li>
              <Link to="/activities">Activities</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/values">
            <Values />
          </Route>
          <Route exact path="/values/:id/:name">
            <ValueInfo />
          </Route>
          <Route exact path="/activities">
            <Activities />
          </Route>
          <Route exact path="/activities/:id/:name">
            <ActivityInfo />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

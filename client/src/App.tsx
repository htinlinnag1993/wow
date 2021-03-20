import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {SideNavBar} from "./components/SideNavBar";
import {Dashboard} from "./components/Dashboard";
import css from "./app.module.css";

const App = () => (
  <>
    <Router>
      <SideNavBar>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </SideNavBar>
    </Router>
  </>
);

export {App};
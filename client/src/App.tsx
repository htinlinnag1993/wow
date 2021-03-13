import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Button from '@material-ui/core/Button';

const App = () => (
  <div>
    <h1>My React and TypeScript App! {new Date().toLocaleDateString()}</h1>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  </div>
);

export {App};
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import ListData from "./Components/ListData";
import ListDetails from "./Components/ListDetails";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <ListData className="bg-gray-100" />
          </Route>
          <Route exact path={["/details", "/details/:id"]}>
            <ListDetails />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

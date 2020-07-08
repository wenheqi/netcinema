import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Signup from "./components/pages/Signup";
import Movie from "./components/pages/Movie";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/login">
        {localStorage.getItem("nc-token") ? <App /> : <Login />}
      </Route>
      <Route exact path="/logout">
        {localStorage.getItem("nc-token") ? <Logout /> : <App />}
      </Route>
      <Route exact path="/signup">
        {localStorage.getItem("nc-token") ? <App /> : <Signup />}
      </Route>
      <Route exact path="/movie/:id">
        <Movie />
      </Route>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

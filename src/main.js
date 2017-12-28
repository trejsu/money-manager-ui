import ReactDOM from "react-dom";
import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import App from "./components/pages/App"
import EnsureLoggedInContainer from "./components/EnsureLoggedInContainer"
import Error from "./components/pages/error/NotFound";
import Expenses from "./components/sections/expenses/Expenses";
import Statistics from "./components/sections/statistics/Statistics";
import Budgets from "./components/sections/budgets/Budgets";
import Savings from "./components/sections/Savings";
import Settings from "./components/sections/Settings";
import Register from "./components/pages/Register";
import AdminPanel from "./components/pages/admin/AdminPanel";
import InternalServerError from "./components/pages/error/InternalServerError";
import Unauthenticated from "./components/pages/error/Unauthenticated";
import Unauthorized from "./components/pages/error/Unauthorized";

ReactDOM.render(
  <div>
    <Router history = {browserHistory}>
      <Route component = {EnsureLoggedInContainer}>
        <Route
          path = "/"
          component = {App} >
          <IndexRoute component = {Expenses} />
          <Route
            path = "/expenses"
            component = {Expenses} >
          </Route>
          <Route
            path = "/statistics"
            component = {Statistics} >
            <Route
              component = {Error} />
          </Route>
          <Route
            path = "/budgets"
            component = {Budgets} />
          <Route
            path = "/savings"
            component = {Savings} />
          <Route
            path = "/settings"
            component = {Settings} />
        </Route>
        <Route
          path = "/admin"
          component = {AdminPanel} />
      </Route>
      <Route
        path = "/register"
        component = {Register} />
      <Route
        path = "/server_error"
        component = {InternalServerError}/>
      <Route
        path = "/unauthenticated"
        component = {Unauthenticated}/>
      <Route
        path = "/unauthorized"
        component = {Unauthorized}/>
      <Route
        path = "*"
        component = {Error} />
    </Router>
  </div>,
  document.getElementById("app")
);
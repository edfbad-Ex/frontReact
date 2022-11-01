import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Register from "./components/js/Register";
import Login from "./components/js/Login";
import Logout from "./components/js/Logout";
import Reset from "./components/js/Reset";
import ResetConfirm from "./components/js/ResetConfirm";
import Dashboard from "./components/js/Dashboard";


function App() {

  const [token, setToken] = useState("");

  const userLogin = (tok) => {

    setToken(tok)

  }

  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/register"> 
            <Register />
          </Route>
          <Route path="/login"> 
            <Login userLogin={userLogin}/>
          </Route>
          <Route path="/logout">
            <Logout/>
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
          <Route path="/confirm">
            <ResetConfirm />
          </Route>
          <Route path="/">
            <Dashboard token={token} />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;

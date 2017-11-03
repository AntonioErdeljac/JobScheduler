import React, { Component } from 'react';
import Navbar from "./Navbar";
import Main from "./Main/index";
import Login from "./Login";
import {Switch, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
          </Switch>
      </div>
    );
  }
}

export default App;

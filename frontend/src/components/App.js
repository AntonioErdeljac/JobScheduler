import React, { Component } from 'react';
import Navbar from "./Navbar";
import Main from "./Main/index";
import Register from "./Register";
import Login from "./Login";
import Editor from "./Editor";
import CompletedJobs from "./Main/CompletedJobs";
import ScheduledJobs from "./Main/ScheduledJobs";
import MyJobs from "./Main/MyJobs";
import {connect} from "react-redux";
import {Switch, Route, withRouter} from "react-router-dom";
import agent from "../agent";

//u componenti se nalazi Switch te Rute koje se pale ovisno o linku

class App extends Component {
  componentWillReceiveProps(nextProps){
      if(nextProps.redirectTo){
          this.props.history.push(nextProps.redirectTo);
          this.props.onRedirect()
      }
  }

  componentWillMount(){
      const token = window.localStorage.getItem('jwt');
      if(token){
          console.log('IMA TOKEN');
          agent.setToken(token); // ovdje takodjer spremamo token posto se ne spremi u agent propertiima nakon refresha
      }
      this.props.onLoad(token ? agent.Auth.current() : null, token); //saljemo info dali je loginiran odnosno dali je spremljen token ili nije
  }

  render() {
    return (
      <div className="App">
          <Navbar currentUser={this.props.currentUser}/>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/completed" component={CompletedJobs} />
            <Route path="/scheduled" component={ScheduledJobs} />
            <Route path="/myjobs" component={MyJobs} />
            <Route path="/editor" component={Editor} />
          </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({type: 'REDIRECT'}),
    onLoad: (payload, token) =>
        dispatch({type: 'INITIAL_LOAD', payload, token})
});

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import Loading from "@components/shared/Loading";
import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "@components/auth/Login";
import Register from "@components/auth/Register";
import { Redirect, Route, Switch } from "react-router";
import ForgotPassword from "@components/auth/ForgotPassword";
import { auth } from "@config/firebaseconfig";
import Home from "@components/core/Home";
import Header from "@components/core/Header";
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
    this.route = null;
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.route = this.authenticated;
        this.setState({ loading: false });
      } else {
        this.route = this.notAuthenticated;
        this.setState({ loading: false });
      }
    });
  }

  authenticated = (
    <div className="">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </div>
  );

  notAuthenticated = (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgotpassword" exact component={ForgotPassword} />
      <Redirect to="/login" />
    </Switch>
  );

  render() {
    if (this.state.loading) return <Loading />;
    return this.route;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import Loading from "@components/shared/Loading";
import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "@components/auth/Login";
import Register from "@components/auth/Register";
import { Redirect, Route, Switch } from "react-router";
import ForgotPassword from "@components/auth/ForgotPassword";
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

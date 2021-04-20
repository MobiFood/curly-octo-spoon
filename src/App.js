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
import Cart from "@components/core/Cart";
import Orders from "@components/core/Orders";
import SearchResults from "@components/core/SearchResults";
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
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="d-flex justify-content-center align-items-center flex-grow-1 h-100">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/orders" exact component={Orders} />
          <Route
            path="/search-results/:restaurant/:foodItem"
            component={SearchResults}
          />

          {/* <Redirect to="/" /> */}
        </Switch>
      </div>
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

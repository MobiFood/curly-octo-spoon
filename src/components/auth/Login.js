import React, { Component } from "react";
import LoginImage from "@assets/images/Login.webp";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { auth } from "@config/firebaseconfig";
import Loading from "@components/shared/Loading";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    console.log("hey");
    this.setState({ loading: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true }, () => {
      NotificationManager.info("Checking your info");
      auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(({ user }) => {
          NotificationManager.success(`Welcome ${user.email}`);
        })
        .catch((er) => {
          NotificationManager.error(er.message);
          this.setState({ loading: false });
        });
    });
  };

  render() {
    if (this.state.loading) return <Loading />;
    // return "Hey";
    return (
      <div id="Login">
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <div
            className="w-100"
            style={{
              position: "absolute",
              zIndex: 0,
              height: "100vh",
              background: `url(${LoginImage})`,
              backgroundColor: `#000000ff`,
              backgroundSize: `cover`,
              //   opacity: `.8`,
            }}
          />
          <div
            className="card shadow animate__fadeIn animate__animated"
            style={{
              backdropFilter: `blur(10px)`,
              background: `rgba(255,255,255,.7)`,
              borderRadius: `1rem`,
              minWidth: `40vw`,
              minHeight: `60vh`,
              border: `none`,
              overflow: `hidden`,
            }}
          >
            <div className="card-header border-0">
              <div
                className="card-title text-center p-0 m-0"
                style={{
                  fontFamily: `'Kiwi Maru', serif`,
                  fontSize: `2rem`,
                  fontWeight: `600`,
                }}
              >
                Login
              </div>
            </div>
            <div className="card-body">
              <form
                onSubmit={this.handleSubmit}
                autoComplete="off"
                className=" p-3"
              >
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group text-center pt-3">
                  <button className="btn btn-success">Login</button>
                </div>
                <div className="form-group text-center p-1">
                  <Link to="/register">Don't have an account?</Link>
                </div>
                <div className="form-group text-center p-1">
                  <Link to="/forgotpassword">Forgot your password?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

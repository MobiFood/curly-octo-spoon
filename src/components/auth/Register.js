import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterImage from "@assets/images/Register.png";
import { Link } from "react-router-dom";
import { auth } from "@config/firebaseconfig";
import { NotificationManager } from "react-notifications";
import Loading from "@components/shared/Loading";
import voca from "voca";
import $ from "jquery";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      email: "",
      password: "",
    };
  }

  validatePassword = (password) =>
    password.match(/[a-z]/g) &&
    password.match(/[A-Z]/g) &&
    password.match(/[0-9]/g) &&
    password.match(/[^a-zA-Z\d]/g) &&
    password.length >= 6 &&
    password.length <= 20;
  handleChange = (ev) => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value }, () => {
      if (ev.target.name === "password") {
        if (!voca.isEmpty(ev.target.value)) {
          if (this.validatePassword(ev.target.value)) {
            $("#password").addClass("is-valid");
            $("#password").removeClass("is-invalid");
            $("#password_help_text").fadeOut();
          } else {
            $("#password").removeClass("is-valid");
            $("#password").addClass("is-invalid");
            $("#confirm_password").removeClass("is-valid");
            $("#confirm_password").removeClass("is-invalid");
            $("#password_help_text").fadeIn();
          }
        } else {
          $("#password").removeClass("is-valid");
          $("#password").removeClass("is-invalid");
          $("#confirm_password").removeClass("is-valid");
          $("#confirm_password").removeClass("is-invalid");
          $("#password_help_text").fadeOut();
        }
      } else if (ev.target.name === "confirm_password") {
        if (this.validatePassword(this.state.password)) {
          if (this.state.password === this.state.confirm_password) {
            $("#confirm_password").addClass("is-valid");
            $("#confirm_password").removeClass("is-invalid");
          } else {
            $("#confirm_password").removeClass("is-valid");
            $("#confirm_password").addClass("is-invalid");
          }
        } else {
          $("#password").removeClass("is-valid");
          $("#password").addClass("is-invalid");
          $("#confirm_password").removeClass("is-valid");
          $("#confirm_password").removeClass("is-invalid");
          $("#password_help_text").fadeIn();
        }
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validatePassword(this.state.password))
      this.setState({ loading: true }, () => {
        NotificationManager.info("Creating your account", "Please wait...");
        auth
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(({ user }) => {
            NotificationManager.success("Account created", "Yaay!");
          })
          .catch((er) => {
            NotificationManager.error(er.message);
            this.setState({ loading: false });
          });
      });
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div id="Register">
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <div
            className="w-100"
            style={{
              position: "absolute",
              zIndex: 0,
              height: "100vh",
              background: `url(${RegisterImage})`,
              backgroundColor: `#000000ff`,
              backgroundSize: `cover`,
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
              overflow: `auto`,
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
                Register
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

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <small
                    id="password_help_text"
                    className="text-danger form-text"
                    style={{ display: "none" }}
                  >
                    Password should be of length 6-20 and should contain one
                    capital and one numeric character and any symbol
                  </small>
                </div>
                {/* Confirm password */}
                <div className="form-group">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    onChange={this.handleChange}
                    disabled={
                      voca.isEmpty(this.state.password) ||
                      !this.validatePassword(this.state.password)
                    }
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="form-control"
                  />
                </div>
                <div className="form-group text-center pt-3">
                  <button
                    disabled={
                      voca.isEmpty(this.state.email) ||
                      voca.isEmpty(this.state.password) ||
                      voca.isEmpty(this.state.confirm_password)
                    }
                    className="btn btn-success"
                  >
                    Register
                  </button>
                </div>
                <div className="form-group text-center p-1">
                  <Link to="/login">Already have an account?</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);

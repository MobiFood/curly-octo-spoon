import { auth } from "@config/firebaseconfig";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "@assets/images/m.png";

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-white navbar-expand-lg shadow-sm">
        <div
          className="navbar-brand p-0 m-0"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        >
          {/* <h1>MobiFood</h1> */}
          <img src={Logo} alt="MobiFood" className="img-responsive w-100" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#headerNav"
          aria-controls="headerNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="headerNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                to="/"
                className="nav-link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                to="/profile"
                className="nav-link"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                to="/cart"
                className="nav-link"
              >
                Cart
              </NavLink>
            </li>
            <li
              role="button"
              className="nav-item"
              onClick={() => auth.signOut()}
            >
              <div className="nav-link text-danger">Sign out</div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

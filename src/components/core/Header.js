import { auth } from "@config/firebaseconfig";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "@assets/images/logo.png";
import { Link } from "react-router-dom";
export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg- navbar-expand-lg shadow-">
        <div
          className="navbar-brand p-0 m-0"
          style={{
            width: "3.5rem",
            // height: "3.5rem",
          }}
        >
          {/* <h1>MobiFood</h1> */}
          <Link to="/">
            <img src={Logo} alt="MobiFood" className="img-responsive w-100" />
          </Link>
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
          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                to="/cart"
                className="nav-link"
                style={{
                  fontSize: "2.4rem",
                  marginRight: "1rem",
                }}
              >
                {/* Cart */}
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </NavLink>
            </li>
            <li className="dropdown nav-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl91qGLzsCnDK_EiGACYohJ0bSsxI_eDZQ8g&usqp=CAU"
                alt="User profile"
                className="img-responsive rounded-circle data-toggler"
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
                data-toggle="dropdown"
                role="button"
              />
              <div className="dropdown-menu dropdown-menu-right">
                <div
                  className="dropdown-item"
                  role="button"
                  onClick={() => auth.signOut()}
                >
                  Sign out
                </div>
              </div>
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

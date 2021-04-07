import React, { Component } from "react";
import { connect } from "react-redux";
import BackgroundImage from "@assets/images/home.webp";

export class Home extends Component {
  render() {
    return (
      <div>
        <div
          className="w-100"
          style={{
            position: `absolute`,
            height: `100vh`,
            zIndex: -1,
            top: 0,
            left: 0,
            background: `url(${BackgroundImage})`,
            backgroundPosition: `center`,
            backgroundSize: `contain`,
            backgroundRepeat: "no-repeat",
            // filter: "blur(1px)",
            // backgroundColor: "#000000bb",
          }}
        />
        <p>Home</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

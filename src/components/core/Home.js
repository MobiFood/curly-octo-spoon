import React, { Component } from "react";
import { connect } from "react-redux";
import BackgroundImage from "@assets/images/home.webp";
import $ from "jquery";
import { db } from "@config/firebaseconfig";
import Loading from "@components/shared/Loading";
import { NotificationManager } from "react-notifications";
import { Route } from "react-router-dom";
import Featured from "./Featured";
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showDropdown: false,
      query: "",
      restaurants: [],
    };
  }
  componentDidMount() {
    db.collection("restaurants")
      .get()
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => doc.data());
        data = data.map((restaurant) => [
          restaurant.name.toUpperCase(),
          ...restaurant.menu.map((i) => i.itemName.toUpperCase()),
        ]);
        this.setState({
          showDropdown: false,
          restaurants: data,
          loading: false,
        });
      });
  }
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div className="flex-grow-1 h-100">
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
            filter: "blur(10px)",
            // backgroundColor: "#000000bb",
          }}
        />

        <div className="h-100 d-flex flex-column justify-content-around bg-">
          <div class="form-group w-75 mx-auto">
            <input
              autofocus
              autoComplete="off"
              type="text"
              class="form-control"
              name="search"
              id="search"
              placeholder="Search"
              value={this.state.query}
              onChange={(event) => this.setState({ query: event.target.value })}
              onFocus={() =>
                this.setState({ showDropdown: true }, () =>
                  $("#dropdownContainerList").slideDown()
                )
              }
              onBlur={() =>
                setTimeout(
                  () =>
                    this.setState({ showDropdown: false, query: "" }, () =>
                      $("#dropdownContainerList").slideUp()
                    ),
                  400
                )
              }
            />
            <div
              id="dropdownContainerList"
              className=""
              style={{
                height: "20vh",
                overflowY: "auto",
              }}
            >
              {this.state.showDropdown &&
                this.state.restaurants
                  .map((restaurant) =>
                    restaurant.filter((ki) =>
                      ki.includes(this.state.query.toUpperCase())
                    )
                  )
                  .map((j, indexJ) =>
                    j.map((i, indexI) => (
                      <div
                        key={`${
                          (indexJ + 1) * (indexI + 1) + indexI
                        }-menu-item`}
                        className="list-group- rounded-0 dropdown-item"
                        role="button"
                        onClick={() => {
                          this.props.history.push(
                            `/search-results/${j[0]}/${i}`
                          );
                        }}
                      >
                        <span>{i}</span>
                      </div>
                    ))
                  )}
            </div>
          </div>
          <div
            className="w-100 d-flex align-items-end mb-5 justify-content-around"
            id="featuredFood"
          >
            <Route component={Featured} />
            <Route component={Featured} />
            <Route component={Featured} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from "react";
import { connect } from "react-redux";
import BackgroundImage from "@assets/images/home.webp";
import $ from "jquery";
import { db } from "@config/firebaseconfig";
import Loading from "@components/shared/Loading";
import { NotificationManager } from "react-notifications";
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
    // $("#dropdownContainerList").slideUp();
    db.collection("restaurants")
      .get()
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => doc.data());
        data = data.map((restaurant) => [
          restaurant.name.toUpperCase(),
          ...restaurant.menu.map((i) => i.itemName.toUpperCase()),
        ]);
        this.setState({
          showDropdown: true,
          restaurants: data,
          loading: false,
        });
      });
  }
  render() {
    if (this.state.loading) return <Loading />;
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
            filter: "blur(10px)",
            // backgroundColor: "#000000bb",
          }}
        />

        <div className="container mt-2 flex-grow">
          <div class="form-group">
            <input
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
              className="list-group list-group-flushed"
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
                        className="list-group-item dropdown-item"
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
          <div className="bg-">
            <div className="card text-white bg-primary h-100">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150"
                alt="FoodItem"
                style={{ width: "" }}
              />
              <div className="card-body">
                <h4 className="card-title">Paneer Makhanwala</h4>
                <p className="card-text">Tasty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

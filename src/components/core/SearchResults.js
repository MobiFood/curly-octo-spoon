import React, { Component } from "react";
// import { db } from "@config/firebaseconfig";

export class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      query: "",
      restaurantName: this.props.match.params.restaurant || "",
      foodItem: this.props.match.params.foodItem || "",
    };
  }

  componentDidMount() {
    if (this.state.restaurantName !== this.state.foodItem) {
      // foodItem in a restaurant
    } else {
      // restaurant
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.restaurant}</p>
        <p>{this.state.foodItem}</p>
        <div className="container mt-2 flex-grow-1">
          <div className="row flex-row mx-auto" style={{ overflowX: "hidden" }}>
            <div className="card text-white mx-1 bg-primary h-100">
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

export default SearchResults;

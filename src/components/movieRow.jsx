import React, { Component } from "react";

class MovieRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "block"
    };
  }
  state = {};
  render() {
    return (
      <tr style={{ display: this.state.display }}>
        <td>{this.props.title}</td>
        <td>{this.props.genre}</td>
        <td>{this.props.numberInStock}</td>
        <td>{this.props.dailyRentalRate}</td>
        <td>
          <button onClick={this.deleteButton.bind(this)}>Delete</button>
        </td>
      </tr>
    );
  }

  deleteButton() {
    this.setState({ display: "none" });
  }
}

export default MovieRow;

import React, { Component } from "react";

class FavoriteItem extends Component {
  state = {
    isLiked: false,
    movieId: this.props.movieId
  };

  doLiked = () => {
    this.setState({ isLiked: this.state.isLiked ? false : true });
  };

  whichComponent() {
    let heartClass = "fa fa-heart";
    heartClass += this.state.isLiked ? "" : "-o";
    return (
      <i onClick={this.doLiked} className={heartClass} aria-hidden="true"></i>
    );
  }

  render() {
    return this.whichComponent();
  }
}

export default FavoriteItem;

import React, { Component } from "react";

class FavoriteItem extends Component {
  state = {
    isLiked: false,
    movieId: this.props.movieId
  };

  whichComponent() {
    let heartClass = "fa fa-heart";
    heartClass += this.props.movie.favorited ? "" : "-o";
    return (
      <i
        onClick={() => this.props.handleFavorite(this.props.movie)}
        className={heartClass}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }

  render() {
    return this.whichComponent();
  }
}

export default FavoriteItem;

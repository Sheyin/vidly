import React from "react";

const FavoriteItem = props => {
  let heartClass = "fa fa-heart";
  heartClass += props.movie.favorited ? "" : "-o";

  return (
    <i
      onClick={() => props.handleFavorite(props.movie)}
      className={heartClass}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default FavoriteItem;

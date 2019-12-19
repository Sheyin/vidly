import React from "react";
import FavoriteItem from "../common/favoriteItem";
import PropTypes from "prop-types";

const MovieTable = props => {
  const { movies } = props;

  const movieRow = movie => {
    const { _id, title, numberInStock, dailyRentalRate } = movie;
    const genre = movie.genre.name;
    return (
      <tr key={_id}>
        <td>{title}</td>
        <td>{genre}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <FavoriteItem key={_id} movie={movie} handleFavorite={doFavorite} />
        </td>
        <td>
          <button
            onClick={() => props.doDeleteButton(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  const doFavorite = movie => {
    const index = movies.indexOf(movie);
    let newMovies = [...movies];
    newMovies[index].favorited = !newMovies[index].favorited;
    this.setState({ movies: newMovies });
  };

  return (
    <React.Fragment>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{movies.map(movie => movieRow(movie))}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

MovieTable.propTypes = {
  movies: PropTypes.array.isRequired,
  doUpdateMovies: PropTypes.func.isRequired,
  doDeleteButton: PropTypes.func.isRequired
};

export default MovieTable;

import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class MovieTable extends Component {
  state = {
    movies: getMovies(),
    movieCount: getMovies().length
  };

  deleteButton = movie => {
    let newMovies = this.state.movies.filter(x => x._id != movie._id);
    this.setState({ movies: newMovies, movieCount: this.state.movieCount - 1 });
  };

  resetMovies = () => {
    this.setState({ movies: getMovies(), movieCount: getMovies().length });
  };

  render() {
    return (
      <div>
        <span>{this.movieCountSummary()}</span>
        {this.movieTable()}
      </div>
    );
  }

  movieCountSummary() {
    if (this.state.movieCount === 0) {
      return (
        <div>
          There are no movies in the database.{" "}
          <button
            onClick={() => this.resetMovies()}
            className="btn btn-info btn-sm"
          >
            Start over?
          </button>
        </div>
      );
    } else {
      return `Showing ${this.state.movieCount} movies in the database.`;
    }
  }

  movieTable() {
    if (this.state.movieCount === 0) {
      return;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.movies.map(movie => this.movieRow(movie))}</tbody>
        </table>
      );
    }
  }

  movieRow(movie) {
    const { _id, title, numberInStock, dailyRentalRate } = movie;
    const genre = movie.genre.name;

    return (
      <tr key={_id}>
        <td>{title}</td>
        <td>{genre}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.deleteButton(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default MovieTable;

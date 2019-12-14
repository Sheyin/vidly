import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import FavoriteItem from "./favoriteItem";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class MovieTable extends Component {
  state = {
    movies: getMovies(),
    movieCount: getMovies().length,
    pageSize: 4,
    currentPage: 1
  };

  constructor() {
    super();
    let newMovies = getMovies().map(movie => {
      if (!movie.hasOwnProperty("favorited")) {
        movie.favorited = false;
      }
      return movie;
    });
    this.state.movies = newMovies;
    this.state.movieCount = newMovies.length;
  }

  deleteButton = movie => {
    let newMovies = this.state.movies.filter(x => x._id !== movie._id);
    this.setState({ movies: newMovies, movieCount: this.state.movieCount - 1 });
  };

  resetMovies = () => {
    this.setState({ movies: getMovies(), movieCount: getMovies().length });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div>
        <span>{this.movieCountSummary()}</span>
        {this.movieTable(movies)}
        <Pagination
          itemCount={this.state.movieCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
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

  movieTable(movies) {
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
              <th></th>
            </tr>
          </thead>
          <tbody>{movies.map(movie => this.movieRow(movie))}</tbody>
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
          <FavoriteItem
            key={_id}
            movie={movie}
            handleFavorite={this.doFavorite}
          />
        </td>
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

  doFavorite = movie => {
    const index = this.state.movies.indexOf(movie);
    let newMovies = [...this.state.movies];
    newMovies[index].favorited = !newMovies[index].favorited;
    this.setState({ movies: newMovies });
  };
}

export default MovieTable;

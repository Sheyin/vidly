import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import FavoriteItem from "./favoriteItem";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";

class MovieTable extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    activeGenre: "All Genres"
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
  }

  deleteButton = movie => {
    let newMovies = this.state.movies.filter(x => x._id !== movie._id);
    this.setState({ movies: newMovies });
  };

  resetMovies = () => {
    this.setState({ movies: getMovies() });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelection = genre => {
    this.setState({ activeGenre: genre });
    // filter displayed list accordingly
    if (genre === "All Genres") {
      this.setState({ movies: getMovies(), currentPage: 1 });
    } else {
      this.setState({
        movies: getMovies().filter(movie => movie.genre.name === genre),
        currentPage: 1
      });
    }
  };

  getGenreNames() {
    let genres = ["All Genres"];
    getGenres().map(genre => {
      genres.push(genre.name);
    });
    return genres;
  }

  render() {
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    const genres = this.getGenreNames();
    //const genres = ["Romance", "Horror", "Anime"];
    //console.log(genres);
    //console.log(this.state.activeGenre);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            listItems={genres}
            activeItem={this.state.activeGenre}
            onListSelection={this.handleGenreSelection}
          />
        </div>
        <div className="col">
          <span>{this.movieCountSummary()}</span>
          {this.movieTable(movies)}
          <Pagination
            itemCount={this.state.movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  movieCountSummary() {
    if (this.state.movies.length === 0) {
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
      return `Showing ${this.state.movies.length} movies in the database.`;
    }
  }

  movieTable(movies) {
    if (this.state.movies.length === 0) {
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

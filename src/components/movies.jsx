import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import MovieTable from "./movieTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    activeGenre: "All Genres"
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  deleteButton = movie => {
    let newMovies = this.state.movies.filter(x => x._id !== movie._id);
    this.setState({ movies: newMovies });
    return;
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

  // This is throwing warnings because it expectd something to be returned by the arrow function
  getGenreNames() {
    let genres = ["All Genres"];
    getGenres().map(genre => {
      genres.push(genre.name);
    });
    return genres;
  }

  // generic function that updates the movies list (state)
  updateMovies = newMovies => {
    this.setState({ movies: newMovies });
  };

  handleSort = path => {
    console.log("test from handleSort!");
    console.log(path);
  };

  movieList = movies => {
    if (this.state.movies.length === 0) {
      return <div>There are no movies in the database.</div>;
    } else {
      return (
        <div>
          <span>
            Showing {this.state.movies.length} movies in the database.
          </span>
          <MovieTable
            movies={movies}
            doUpdateMovies={this.updateMovies}
            doDeleteButton={this.deleteButton}
            onSort={this.handleSort}
          />
        </div>
      );
    }
  };

  handleSort = () => {};

  render() {
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    const genres = this.getGenreNames();

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
          <span>
            Showing {this.state.movies.length} movies in the database.
          </span>
          <MovieTable
            movies={movies}
            doUpdateMovies={this.updateMovies}
            doDeleteButton={this.deleteButton}
            onSort={this.handleSort}
          />

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
}

export default Movies;

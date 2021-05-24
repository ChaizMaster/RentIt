import React, { Component } from "react";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery:"",
    selectedGenre:null,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount(){
  const genres=[{_id:"",name:"All Genres"},...getGenres()] //make call to db and fill in values
    this.setState({movies: , genres: genres})
  }
    handleDelete = (movie) => {
      const movies = this.state.movies.filter((m) => m._id !== movie._id);
      this.setState({movies});
    };
  handleLike = (movie) => {
   const movies=[...this.state.movies];
  const index=movies.indexOf(movie);
  movies[index]={...movies[index]};
  movies[index].liked=!movies[index].liked;
  this.setState({movies});
  };
  handlePageChange=page=>{
  this.setState({currentPage:page});
  }
  handleGenreSelect=genre=>{
  this.setState({selectedGenre:genre, searchQuery:"",currentPage:1});
  
  };
  handleSort=(sortColumn)=>{
  this.setState({sortColumn});
  
  }
  handleSearch=(query)=>{
    this.setState({searchQuery:query,selectedGenre:null,currentPage:1});
  }
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      searchQuery,
      sortColumn,
    } = this.state;
    let filtered =allMovies;
    if(searchQuery)
    filtered=allMovies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if(selectedGenre && selectedGenre._id)
    filtered=allMovies.filter(m=>m.genre._id===selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
      const {length:count}=this.state.movies;
    const {pageSize,currentPage,sortColumn}=this.state;
      if(count===0)
      return<p>There are no movies available in the database</p>
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
          />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/>
        </div>
      </div>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

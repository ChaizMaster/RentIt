import React, { Component } from "react";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";

export default class Movies extends Component {
  state = {
    //movies:[],
    //genres:[],
    //currentPage:1,
    //pageSize:4
  };
  // componentDidMount(){
  //const genres=[{name:"All Genres"},...getGenres()] //make call to db and fill in values
  //   this.setState({movies: , genres: genres})
  // }
  //   handleDelete = (movie) => {
  //     const movies = this.state.movies.filter((m) => m._id !== movie._id);
  //     this.setState({movies});
  //   };
  //handleLike = (movie) => {
  //  const movies=[...this.state.movies];
  //const index=movies.indexOf(movie);
  //movies[index]={...movies[index]};
  //movies[index].liked=!movies[index].liked;
  //this.setState({movies});
  // };
  //handlePageChange=page=>{
  // this.setState({currentPage:page});
  //}
  // handleGenreSelect=genre=>{
  //this.setState({selectedGenre:genre,currentPage:1});
  //
  // };
  render() {
    //   const {lenght:count}=this.state.movies;
    // const {pageSize,currentPage,selectedGenre,movies:allMovies}=this.state;
    //   if(count===0)
    //   return<p>There are no movies available in the database</p>
    //const filtered=selectedGenre && selectedGenre._id ? allMovies.filter(m=> m.genre._id===selectedGenre._id): allMovies;
    //const movies=paginate(filtered,currentPage,pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {/* <p>Showing {filtered.length} movies in the database</p> */}
          <table className="table">
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
            <tbody>
              {/* {//{movies.map(movie=>} */}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {/* <Like liked={true} onClick={() => this.handleLike(movie)} /> */}
                  {/* movie.liked */}
                </td>
                <td>
                  <button
                    // itemsCount={filtered.length}
                    onClick={() => this.handleDelete()} //pass the movie obj in handleDelete
                    selectedItem={this.state.selectedGenre}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {/* {))}} */}
            </tbody>
          </table>
          {/* <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/> */}
        </div>
      </div>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

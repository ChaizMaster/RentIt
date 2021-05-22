import React, { Component } from "react";

export default class Movies extends Component {
  state = {};
  //   handleDelete = (movie) => {
  //     const movies = this.state.movies.filter((m) => m._id !== movie._id);
  //     this.setState({movies});
  //   };

  render() {
    //   const {lenght:count}=this.state.movies;
    //   if(count===0)
    //   return<p>There are no movies available in the database</p>
    return (
      //<React.Fragment>
      //<p>Showing {count} movies in the database</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {//{this.state.movies.map(movie=>} */}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button
                onClick={() => this.handleDelete()} //pass the movie obj in handleDelete
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
          {/* {))}} */}
        </tbody>
      </table>
      //<React.Fragment/>
    );
  }
}

import Like from "./common/Like";
import React, { Component } from "react";
import Table from "./common/Table";
export default class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: {
        /* movie=><Like liked={true} onClick={() => this.props.onLike(movie)} /> */
      },
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          // itemsCount={filtered.length}
          onClick={() => this.props.onDelete()} //pass the movie obj in handleDelete
          selectedItem={this.state.selectedGenre}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

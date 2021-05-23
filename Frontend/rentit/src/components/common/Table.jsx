import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function Table(props) {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

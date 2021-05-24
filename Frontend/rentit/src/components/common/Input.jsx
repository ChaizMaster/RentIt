import React from "react";

export default function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        autoFocus
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        ref={this.username}
        id={props.name}
        type="text"
        className="form-control"
      />
    </div>
  );
}

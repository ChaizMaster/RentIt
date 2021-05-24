import React, { Component } from "react";
import Input from "./Input";
export default class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };
  username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  handleSubmit = (e) => {
    e.preventDefault();
    //Call the server
    const username = this.username.current.value;
  };
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

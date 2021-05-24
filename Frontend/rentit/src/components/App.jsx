import "../App.css";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./Movies";
import NotFound from "./NotFound";
import Customers from "./Customers";
import Rentals from "./Rentals";
import NavBar from "./NavBar";
import MovieForm from "./MovieForm";
import LoginForm from "./common/LoginForm";
import RegisterForm from "./common/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;

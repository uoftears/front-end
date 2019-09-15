import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        UofTears
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/course" activeClassName="active">
              Course
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/item2" activeClassName="active">
              item 2
            </NavLink>
          </li>
        </ul>
        <Link
          className="btn btn-outline-primary mr-3 ml-auto btn-sm"
          to="/login"
          aria-disabled="true"
        >
          Login
        </Link>
        <Link
          className="btn btn-primary btn-sm"
          to="/signup"
          aria-disabled="true"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo" style={{ fontSize: "2rem" }}>
          Event Buzz
        </NavLink>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about" className="nav__link" activeClassName="active">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

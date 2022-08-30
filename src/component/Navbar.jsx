import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const state = useSelector((state) => state.handleCart);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand text-white fw-bold fs-4" to="/">
          <img src="/verrated.png" alt="logo" width="180" class="d-inline-block align-text-top me-2" />
            
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-5 mb-lg-0">
              <li className="nav-item">
              
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <b style={{color:'white'}}>Home</b>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                <b style={{color:'white'}}>About</b>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  <b style={{color:'white'}}>Contact</b>
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              <NavLink to="/login" className="btn btn-dark">
                <i className="fa fa-sign-in me-1"></i> Login
              </NavLink>
              <NavLink to="/register" className="btn btn-dark ms-2">
                <i className="fa fa-user-plus me-1"></i> Register
              </NavLink>
              <NavLink to="/cart" className="btn btn-warning ms-2">
                <i className="fa fa-shopping-cart me-1"></i> Cart (
                {state.length})
              </NavLink>
              <NavLink to="/favorites" className="btn btn-warning ms-2">
              ❤️
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

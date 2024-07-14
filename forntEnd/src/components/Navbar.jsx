import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { selectItems } from "../pages/Cart/CartSlice";
import {  Logout, selectUserInfo  } from "../pages/auth/authSlice";

const Navbar = () => {
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink className="inactiveStyle" to="/" onClick={handleLinkClick}>
          Ecommerce
        </NavLink>
      </div>

      <div className={`nav-links ${isNavOpen ? "active" : ""}`}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
          to="/"
          onClick={handleLinkClick}
        >
          Products
        </NavLink>
        <NavLink
          to="/profile"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
        >
          My Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inactiveStyle"
          }
          to="/orders"
          onClick={handleLinkClick}
        >
          My Orders
        </NavLink>
        <NavLink
          to="cart"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive ? "activeStyle logInButton" : "inactiveStyle logInButton"
          }
        >
          <AiOutlineShoppingCart className="icon" />
          {items.length > 0 && (
            <span className="iconNumber">{items.length}</span>
          )}
        </NavLink>
        {!user ? (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "activeStyle logInButton"
                  : "inactiveStyle logInButton"
              }
              to="/login"
              onClick={handleLinkClick}
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "activeStyle signUpButton"
                  : "inactiveStyle signUpButton"
              }
              to="/signup"
              onClick={handleLinkClick}
            >
              Signup
            </NavLink>
          </>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "activeStyle signOutButton"
                : "inactiveStyle signOutButton"
            }
            onClick={() => {
              dispatch(Logout());
              navigate("/auth");
            }}
          >
            {" "}
            SignOut
          </NavLink>
        )}
      </div>
      <div className="burger" onClick={toggleNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;

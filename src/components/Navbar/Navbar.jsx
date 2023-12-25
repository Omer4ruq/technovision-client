import React, { useContext } from "react";

import { FaHome, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // const isAdmin = true;

  const handleSignOut = () => {
    logOut().then().catch();
  };
  return (
    <div>
      <div className="navbar bg-slate-800">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-slate-500 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="text-slate-600 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-950 rounded-box w-52"
            >
              <li>
                <NavLink>Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Explore</NavLink>
                {/* <ul className="p-2 bg-slate-800">
                  <li>
                    <NavLink>Features</NavLink>
                  </li>
                  <li>
                    <a>Pricing</a>
                  </li>
                </ul> */}
              </li>
              <li>
                <NavLink to="/about">About us</NavLink>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-sm text-white lg:text-xl">
            SCC <span className="font-bold text-red-600">Technovision</span>{" "}
            Inc.
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          {user ? (
            <ul className="menu menu-horizontal px-1 text-white">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Explore</NavLink>
                {/* <ul className="p-2 bg-slate-800">
                    <li>
                      <a>Features</a>
                    </li>
                    <li>
                      <a>Membership</a>
                    </li>
                  </ul> */}
              </li>
              <li>
                <NavLink to="about">About us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contuct us</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Deshboard</NavLink>
              </li>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-800 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleSignOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </ul>
          ) : (
            <ul className="menu menu-horizontal px-1 text-white">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Explore</NavLink>
              </li>
              <li>
                <NavLink to="about">About us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact us</NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <button>Login</button>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-end sm:hidden">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <nav className="bg-black w-full z-20 top-0 start-0 ">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-3">
          <img
            src="https://i.ibb.co.com/gZNtf6Bv/movie-master-pro2.png"
            className="w-[250px]"
            alt="Flowbite Logo"
          />
        </a>

        {/* Buttons (Right Side) */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-primary  focus:outline-none 
                       focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center 
                    "
          >
            Log in
          </button>

          {/* Mobile Menu Button */}
          <button
            data-collapse-toggle="navbar-sticky"
            onClick={() => {
              setShow(!show);
            }}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
                       rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 
                       focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 
                       dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`items-center justify-between ${
            show ? "" : "hidden"
          }  w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 p-4 md:p-0 text-white font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary"
                    : "text-white hover:text-secondary"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary"
                    : "text-white hover:text-secondary"
                }
              >
                All Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary"
                    : "text-white hover:text-secondary"
                }
              >
                My Collection
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

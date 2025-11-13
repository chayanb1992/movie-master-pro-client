import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContex } from "../../AuthContex/AuthContex";
import { HiMiniChevronDown } from "react-icons/hi2";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  User, // My Profile
  Images, // Albums
  Rss, // Following
  Users, // Followers
  Settings, // Settings
  Star, // Upgrade
  LogOut, // Sign out
} from "lucide-react"; // Icon library
import ThemeToggle from "../ThemeToggle";

// ✅ Menu data
const menuItems = [
  { icon: User, label: "My Profile", href: "#profile" },
  { icon: Images, label: "Albums", href: "#albums" },
  { icon: Rss, label: "Following", href: "#following" },
  { icon: Users, label: "Followers", href: "#followers" },
  { icon: Settings, label: "Settings", href: "#settings" },
  { icon: Star, label: "Upgrade", href: "#upgrade" },
  { icon: LogOut, label: "Sign out", href: "#signout" },
];

// ✅ Single menu item component
const MenuItem = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    className="flex items-center p-3 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
  >
    <Icon className="w-5 h-5 mr-3 text-gray-600" />
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const Navbar2 = () => {
  const { user, logOut } = useContext(AuthContex);
  const [show, setShow] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Ensure nested dropdown is closed when the main menu closes
    if (isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  };
  const toggleDropdown = () => {
    // Only toggle on click for mobile, desktop uses hover
    if (window.innerWidth < 768 || !isMobileMenuOpen) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };
  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      setOpenProfile(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    // Add and clean up listener
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black w-full z-20 top-0 start-0 border-b border-gray-800">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        {/* ✅ Logo */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="bg-gray-800 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700"
              aria-expanded="false"
            >
              <Menu className="block h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <img
            src="https://i.ibb.co.com/gZNtf6Bv/movie-master-pro2.png"
            className="w-[150px] md:w-[200px]"
            alt="Movie Master Pro Logo"
          />
        </div>

        {/* ✅ Right Side Buttons */}
        <div className="flex items-center space-x-3 md:order-2">
          {/* ✅ Profile Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-1 text-white hover:text-secondary focus:outline-none"
              >
                Profile <HiMiniChevronDown />
              </button>

              {openProfile && (
                <div className="absolute z-20 -left-6 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 origin-top-left group-hover:block transition-all duration-300 transform scale-95 md:block">
                  <div className="py-1">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/100"}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-2 border-pink-300 object-cover mb-3 mt-2 mx-auto"
                    />
                    <p className="text-center text-gray-200 text-xl mb-3">
                      {user.displayName}
                    </p>
                    <Link
                      onClick={() => setOpenProfile(!openProfile)}
                      to={"/profile"}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-secondary transition duration-300 border-l-4 border-transparent hover:border-secondary"
                    >
                      My Profile
                    </Link>
                    <Link
                      onClick={() => setOpenProfile(!openProfile)}
                      to={"/my-collection"}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:secondary transition duration-300 border-l-4 border-transparent hover:border-secondary"
                    >
                      My Collection
                    </Link>
                    <Link
                      onClick={() => setOpenProfile(!openProfile)}
                      to={"/movies/add"}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-secondary transition duration-300 border-l-4 border-transparent hover:border-secondary"
                    >
                      Add Movie
                    </Link>
                    <Link
                      onClick={() => setOpenProfile(!openProfile)}
                      to={"/watchList"}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-secondary transition duration-300 border-l-4 border-transparent hover:border-secondary"
                    >
                      My Watchlist
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white bg-secondary hover:bg-secondary/80 font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-secondary hover:bg-secondary/80 font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Log in
            </Link>
          )}
        </div>

        {/* ✅ Navigation Links */}
        <div
          id="navbar-sticky"
          className={`${
            show ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
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
                to="/movies"
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
                to="/my-collection"
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
      {/* 💥 Mobile Menu: Slide-in from Left Drawer 💥 */}

      {/* 1. Full-Screen Overlay/Container */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu} // Click anywhere on overlay to close
      >
        {/* 2. Dimming Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* 3. The Sliding Menu Panel */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-64 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
        >
          {/* Menu Header/Close Button */}
          <div className="flex justify-between items-center h-16 p-4 border-b border-gray-800">
            <img
              src="https://i.ibb.co.com/gZNtf6Bv/movie-master-pro2.png"
              className="w-[150px] md:w-[200px]"
              alt="Movie Master Pro Logo"
            />
            <button
              onClick={toggleMobileMenu}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-secondary transition duration-300"
            >
              Home
            </a>

            {/* Mobile Dropdown Item (Click/Tap) */}

            <a
              href="#"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-secondary transition duration-300"
            >
              All Movies
            </a>
            <a
              href="#"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-secondary transition duration-300"
            >
              My Collection
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);

  const checkToken = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  };

  useEffect(() => {
    checkToken();

    const handleStorageChange = () => {
      checkToken(); // update state when token changes
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // 🔁 update header
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-green-800 text-white py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 bg-gray-200 p-1 flex items-center justify-center">
            <img
              src="/image/Indian_gujarati_man_standing_in_welcome_pose-removebg-preview.png"
              alt="Padharo Gujarat Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#F4D03F", textShadow: "2px 2px 4px #154360" }}
          >
            Padharo Gujarat
          </h1>
        </div>

        <div className="flex-grow"></div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6 items-center">
            <li><Link to="/" className="hover:underline text-lg">Home</Link></li>
            <li><Link to="/places" className="hover:underline text-lg">Places</Link></li>
            <li><Link to="/about" className="hover:underline text-lg">About</Link></li>
            <li><Link to="/contact" className="hover:underline text-lg">Contact</Link></li>
            {token && <li><Link to="/trip-planner" className="hover:underline text-lg">Trip Planner</Link></li>}
            {token ? (
              <>
                <li>
                  <Link to="/favorites" className="hover:underline text-lg text-yellow-300 font-bold">
                    My Favorites
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-md text-white font-bold hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="bg-yellow-400 px-4 py-2 rounded-md text-green-900 font-bold hover:bg-yellow-500 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="bg-yellow-400 px-4 py-2 rounded-md text-green-900 font-bold hover:bg-yellow-500 transition"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav className={`md:hidden bg-green-800 px-6 py-4 ${menuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col gap-4">
          <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline text-lg">Home</Link></li>
          <li><Link to="/places" onClick={() => setMenuOpen(false)} className="hover:underline text-lg">Places</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:underline text-lg">About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:underline text-lg">Contact</Link></li>
          {token && <li><Link to="/trip-planner" onClick={() => setMenuOpen(false)} className="hover:underline text-lg">Trip Planner</Link></li>}
          {token ? (
            <>
              <li>
                <Link to="/favorites" onClick={() => setMenuOpen(false)} className="hover:underline text-lg text-yellow-300 font-bold">
                  My Favorites
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="bg-red-500 px-4 py-2 rounded-md text-white font-bold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-yellow-400 px-4 py-2 rounded-md text-green-900 font-bold hover:bg-yellow-500 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="bg-yellow-500 px-4 py-2 rounded-md text-green-900 font-bold hover:bg-yellow-600 transition">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

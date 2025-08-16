import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/portfolio", label: "Portfolio" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            CryptoPalace
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative text-white font-medium transition duration-300 ${
                location.pathname === to
                  ? "text-cyan-400"
                  : "hover:text-cyan-300"
              }`}
            >
              {label}
              {location.pathname === to && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyan-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

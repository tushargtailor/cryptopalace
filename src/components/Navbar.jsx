import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <Link
              to="/"
              className="text-white hover:text-gray-200 font-medium transition-colors duration-300"
            >
              CryptoPalace
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-200 font-medium transition-colors duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/portfolio"
              className="text-white hover:text-gray-200 font-medium transition-colors duration-300"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

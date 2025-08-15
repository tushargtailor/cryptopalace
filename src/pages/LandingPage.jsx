import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="[perspective::1000px] [transform-style:preserve-3d] min-h-[calc(100vh-4rem)] w-full bg-neutral-900 flex items-center justify-center"
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex flex-col items-center text-center -mt-40">
        {/* Heading */}
        <span className="text-6xl font-bold text-white mb-6 leading-snug">
          A CryptoPalace <br />One Place for Crypto Currency
        </span>

        {/* Button */}
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent text-white rounded-lg shadow-lg hover:from-cyan-500 hover:to-cyan-800 transition duration-300"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

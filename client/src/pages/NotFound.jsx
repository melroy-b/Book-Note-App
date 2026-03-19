import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-neutral-800">

      {/* Floating icon */}
      <div className="text-6xl mb-4 animate-bounce">
        📚
      </div>

      {/* Big 404 */}
      <h1 className="text-7xl font-bold text-red-500 mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-xl font-semibold mb-2">
        Page Not Found
      </p>

      <p className="text-neutral-500 mb-6 max-w-md">
        Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-[#764a4e] text-white rounded-lg shadow hover:bg-[#3e2d2f] transition"
      >
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;
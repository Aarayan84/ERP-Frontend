import { Link } from "react-router-dom";

function NotFound() {
  const user = JSON.parse(localStorage.getItem("user") ||"null");

  const dashboardLink =
    user?.role === "admin"
      ? "/dashboard"
      : "/employee-dashboard";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md w-full">

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to={dashboardLink}
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Go to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;
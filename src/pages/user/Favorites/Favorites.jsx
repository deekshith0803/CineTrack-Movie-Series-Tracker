import React from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const movies = [
    {
      id: 1,
      title: "Sample Movie",
      year: "2025",
      rating: "8.5",
    },
    {
      id: 2,
      title: "Another Movie",
      year: "2024",
      rating: "8.1",
    },
    {
      id: 3,
      title: "Another Movie",
      year: "2024",
      rating: "8.1",
    },
  ];

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">My Favorites</h1>

            <p className="text-gray-500 mt-2">
              Your favorite movies and series in one place.
            </p>
          </div>

          <Link
            to="/movies"
            className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold no-underline text-center hover:bg-red-700"
          >
            + Add Favorites
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Total Favorites</p>

            <p className="text-3xl font-bold mt-2">{movies.length}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Movies</p>

            <p className="text-3xl font-bold mt-2">{movies.length}</p>
          </div>

          <div className="hidden sm:block bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Series</p>

            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

        {/* Favorites */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <div key={movie.id} className="group">
                {/* Poster */}
                <Link to={`/movie/${movie.id}`} className="block no-underline">
                  <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      Movie Poster
                    </div>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-white truncate">
                    {movie.title}
                  </h3>
                </Link>

                {/* Info */}
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{movie.year}</p>

                  <p className="text-xs text-yellow-500">★ {movie.rating}</p>
                </div>

                {/* Remove */}
                <button className="w-full mt-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition">
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */

          <div className="border border-gray-800 bg-gray-900 rounded-2xl py-20 px-5 text-center">
            <div className="text-5xl mb-5">♥</div>

            <h2 className="text-2xl font-bold">No Favorites Yet</h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Add movies and series to your favorites to find them quickly.
            </p>

            <Link
              to="/movies"
              className="inline-block mt-6 px-5 py-3 rounded-lg bg-red-600 text-white font-semibold no-underline hover:bg-red-700"
            >
              Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

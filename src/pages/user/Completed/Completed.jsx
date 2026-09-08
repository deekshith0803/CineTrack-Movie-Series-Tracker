import React from "react";
import { Link } from "react-router-dom";

const Completed = () => {
  // Real completed data will come from Redux later
  const completed = [];

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Completed</h1>

          <p className="text-gray-500 mt-2">
            Movies and series you have completed.
          </p>
        </div>

        {/* Completed List */}
        {completed.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {completed.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >
                {/* Poster */}
                <div className="aspect-[2/3] bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <span className="text-xs text-green-500 font-semibold">
                    {item.type}
                  </span>

                  <h2 className="font-semibold text-sm mt-2 truncate">
                    {item.title}
                  </h2>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{item.year}</span>

                    <span className="text-xs text-yellow-400">
                      ★ {item.rating}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-3">
                    Completed {item.completedDate}
                  </p>

                  <Link
                    to={
                      item.type === "Movie"
                        ? `/movie/${item.id}`
                        : `/series/${item.id}`
                    }
                    className="block text-center mt-4 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium no-underline hover:bg-gray-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-gray-900 border border-gray-800 rounded-xl py-20 px-5 text-center">
            <div className="text-4xl mb-4">✓</div>

            <h2 className="text-xl font-semibold">Nothing completed yet</h2>

            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Movies and series that you finish watching will appear here.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link
                to="/movies"
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700"
              >
                Explore Movies
              </Link>

              <Link
                to="/series"
                className="px-5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm font-semibold no-underline hover:bg-gray-700"
              >
                Explore Series
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;

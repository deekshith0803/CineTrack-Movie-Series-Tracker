import React from "react";
import { Link } from "react-router-dom";

const CurrentlyWatching = () => {
  const watching = [];

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Currently Watching</h1>

          <p className="text-gray-500 mt-2">
            Continue watching your movies and series.
          </p>
        </div>

        {/* Watching List */}
        {watching.length > 0 ? (
          <div className="space-y-4">
            {watching.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Poster */}
                  <div className="w-full sm:w-32 shrink-0">
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-xs text-red-500 font-semibold mb-2">
                      {item.type}
                    </span>

                    <h2 className="text-xl sm:text-2xl font-bold">
                      {item.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                      <span className="text-gray-500">{item.year}</span>

                      <span className="text-yellow-400">★ {item.rating}</span>

                      <span className="text-gray-500">•</span>

                      <span className="text-gray-400">{item.current}</span>
                    </div>

                    {/* Progress */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Progress</span>

                        <span className="text-xs text-gray-400">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{
                            width: `${item.progress}%`,
                          }}
                        />
                      </div>

                      <p className="text-xs text-gray-600 mt-2">{item.total}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      <Link
                        to={
                          item.type === "Movie"
                            ? `/movie/${item.id}`
                            : `/series/${item.id}`
                        }
                        className="px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700 transition"
                      >
                        Continue Watching
                      </Link>

                      <button className="px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-700 transition">
                        Mark Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-gray-900 border border-gray-800 rounded-xl py-20 px-5 text-center">
            <div className="text-4xl mb-4">▶</div>

            <h2 className="text-xl font-semibold">
              Nothing to watch right now
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Start watching a movie or series and it will appear here.
            </p>

            <div className="flex justify-center gap-3 mt-5">
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

export default CurrentlyWatching;

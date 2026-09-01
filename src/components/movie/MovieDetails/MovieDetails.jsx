import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        );

        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id, API_KEY]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white">
      <section className="relative min-h-[550px] overflow-hidden">
        {/* Background */}
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/30" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          {/* Back */}
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white no-underline mb-10"
          >
            ← Back to Movies
          </Link>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* ================= POSTER ================= */}

            <div className="w-48 sm:w-56 md:w-64 shrink-0">
              <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* ================= DETAILS ================= */}

            <div className="max-w-2xl flex flex-col justify-center">
              <p className="text-red-500 text-sm font-semibold mb-3">
                MOVIE DETAILS
              </p>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
                {/* Rating */}
                <span className="text-yellow-400">
                  ★ {movie.vote_average?.toFixed(1)}
                </span>

                {/* Release Year */}
                <span className="text-gray-400">
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A"}
                </span>

                {/* Runtime */}
                {movie.runtime && (
                  <span className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-300">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-gray-300 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="mt-6 text-gray-300 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-7">
                <button className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                  + Add to Watchlist
                </button>

                <button className="px-5 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-200 font-semibold hover:bg-gray-800 transition">
                  ♥ Add to Favorites
                </button>

                <button className="px-5 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-200 font-semibold hover:bg-gray-800 transition">
                  ✓ Mark as Watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INFORMATION ================= */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Release Date */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Release Date</p>

            <p className="text-white font-semibold mt-2">
              {movie.release_date || "N/A"}
            </p>
          </div>

          {/* Language */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Language</p>

            <p className="text-white font-semibold mt-2">
              {movie.original_language
                ? movie.original_language.toUpperCase()
                : "N/A"}
            </p>
          </div>

          {/* Rating */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">TMDB Rating</p>

            <p className="text-yellow-400 font-semibold mt-2">
              ★ {movie.vote_average?.toFixed(1)} / 10
            </p>
          </div>

          {/* Votes */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Vote Count</p>

            <p className="text-white font-semibold mt-2">
              {movie.vote_count?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </section>

      {/* ================= ADDITIONAL INFO ================= */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-5">Movie Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Original Title */}
            <div>
              <p className="text-gray-500 text-sm">Original Title</p>

              <p className="text-gray-200 mt-1">
                {movie.original_title || "N/A"}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-gray-500 text-sm">Status</p>

              <p className="text-gray-200 mt-1">{movie.status || "N/A"}</p>
            </div>

            {/* Popularity */}
            <div>
              <p className="text-gray-500 text-sm">Popularity</p>

              <p className="text-gray-200 mt-1">
                {movie.popularity?.toFixed(1) || "N/A"}
              </p>
            </div>

            {/* Budget */}
            <div>
              <p className="text-gray-500 text-sm">Budget</p>

              <p className="text-gray-200 mt-1">
                {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;

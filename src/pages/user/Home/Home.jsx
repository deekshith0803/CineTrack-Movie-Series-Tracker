import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieCard from "../../../components/movie/MovieCard/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const watchlist = useSelector((state) => state.watchlist?.items || []);
  const favorites = useSelector((state) => state.favorites?.items || []);
  const watching = useSelector((state) => state.watching?.items || []);

  const moviesWatchedCount = watching.filter((i) => i.type !== "Series" && !i.first_air_date).length;
  const seriesWatchedCount = watching.filter((i) => i.type === "Series" || i.first_air_date).length;

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        );

        const data = await response.json();

        const movieList = data.results || [];

        setMovies(movieList);

        // Random movie for banner
        if (movieList.length > 0) {
          const moviesWithBackdrop = movieList.filter(
            (movie) => movie.backdrop_path,
          );

          if (moviesWithBackdrop.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * moviesWithBackdrop.length,
            );

            setBannerMovie(moviesWithBackdrop[randomIndex]);
          }
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [API_KEY]);

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden bg-gray-950 text-white">
      {/* =====================================================
          HERO BANNER
      ===================================================== */}

      <section className="relative min-h-[500px] sm:min-h-[550px] flex items-center overflow-hidden">
        {/* Background Image */}
        {bannerMovie?.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}
            alt={bannerMovie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Left Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-950 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              {/* Small Heading */}
              <p className="text-red-500 text-sm font-semibold tracking-wide mb-3">
                WELCOME TO CINETRACK
              </p>

              {/* Movie Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {bannerMovie?.title || "Track what you watch."}
              </h1>

              {/* Overview */}
              <p className="mt-5 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3">
                {bannerMovie?.overview ||
                  "Track your favorite movies and series, build your watchlist, and discover something new to watch."}
              </p>

              {/* Movie Details */}
              {bannerMovie && (
                <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
                  {/* Rating */}
                  <span className="text-yellow-400 font-medium">
                    ★ {bannerMovie.vote_average?.toFixed(1)}
                  </span>

                  {/* Year */}
                  <span className="text-gray-300">
                    {bannerMovie.release_date
                      ? bannerMovie.release_date.substring(0, 4)
                      : "N/A"}
                  </span>

                  {/* Type */}
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-gray-300">
                    Movie
                  </span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  to="/watchlist"
                  className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold no-underline transition hover:bg-red-700"
                >
                  View Watchlist ({watchlist.length})
                </Link>

                <Link
                  to="/favorites"
                  className="px-5 py-3 rounded-lg border border-gray-600 text-gray-200 font-semibold no-underline transition hover:bg-white/10"
                >
                  My Favorites ({favorites.length})
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="px-5 sm:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Movies */}
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-gray-500 text-sm">Movies Watched</p>

            <h2 className="text-3xl font-bold mt-2">{moviesWatchedCount}</h2>
          </div>

          {/* Series */}
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-gray-500 text-sm">Series Watched</p>

            <h2 className="text-3xl font-bold mt-2">{seriesWatchedCount}</h2>
          </div>

          {/* Watchlist */}
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-gray-500 text-sm">Watchlist</p>

            <h2 className="text-3xl font-bold mt-2">{watchlist.length}</h2>
          </div>

          {/* Favorites */}
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-gray-500 text-sm">Favorites</p>

            <h2 className="text-3xl font-bold mt-2">{favorites.length}</h2>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Popular Movies</h2>

              <p className="text-gray-500 text-sm mt-1">
                Popular movies from TMDB
              </p>
            </div>

            <Link
              to="/movies"
              className="text-sm text-red-500 hover:text-red-400 no-underline"
            >
              View All
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500">Loading movies...</p>
            </div>
          )}

          {/* Movies */}
          {!loading && movies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {movies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* No Movies */}
          {!loading && movies.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">No movies found.</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Text */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Find something new to watch
                </h2>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Explore movies and series and add them to your collection.
                </p>
              </div>

              {/* Button */}
              <Link
                to="/movies"
                className="shrink-0 px-5 py-3 rounded-lg bg-white text-gray-950 font-semibold no-underline text-center transition hover:bg-gray-200"
              >
                Explore Movies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

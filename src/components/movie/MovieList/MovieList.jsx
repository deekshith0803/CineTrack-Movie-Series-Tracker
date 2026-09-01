import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`,
        );

        const data = await response.json();

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [API_KEY, page]);

  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Movies</h1>

            <p className="text-gray-500 mt-2">
              Explore movies and discover something new.
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search this page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 outline-none focus:border-red-600"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading movies...</p>
          </div>
        )}

        {/* Movies */}
        {!loading && filteredMovies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredMovies.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">No movies found.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && movies.length > 0 && (
          <div className="flex items-center justify-center gap-3 py-10">
            <button
              onClick={previousPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-sm text-gray-400">Page {page}</span>

            <button
              onClick={nextPage}
              disabled={page >= totalPages}
              className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;

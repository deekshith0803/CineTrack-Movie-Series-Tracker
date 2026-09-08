import React, { useEffect, useState } from "react";
import SeriesCard from "../SeriesCard/SeriesCard";

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const getSeries = async () => {
      setLoading(true);

      try {
        let url;

        if (search.trim()) {
          // Search entire TMDB TV database
          url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            search,
          )}&page=${page}`;
        } else {
          // Normal popular series
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch series");
        }

        const data = await response.json();

        setSeries(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching series:", error);
        setSeries([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    getSeries();
  }, [API_KEY, page, search]);

  // Search starts from page 1
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">TV Series</h1>

            <p className="text-gray-500 mt-2">
              {search
                ? `Search results for "${search}"`
                : "Explore series and discover something new."}
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search all series..."
            value={search}
            onChange={handleSearch}
            className="w-full sm:w-72 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 outline-none focus:border-red-600"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">
              {search ? "Searching series..." : "Loading series..."}
            </p>
          </div>
        )}

        {/* Series */}
        {!loading && series.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {series.map((item) => (
              <SeriesCard key={item.id} series={item} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && series.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              {search ? `No series found for "${search}".` : "No series found."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && series.length > 0 && (
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

export default SeriesList;

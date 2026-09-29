import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToWatchlist, removeFromWatchlist } from "../../../redux/slices/watchlistSlice";
import { addToFavorites, removeFromFavorites } from "../../../redux/slices/favoritesSlice";
import { addToWatching, removeFromWatching } from "../../../redux/slices/watchingSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const watchlist = useSelector((state) => state.watchlist?.items || []);
  const favorites = useSelector((state) => state.favorites?.items || []);
  const watching = useSelector((state) => state.watching?.items || []);

  const isInWatchList = movie?.id ? watchlist.some((item) => String(item.id) === String(movie.id)) : false;
  const isFavorite = movie?.id ? favorites.some((item) => String(item.id) === String(movie.id)) : false;
  const isWatched = movie?.id ? watching.some(
    (item) => String(item.id) === String(movie.id) && (item.status === "completed" || item.progress === 100)
  ) : false;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <Link to="/movies" className="mt-4 text-red-500 hover:text-red-400 no-underline">
          ← Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white">
      <section className="relative min-h-[550px] overflow-hidden">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white no-underline mb-10"
          >
            ← Back to Movies
          </Link>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
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

            <div className="max-w-2xl flex flex-col justify-center">
              <p className="text-red-500 text-sm font-semibold mb-3">MOVIE DETAILS</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
                <span className="text-yellow-400">★ {movie.vote_average?.toFixed(1)}</span>
                <span className="text-gray-400">
                  {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
                </span>
                {movie.runtime && (
                  <span className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-300">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
              </div>

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

              <p className="mt-6 text-gray-300 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>

              {/* Action Buttons with Dynamic Toggle State */}
              <div className="flex flex-wrap gap-3 mt-7">
                <button
                  onClick={() => {
                    if (isInWatchList) {
                      dispatch(removeFromWatchlist(movie.id));
                    } else {
                      dispatch(addToWatchlist({ ...movie, media_type: "movie" }));
                    }
                  }}
                  className={`px-5 py-3 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${
                    isInWatchList
                      ? "bg-green-600 text-white hover:bg-green-700 border border-green-500"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {isInWatchList ? "✓ In Watchlist" : "+ Add to Watchlist"}
                </button>

                <button
                  onClick={() => {
                    if (isFavorite) {
                      dispatch(removeFromFavorites(movie.id));
                    } else {
                      dispatch(addToFavorites({ ...movie, media_type: "movie" }));
                    }
                  }}
                  className={`px-5 py-3 rounded-lg border font-semibold transition cursor-pointer flex items-center gap-2 ${
                    isFavorite
                      ? "bg-red-600 text-white border-red-500 hover:bg-red-700"
                      : "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"
                  }`}
                >
                  {isFavorite ? "♥ Favorited" : "♥ Add to Favorites"}
                </button>

                <button
                  onClick={() => {
                    if (isWatched) {
                      dispatch(removeFromWatching(movie.id));
                    } else {
                      dispatch(
                        addToWatching({
                          ...movie,
                          type: "Movie",
                          progress: 100,
                          status: "completed",
                        })
                      );
                      navigate("/completed");
                    }
                  }}
                  className={`px-5 py-3 rounded-lg border font-semibold transition cursor-pointer flex items-center gap-2 ${
                    isWatched
                      ? "bg-green-600 text-white border-green-500 hover:bg-green-700"
                      : "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"
                  }`}
                >
                  {isWatched ? "✓ Watched" : "✓ Mark as Watched"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Release Date</p>
            <p className="text-white font-semibold mt-2">{movie.release_date || "N/A"}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Language</p>
            <p className="text-white font-semibold mt-2">
              {movie.original_language ? movie.original_language.toUpperCase() : "N/A"}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">TMDB Rating</p>
            <p className="text-yellow-400 font-semibold mt-2">
              ★ {movie.vote_average?.toFixed(1)} / 10
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Vote Count</p>
            <p className="text-white font-semibold mt-2">
              {movie.vote_count?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;

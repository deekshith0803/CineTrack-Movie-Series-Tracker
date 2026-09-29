import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../../redux/slices/favoritesSlice";
import { addToWatchlist, removeFromWatchlist } from "../../../redux/slices/watchlistSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites?.items || []);
  const watchlist = useSelector((state) => state.watchlist?.items || []);

  const isFavorite = movie?.id ? favorites.some((item) => String(item.id) === String(movie.id)) : false;
  const isInWatchlist = movie?.id ? watchlist.some((item) => String(item.id) === String(movie.id)) : false;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites({ ...movie, media_type: "movie" }));
    }
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist({ ...movie, media_type: "movie" }));
    }
  };

  return (
    <div className="relative group">
      <Link
        to={`/movie/${movie.id}`}
        className="block cursor-pointer no-underline"
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
          {movie?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}

          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-2 right-2 flex gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition">
            <button
              onClick={handleWatchlistClick}
              title={isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              className={`p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                isInWatchlist
                  ? "bg-green-600 text-white"
                  : "bg-black/60 text-gray-300 hover:bg-black/80 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>

            <button
              onClick={handleFavoriteClick}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              className={`p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                isFavorite
                  ? "bg-red-600 text-white"
                  : "bg-black/60 text-gray-300 hover:bg-black/80 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-sm font-semibold text-white truncate">
          {movie?.title || "Unknown Movie"}
        </h3>

        {/* Details */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500">
            {movie?.release_date ? movie.release_date.substring(0, 4) : "N/A"}
          </p>

          <p className="text-xs text-yellow-500">
            ★ {movie?.vote_average?.toFixed(1) || "N/A"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;


import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block cursor-pointer no-underline"
    >
      {/* Poster */}
      <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
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
  );
};

export default MovieCard;

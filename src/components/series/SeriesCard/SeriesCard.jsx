import React from "react";
import { Link } from "react-router-dom";

const SeriesCard = ({ series }) => {
  return (
    <div className="group">
      {/* Poster */}
      <Link to={`/series/${series.id}`} className="block no-underline">
        <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
          {series.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-sm font-semibold text-white truncate">
          {series.name}
        </h3>
      </Link>

      {/* Info */}
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-gray-500">
          {series.first_air_date
            ? series.first_air_date.substring(0, 4)
            : "N/A"}
        </p>

        <p className="text-xs text-yellow-500">
          ★ {series.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default SeriesCard;

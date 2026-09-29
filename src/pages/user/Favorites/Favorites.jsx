import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../../../redux/slices/favoritesSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.favorites?.items || []);

  const movieCount = movies.filter((m) => m.media_type !== "tv" && !m.first_air_date).length;
  const seriesCount = movies.filter((m) => m.media_type === "tv" || m.first_air_date).length;

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">My Favorites</h1>
            <p className="text-gray-500 mt-2">Your favorite movies and series in one place.</p>
          </div>
          <Link
            to="/movies"
            className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold no-underline text-center hover:bg-red-700"
          >
            + Add Favorites
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Total Favorites</p>
            <p className="text-3xl font-bold mt-2">{movies.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Movies</p>
            <p className="text-3xl font-bold mt-2">{movieCount}</p>
          </div>
          <div className="hidden sm:block bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Series</p>
            <p className="text-3xl font-bold mt-2">{seriesCount}</p>
          </div>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.map((movie) => {
              const itemTitle = movie.title || movie.name || "Untitled";
              const itemDate = movie.release_date || movie.first_air_date || "";
              const itemLink =
                movie.media_type === "tv" || movie.first_air_date
                  ? `/series/${movie.id}`
                  : `/movie/${movie.id}`;

              return (
                <div key={movie.id} className="group">
                  <Link to={itemLink} className="block no-underline">
                    <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={itemTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-white truncate">{itemTitle}</h3>
                  </Link>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{itemDate ? itemDate.substring(0, 4) : "N/A"}</p>
                    <p className="text-xs text-yellow-500">★ {movie.vote_average?.toFixed(1) || "N/A"}</p>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromFavorites(movie.id))}
                    className="w-full mt-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-gray-800 bg-gray-900 rounded-2xl py-20 px-5 text-center">
            <div className="text-5xl mb-5">♥</div>
            <h2 className="text-2xl font-bold">No Favorites Yet</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Add movies and series to your favorites to find them quickly.
            </p>
            <Link
              to="/movies"
              className="inline-block mt-6 px-5 py-3 rounded-lg bg-red-600 text-white font-semibold no-underline hover:bg-red-700"
            >
              Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

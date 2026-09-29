import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { markAsCompleted } from "../../../redux/slices/watchingSlice";

const CurrentlyWatching = () => {
  const watching = useSelector((state) => (state.watching?.items || []).filter((i) => i.status !== "completed"));

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Currently Watching</h1>
          <p className="text-gray-500 mt-2">Continue watching your movies and series.</p>
        </div>

        {watching.length > 0 ? (
          <div className="space-y-4">
            {watching.map((item) => {
              const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : item.image;
              const title = item.title || item.name || "Untitled";
              const year = (item.release_date || item.first_air_date || item.year || "").substring(0, 4) || "N/A";
              const rating = item.vote_average ? item.vote_average.toFixed(1) : item.rating || "N/A";
              const isSeries = item.type === "Series" || !!item.first_air_date;

              return (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-32 shrink-0">
                      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                        {posterUrl ? (
                          <img src={posterUrl} alt={title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-xs text-red-500 font-semibold mb-2 uppercase">{isSeries ? "Series" : "Movie"}</span>
                      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                        <span className="text-gray-500">{year}</span>
                        <span className="text-yellow-400">★ {rating}</span>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs text-gray-400">{item.progress || 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress || 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-5">
                        <Link
                          to={isSeries ? `/series/${item.id}` : `/movie/${item.id}`}
                          className="px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700 transition"
                        >
                          Continue Watching
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl py-20 px-5 text-center">
            <div className="text-4xl mb-4">▶</div>
            <h2 className="text-xl font-semibold">Nothing to watch right now</h2>
            <p className="text-gray-500 text-sm mt-2">Start watching a movie or series and it will appear here.</p>
            <div className="flex justify-center gap-3 mt-5">
              <Link to="/movies" className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700">Explore Movies</Link>
              <Link to="/series" className="px-5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm font-semibold no-underline hover:bg-gray-700">Explore Series</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentlyWatching;

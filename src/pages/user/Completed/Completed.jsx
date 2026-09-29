import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Completed = () => {
  const completed = useSelector((state) =>
    (state.watching?.items || []).filter((i) => i.status === "completed" || i.progress === 100)
  );

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Completed</h1>
          <p className="text-gray-500 mt-2">Movies and series you have completed.</p>
        </div>

        {completed.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {completed.map((item) => {
              const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : item.image;
              const title = item.title || item.name || "Untitled";
              const year = (item.release_date || item.first_air_date || item.year || "").substring(0, 4) || "N/A";
              const rating = item.vote_average ? item.vote_average.toFixed(1) : item.rating || "N/A";
              const isSeries = item.type === "Series" || !!item.first_air_date;

              return (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <div className="aspect-[2/3] bg-gray-800">
                    {posterUrl ? (
                      <img src={posterUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Image</div>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="text-xs text-green-500 font-semibold uppercase">{isSeries ? "Series" : "Movie"}</span>
                    <h2 className="font-semibold text-sm mt-2 truncate">{title}</h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{year}</span>
                      <span className="text-xs text-yellow-400">★ {rating}</span>
                    </div>

                    <Link
                      to={isSeries ? `/series/${item.id}` : `/movie/${item.id}`}
                      className="block text-center mt-4 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium no-underline hover:bg-gray-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl py-20 px-5 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold">Nothing completed yet</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Movies and series that you finish watching will appear here.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link to="/movies" className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700">Explore Movies</Link>
              <Link to="/series" className="px-5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm font-semibold no-underline hover:bg-gray-700">Explore Series</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;

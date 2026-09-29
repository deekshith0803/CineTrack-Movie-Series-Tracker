import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../../redux/slices/watchlistSlice";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/favoritesSlice";

import { addToWatching } from "../../../redux/slices/watchingSlice";

const SeriesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);

  const [selectedSeason, setSelectedSeason] = useState(1);

  const [loading, setLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(false);

  const [watchedEpisodes, setWatchedEpisodes] = useState({});

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const watchlist = useSelector(
    (state) => state.watchlist?.items || [],
  );

  const favorites = useSelector(
    (state) => state.favorites?.items || [],
  );

  const watching = useSelector(
    (state) => state.watching?.items || [],
  );

  const isInWatchList = series?.id
    ? watchlist.some(
      (item) => String(item.id) === String(series.id),
    )
    : false;

  const isFavorite = series?.id
    ? favorites.some(
      (item) => String(item.id) === String(series.id),
    )
    : false;

  /*
  ============================================================
  GET SERIES DETAILS
  ============================================================
  */

  useEffect(() => {
    const getSeriesDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch series");
        }

        const data = await response.json();

        setSeries(data);

        const firstSeason = data.seasons?.find(
          (season) => season.season_number > 0,
        );

        if (firstSeason) {
          setSelectedSeason(firstSeason.season_number);
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    };

    getSeriesDetails();
  }, [id, API_KEY]);

  /*
  ============================================================
  LOAD SAVED WATCHED EPISODES
  ============================================================
  */

  useEffect(() => {
    if (!series?.id) return;

    try {
      const savedEpisodes = JSON.parse(
        localStorage.getItem(
          `watchedEpisodes_${series.id}`,
        ) || "{}",
      );

      setWatchedEpisodes(savedEpisodes);
    } catch (error) {
      console.error(
        "Error loading watched episodes:",
        error,
      );

      setWatchedEpisodes({});
    }
  }, [series?.id]);

  /*
  ============================================================
  FETCH ALL EPISODES FROM ALL SEASONS
  ============================================================
  */

  useEffect(() => {
    if (!series?.seasons) return;

    const getAllEpisodes = async () => {
      try {
        const normalSeasons = series.seasons.filter(
          (season) => season.season_number > 0,
        );

        const seasonRequests = normalSeasons.map(
          async (season) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API_KEY}&language=en-US`,
            );

            if (!response.ok) {
              throw new Error(
                `Failed to fetch season ${season.season_number}`,
              );
            }

            const data = await response.json();

            return data.episodes || [];
          },
        );

        const seasonResults =
          await Promise.all(seasonRequests);

        const combinedEpisodes =
          seasonResults.flat();

        setAllEpisodes(combinedEpisodes);
      } catch (error) {
        console.error(
          "Error fetching all episodes:",
          error,
        );

        setAllEpisodes([]);
      }
    };

    getAllEpisodes();
  }, [series, id, API_KEY]);

  /*
  ============================================================
  FETCH CURRENT SELECTED SEASON
  ============================================================
  */

  useEffect(() => {
    if (!series) return;

    const getEpisodes = async () => {
      setEpisodeLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${API_KEY}&language=en-US`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch episodes");
        }

        const data = await response.json();

        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error(
          "Error fetching episodes:",
          error,
        );

        setEpisodes([]);
      } finally {
        setEpisodeLoading(false);
      }
    };

    getEpisodes();
  }, [id, selectedSeason, series, API_KEY]);

  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">
          Loading series...
        </p>
      </div>
    );
  }

  /*
  ============================================================
  SERIES NOT FOUND
  ============================================================
  */

  if (!series) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Series not found
        </h1>

        <Link
          to="/series"
          className="mt-4 text-red-500 hover:text-red-400 no-underline"
        >
          ← Back to Series
        </Link>
      </div>
    );
  }

  /*
  ============================================================
  CURRENT SEASON PROGRESS
  ============================================================
  */

  const seasonWatchedCount = episodes.filter(
    (episode) => watchedEpisodes[episode.id],
  ).length;

  const seasonProgress =
    episodes.length > 0
      ? Math.round(
        (seasonWatchedCount / episodes.length) * 100,
      )
      : 0;

  /*
  ============================================================
  OVERALL SERIES PROGRESS
  ============================================================
  */

  const totalEpisodes = allEpisodes.length;

  const totalWatchedEpisodes = allEpisodes.filter(
    (episode) => watchedEpisodes[episode.id],
  ).length;

  const overallProgress =
    totalEpisodes > 0
      ? Math.round(
        (totalWatchedEpisodes / totalEpisodes) * 100,
      )
      : 0;

  const isSeriesCompleted =
    totalEpisodes > 0 &&
    totalWatchedEpisodes === totalEpisodes;

  /*
  ============================================================
  MARK EPISODE WATCHED
  ============================================================
  */

  const handleEpisodeWatched = (episodeId) => {
    const newStatus = !watchedEpisodes[episodeId];

    const updatedEpisodes = {
      ...watchedEpisodes,
      [episodeId]: newStatus,
    };

    /*
      Update React state
    */

    setWatchedEpisodes(updatedEpisodes);

    /*
      Save individual watched episodes
    */

    localStorage.setItem(
      `watchedEpisodes_${series.id}`,
      JSON.stringify(updatedEpisodes),
    );

    /*
      Calculate overall progress using
      ALL seasons, not just current season.
    */

    const newTotalWatched = allEpisodes.filter(
      (episode) =>
        episode.id === episodeId
          ? newStatus
          : updatedEpisodes[episode.id],
    ).length;

    const newOverallProgress =
      allEpisodes.length > 0
        ? Math.round(
          (newTotalWatched / allEpisodes.length) * 100,
        )
        : 0;

    /*
      Only mark the ENTIRE series completed
      when every episode from every season
      has been watched.
    */

    const completed =
      allEpisodes.length > 0 &&
      newTotalWatched === allEpisodes.length;

    /*
      Save/update watching state.
    */

    dispatch(
      addToWatching({
        ...series,
        id: series.id,
        title: series.name,
        name: series.name,
        type: "Series",
        media_type: "tv",

        progress: newOverallProgress,

        status: completed
          ? "completed"
          : "watching",
      }),
    );
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[550px] overflow-hidden">

        {series.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
            alt={series.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">

          <Link
            to="/series"
            className="inline-flex items-center text-gray-400 hover:text-white no-underline mb-10"
          >
            ← Back to Series
          </Link>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

            {/* Poster */}

            <div className="w-48 sm:w-56 md:w-64 shrink-0">

              <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">

                {series.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    alt={series.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}

              </div>

            </div>

            {/* Details */}

            <div className="max-w-2xl flex flex-col justify-center">

              <p className="text-red-500 text-sm font-semibold mb-3">
                TV SERIES
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {series.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">

                <span className="text-yellow-400">
                  ★ {series.vote_average?.toFixed(1)}
                </span>

                <span className="text-gray-400">
                  {series.first_air_date?.substring(0, 4)}
                </span>

                <span className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-300">
                  {series.number_of_seasons} Seasons
                </span>

                <span className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-300">
                  {series.number_of_episodes} Episodes
                </span>

              </div>

              <p className="mt-6 text-gray-300 leading-relaxed">
                {series.overview ||
                  "No overview available."}
              </p>

              {/* Overall Progress */}

              {totalEpisodes > 0 &&
                totalWatchedEpisodes > 0 && (
                  <div className="mt-6 max-w-md">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-sm text-gray-400">
                        Overall Progress
                      </span>

                      <span className="text-sm text-gray-500">
                        {totalWatchedEpisodes} /{" "}
                        {totalEpisodes} episodes
                      </span>

                    </div>

                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">

                      <div
                        className={`h-full rounded-full transition-all duration-300 ${isSeriesCompleted
                          ? "bg-green-500"
                          : "bg-red-600"
                          }`}
                        style={{
                          width: `${overallProgress}%`,
                        }}
                      />

                    </div>

                    <p
                      className={`text-xs mt-2 ${isSeriesCompleted
                        ? "text-green-400"
                        : "text-gray-500"
                        }`}
                    >
                      {isSeriesCompleted
                        ? "Series completed"
                        : `${overallProgress}% completed`}
                    </p>

                  </div>
                )}

              {/* Action Buttons */}

              <div className="flex flex-wrap gap-3 mt-7">

                <button
                  onClick={() => {
                    if (isInWatchList) {
                      dispatch(
                        removeFromWatchlist(series.id),
                      );
                    } else {
                      dispatch(
                        addToWatchlist({
                          ...series,
                          media_type: "tv",
                        }),
                      );
                    }
                  }}
                  className={`px-5 py-3 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${isInWatchList
                    ? "bg-green-600 text-white hover:bg-green-700 border border-green-500"
                    : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                >
                  {isInWatchList
                    ? "✓ In Watchlist"
                    : "+ Add to Watchlist"}
                </button>

                <button
                  onClick={() => {
                    if (isFavorite) {
                      dispatch(
                        removeFromFavorites(series.id),
                      );
                    } else {
                      dispatch(
                        addToFavorites({
                          ...series,
                          media_type: "tv",
                        }),
                      );
                    }
                  }}
                  className={`px-5 py-3 rounded-lg border font-semibold transition cursor-pointer flex items-center gap-2 ${isFavorite
                    ? "bg-red-600 text-white border-red-500 hover:bg-red-700"
                    : "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"
                    }`}
                >
                  {isFavorite
                    ? "♥ Favorited"
                    : "♥ Add to Favorites"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          EPISODES
      ===================================================== */}

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-8">

        <div className="mb-4">

          <h2 className="text-2xl font-bold">
            Episodes
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Track each episode you have watched.
          </p>

        </div>

        {/* Seasons */}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">

          {series.seasons
            ?.filter(
              (season) => season.season_number > 0,
            )
            .map((season) => (

              <button
                key={season.id}
                onClick={() =>
                  setSelectedSeason(
                    season.season_number,
                  )
                }
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${selectedSeason ===
                  season.season_number
                  ? "bg-red-600 text-white"
                  : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
              >
                Season {season.season_number}
              </button>

            ))}

        </div>

        {/* Current Season Progress */}

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">

          <div className="flex items-center justify-between mb-2">

            <span className="text-sm font-medium">
              Season {selectedSeason}
            </span>

            <span className="text-xs text-gray-500">
              {seasonWatchedCount} /{" "}
              {episodes.length} watched
            </span>

          </div>

          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">

            <div
              className={`h-full rounded-full transition-all duration-300 ${seasonProgress === 100
                ? "bg-green-500"
                : "bg-red-600"
                }`}
              style={{
                width: `${seasonProgress}%`,
              }}
            />

          </div>

          <p
            className={`text-xs mt-2 ${seasonProgress === 100
              ? "text-green-400"
              : "text-gray-500"
              }`}
          >
            {seasonProgress === 100
              ? "Season completed"
              : `${seasonProgress}% of this season watched`}
          </p>

        </div>

        {/* Episodes */}

        {episodeLoading ? (

          <div className="flex justify-center py-10">

            <p className="text-gray-500 text-sm">
              Loading episodes...
            </p>

          </div>

        ) : episodes.length === 0 ? (

          <div className="text-center py-10">

            <p className="text-gray-500">
              No episodes available.
            </p>

          </div>

        ) : (

          <div className="space-y-2">

            {episodes.map((episode) => {

              const isEpWatched =
                !!watchedEpisodes[episode.id];

              return (

                <div
                  key={episode.id}
                  className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2.5 hover:border-gray-700 transition"
                >

                  {/* Episode Number */}

                  <div className="w-8 h-8 shrink-0 rounded-md bg-gray-800 flex items-center justify-center">

                    <span className="text-xs font-semibold">
                      {episode.episode_number}
                    </span>

                  </div>

                  {/* Episode Details */}

                  <div className="flex-1 min-w-0">

                    <h3 className="text-sm font-medium truncate">
                      {episode.name}
                    </h3>

                    <p className="text-xs text-gray-600 truncate mt-1">
                      {episode.air_date ||
                        "No air date"}{" "}
                      •{" "}
                      {episode.runtime
                        ? `${episode.runtime} min`
                        : "Runtime N/A"}
                    </p>

                  </div>

                  {/* Watched Button */}

                  <button
                    onClick={() =>
                      handleEpisodeWatched(
                        episode.id,
                      )
                    }
                    className={`shrink-0 px-3 py-1.5 rounded-md border text-xs font-medium transition cursor-pointer ${isEpWatched
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    {isEpWatched
                      ? "✓ Watched"
                      : "+ Mark Watched"}
                  </button>

                </div>

              );
            })}

          </div>

        )}

      </section>

    </div>
  );
};

export default SeriesDetails;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SeriesDetails = () => {
  const { id } = useParams();

  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loading, setLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // ================= SERIES DETAILS =================

  useEffect(() => {
    const getSeriesDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`,
        );

        const data = await response.json();

        setSeries(data);

        // Select first available season
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

  // ================= EPISODES =================

  useEffect(() => {
    if (!series) return;

    const getEpisodes = async () => {
      setEpisodeLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${API_KEY}&language=en-US`,
        );

        const data = await response.json();

        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setEpisodes([]);
      } finally {
        setEpisodeLoading(false);
      }
    };

    getEpisodes();
  }, [id, selectedSeason, series, API_KEY]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">Loading series...</p>
      </div>
    );
  }

  // ================= NOT FOUND =================

  if (!series) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Series not found</h1>

        <Link
          to="/series"
          className="mt-4 text-red-500 hover:text-red-400 no-underline"
        >
          ← Back to Series
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative min-h-[550px] overflow-hidden">
        {/* Background */}
        {series.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
            alt={series.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/40" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
          {/* Back */}
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

            {/* Series Details */}
            <div className="max-w-2xl flex flex-col justify-center">
              <p className="text-red-500 text-sm font-semibold mb-3">
                TV SERIES
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {series.name}
              </h1>

              {/* Meta */}
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

              {/* Overview */}
              <p className="mt-6 text-gray-300 leading-relaxed">
                {series.overview || "No overview available."}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-7">
                <button className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                  + Add to Watchlist
                </button>

                <button className="px-5 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-200 font-semibold hover:bg-gray-800 transition">
                  ♥ Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Episodes</h2>

          <p className="text-sm text-gray-500 mt-1">
            Track each episode you have watched.
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {series.seasons
            ?.filter((season) => season.season_number > 0)
            .map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.season_number)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedSeason === season.season_number
                    ? "bg-red-600 text-white"
                    : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                Season {season.season_number}
              </button>
            ))}
        </div>

        {/* Progress */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Season {selectedSeason}</span>

            <span className="text-xs text-gray-500">
              0 / {episodes.length} watched
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Episode Loading */}
        {episodeLoading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-500 text-sm">Loading episodes...</p>
          </div>
        ) : episodes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No episodes available.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {episodes.map((episode) => (
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

                {/* Episode Information */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">
                    {episode.name}
                  </h3>

                  <p className="text-xs text-gray-600 truncate mt-1">
                    {episode.air_date || "No air date"}
                    {" • "}
                    {episode.runtime ? `${episode.runtime} min` : "Runtime N/A"}
                  </p>
                </div>

                {/* Watched Button */}
                <button className="shrink-0 px-3 py-1.5 rounded-md border border-gray-700 text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition">
                  ✓ Watched
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================================= */}
      {/* SERIES INFORMATION - NORMAL SIZE */}
      {/* ================================================= */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <h2 className="text-2xl font-bold mb-5">Series Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Status</p>

            <p className="text-white font-semibold mt-2">
              {series.status || "N/A"}
            </p>
          </div>

          {/* First Air Date */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">First Air Date</p>

            <p className="text-white font-semibold mt-2">
              {series.first_air_date || "N/A"}
            </p>
          </div>

          {/* Last Air Date */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Last Air Date</p>

            <p className="text-white font-semibold mt-2">
              {series.last_air_date || "N/A"}
            </p>
          </div>

          {/* Language */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Language</p>

            <p className="text-white font-semibold mt-2 uppercase">
              {series.original_language || "N/A"}
            </p>
          </div>

          {/* Type */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Type</p>

            <p className="text-white font-semibold mt-2">
              {series.type || "N/A"}
            </p>
          </div>

          {/* Total Episodes */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Total Episodes</p>

            <p className="text-white font-semibold mt-2">
              {series.number_of_episodes || "N/A"}
            </p>
          </div>

          {/* Total Seasons */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Total Seasons</p>

            <p className="text-white font-semibold mt-2">
              {series.number_of_seasons || "N/A"}
            </p>
          </div>

          {/* Rating */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">TMDB Rating</p>

            <p className="text-yellow-400 font-semibold mt-2">
              ★ {series.vote_average?.toFixed(1)} / 10
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* GENRES - NORMAL SIZE */}
      {/* ================================================= */}

      {series.genres?.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Genres</h2>

            <div className="flex flex-wrap gap-2">
              {series.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SeriesDetails;

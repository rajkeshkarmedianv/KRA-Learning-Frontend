/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/app/components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("batman");
  const [sortBy, setSortBy] = useState("title");
  const [filterYear, setFilterYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, currentPage]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchQuery}&apikey=84fd40d7&page=${currentPage}`
      );
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
        setTotalPages(Math.ceil(parseInt(data.totalResults || 10) / itemsPerPage));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMovies();
  };

  const getFilteredAndSortedMovies = () => {
    let filtered = [...movies];

    // Filter by year
    if (filterYear !== "all") {
      filtered = filtered.filter((movie) => movie.Year === filterYear);
    }

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.Title.localeCompare(b.Title);
        case "year-asc":
          return parseInt(a.Year) - parseInt(b.Year);
        case "year-desc":
          return parseInt(b.Year) - parseInt(a.Year);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredMovies = getFilteredAndSortedMovies();
  const uniqueYears = [...new Set(movies.map((m) => m.Year))].sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
  const totalFilteredPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-amber-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            🎬 MovieMart
          </h1>
          <p className="text-gray-300 text-lg">Discover your next favorite movie</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl border border-white/20 animate-slide-down">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="flex-1 min-w-50 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-linear-to-r from-amber-400 to-pink-500 text-white font-semibold rounded-lg hover:from-amber-500 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                🔍 Search
              </button>
            </div>
          </form>

          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-50">
              <label className="block text-white/80 text-sm mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              >
                <option value="title">Title (A-Z)</option>
                <option value="year-asc">Year (Oldest First)</option>
                <option value="year-desc">Year (Newest First)</option>
              </select>
            </div>

            <div className="flex-1 min-w-50">
              <label className="block text-white/80 text-sm mb-2">Filter by Year</label>
              <select
                value={filterYear}
                onChange={(e) => {
                  setFilterYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              >
                <option value="all">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
          </div>
        ) : paginatedMovies.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-gray-300 text-xl">No movies found. Try a different search!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedMovies.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalFilteredPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 animate-fade-in">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  ← Prev
                </button>

                {[...Array(totalFilteredPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalFilteredPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                          currentPage === page
                            ? "bg-linear-to-r from-amber-400 to-pink-500 text-white shadow-lg"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-white/50">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalFilteredPages, prev + 1))
                  }
                  disabled={currentPage === totalFilteredPages}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  Next →
                </button>
              </div>
            )}

            <div className="text-center mt-4 text-white/60 text-sm">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredMovies.length)} of{" "}
              {filteredMovies.length} movies
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

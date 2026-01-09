/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import MovieCard from "@/app/components/MovieCard";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterYear, setFilterYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedFavorites = useMemo(() => {
    let filtered = [...favorites];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.Year.includes(searchQuery)
      );
    }

    // Year filter
    if (filterYear !== "all") {
      filtered = filtered.filter((movie) => movie.Year === filterYear);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.Title.localeCompare(b.Title);
        case "year-asc":
          return parseInt(a.Year) - parseInt(b.Year);
        case "year-desc":
          return parseInt(b.Year) - parseInt(a.Year);
        case "added-desc":
          return 0; // Keep original order (most recently added first)
        default:
          return 0;
      }
    });

    return filtered;
  }, [favorites, searchQuery, sortBy, filterYear]);

  const uniqueYears = useMemo(
    () => [...new Set(favorites.map((m) => m.Year))].sort((a, b) => parseInt(b) - parseInt(a)),
    [favorites]
  );

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedFavorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFavorites = filteredAndSortedFavorites.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterYear, sortBy]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-pink-500 via-red-500 to-amber-400 bg-clip-text text-transparent animate-gradient">
            ❤️ Your Favorites
          </h1>
          <p className="text-gray-300 text-lg">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">💔</div>
            <p className="text-gray-300 text-xl mb-4">No favorite movies added yet.</p>
            <p className="text-gray-400">Start adding movies to your favorites!</p>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl border border-white/20 animate-slide-down">
              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2">Search Favorites</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by title or year..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-50">
                  <label className="block text-white/80 text-sm mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                  >
                    <option value="title">Title (A-Z)</option>
                    <option value="year-asc">Year (Oldest First)</option>
                    <option value="year-desc">Year (Newest First)</option>
                    <option value="added-desc">Recently Added</option>
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
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
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

            {/* Movies Grid */}
            {paginatedFavorites.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-gray-300 text-xl">No favorites match your search criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedFavorites.map((movie, index) => (
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
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8 animate-fade-in">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                      ← Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                              currentPage === page
                                ? "bg-linear-to-r from-pink-500 to-red-500 text-white shadow-lg"
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
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                      Next →
                    </button>
                  </div>
                )}

                <div className="text-center mt-4 text-white/60 text-sm">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedFavorites.length)}{" "}
                  of {filteredAndSortedFavorites.length} favorites
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

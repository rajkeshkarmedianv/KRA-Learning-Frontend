"use client";
/* eslint-disable @next/next/no-img-element */

import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "@/app/store/features/favorites/favoriteSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-white/20">
      <div className="relative overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
          alt={movie.Title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            {movie.Year}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-14 group-hover:text-amber-600 transition-colors">
          {movie.Title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
          <span className="text-amber-500">📅</span>
          <span className="font-medium">Year: {movie.Year}</span>
        </p>

        <button
          onClick={() =>
            isFav
              ? dispatch(removeFavorite(movie.imdbID))
              : dispatch(addFavorite(movie))
          }
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
            isFav
              ? "bg-linear-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/50"
              : "bg-linear-to-r from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800 hover:shadow-slate-500/50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {isFav ? (
              <>
                <span className="animate-pulse">💔</span>
                <span>Remove Favorite</span>
              </>
            ) : (
              <>
                <span>❤️</span>
                <span>Add to Favorites</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

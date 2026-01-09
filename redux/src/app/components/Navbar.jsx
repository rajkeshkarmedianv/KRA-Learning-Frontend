"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const count = useSelector((state) => state.favorites.items.length);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg text-white shadow-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold bg-linear-to-r from-amber-400 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          🎬 MovieMart
        </Link>

        <nav className="flex gap-6 md:gap-8 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-amber-400 transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/"
            className="hover:text-amber-400 transition-colors duration-300 relative group"
          >
            Movies
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/favorites"
            className="relative hover:text-pink-400 transition-all duration-300 group"
          >
            <span className="relative">
              Favorites
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
            </span>
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-linear-to-r from-red-500 to-pink-500 text-xs px-2 py-1 rounded-full animate-pulse shadow-lg font-bold min-w-5 text-center">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/"
            className="hover:text-amber-400 transition-colors duration-300 relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-slate-900 to-black text-gray-300 mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold bg-linear-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent mb-3">
            🎬 MovieMart
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop movie discovery platform. Find, save, and explore your favorite films.
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 w-fit">
              Home
            </Link>
            <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 w-fit">
              Movies
            </Link>
            <Link href="/favorites" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 w-fit">
              Favorites
            </Link>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h4 className="text-white font-semibold mb-4 text-lg">Follow Us</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 w-fit">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 w-fit">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 w-fit">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-6 border-t border-gray-800/50 text-gray-500">
        © {new Date().getFullYear()} MovieMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

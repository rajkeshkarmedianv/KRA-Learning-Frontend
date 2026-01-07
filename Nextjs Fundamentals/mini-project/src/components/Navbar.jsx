'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex items-center justify-center gap-10 h-16 font-semibold">
          
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-yellow-300" : "text-white"
              } hover:text-orange-300 transition`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/destination"
              className={`${
                pathname === "/destination" ? "text-yellow-300" : "text-white"
              } hover:text-orange-300 transition`}
            >
              Destination
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={`${
                pathname === "/about" ? "text-yellow-300" : "text-white"
              } hover:text-orange-300 transition`}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className={`${
                pathname === "/contact" ? "text-yellow-300" : "text-white"
              } hover:text-orange-300 transition`}
            >
              Contact
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

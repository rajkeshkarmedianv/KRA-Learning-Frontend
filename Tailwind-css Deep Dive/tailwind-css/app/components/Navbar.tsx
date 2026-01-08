import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Mini UI</h1>

      <div className="space-x-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/blogs" className="hover:text-blue-600">
          Blogs
        </Link>
        <Link href="/products" className="hover:text-blue-600">
          Products
        </Link>
      </div>
    </nav>
  );
}

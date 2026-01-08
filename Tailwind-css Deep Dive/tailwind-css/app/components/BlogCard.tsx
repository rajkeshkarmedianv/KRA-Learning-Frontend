import { Blog } from "@/app/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
      <h2 className="text-xl font-semibold mb-2">
        {blog.title}
      </h2>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {blog.description}
      </p>

      <button className="text-blue-600 font-medium hover:underline">
        Read More →
      </button>
    </div>
  );
}

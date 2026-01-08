import BlogCard from "@/app/components/BlogCard";
import { Blog } from "@/app/types/blog";

const blogs: Blog[] = [
  {
    id: 1,
    title: "Learning Next.js",
    description: "Next.js makes React apps faster with SSR and routing.",
  },
  {
    id: 2,
    title: "Tailwind CSS Tips",
    description: "Utility-first CSS framework for rapid UI development.",
  },
  {
    id: 3,
    title: "Why Developers Love UI",
    description: "Good UI improves user experience and engagement.",
  },
];

export default function BlogsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Latest Blogs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

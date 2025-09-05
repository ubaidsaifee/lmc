// app/blogs/page.jsx

"use client";
import { useState } from 'react';
import Link from 'next/link';
import { posts } from './data'; // <-- Import data from our new central file

const BlogPage = () => {
  const [visiblePosts, setVisiblePosts] = useState(6);

  const showMorePosts = () => {
    setVisiblePosts(posts.length);
  };

  return (
    <main className="bg-gray-50">
      <div className="text-center py-16 bg-white border-b">
        <h1 className="text-5xl font-extrabold text-gray-900">Our Blogs</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Insights, guides, and updates on taxation, compliance, and business registration in India.
        </p>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.slice(0, visiblePosts).map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="block group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <p className="text-sm font-semibold text-blue-600">{post.category}</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">{post.title}</h2>
                <p className="mt-3 text-gray-600">{post.excerpt}</p>
                <div className="mt-6 flex items-center">
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <span className="mx-2 text-gray-400">&middot;</span>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {visiblePosts < posts.length && (
          <div className="text-center mt-12">
            <button
              onClick={showMorePosts}
              className="bg-blue-800 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-900 transition-colors text-lg"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
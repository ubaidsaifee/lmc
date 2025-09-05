// app/blogs/[slug]/page.jsx

"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { posts } from '../data'; // <-- Import data from our new central file

const BlogPostPage = () => {
  const { slug } = useParams();

  // Find the specific blog post data that matches the slug from the URL
  const post = posts.find((p) => p.slug === slug);

  // If no post is found for the slug, render a "not-found" message
  if (!post) {
    return (
      <main className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold">Blog Post Not Found</h1>
          <p className="mt-4">Sorry, we couldn't find the post you're looking for.</p>
          <div className="text-center mt-8">
            <Link href="/blogs" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-900 transition-colors">
                &larr; Back to All Posts
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Use the 'post' object to render the content dynamically
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <header className="text-center mb-12">
            <p className="text-base font-semibold text-blue-600">{post.category}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Posted on <time dateTime={post.date}>{post.date}</time> by {post.author}
            </p>
          </header>

          {/* DYNAMIC IMAGE: Use the image from the post data */}
          <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg shadow-lg mb-12" />

          {/* DYNAMIC CONTENT: Render the post's content */}
          <div 
            className="prose prose-lg max-w-none mx-auto text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        <div className="text-center mt-16">
            <Link href="/blogs" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-900 transition-colors">
                &larr; Back to All Posts
            </Link>
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { usePosts } from "../context/PostContext"; // Assuming you have a PostContext

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    const loadPosts = async () => {
      await fetchPosts();
      setLoading(false);
    };
    loadPosts();
  }, [fetchPosts]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Your WordPress Clone
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore the latest posts from our community
        </p>
      </header>

      <main>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              date={post.date}
              category={post.category}
              tags={post.tags}
              featuredImage={post.featuredImage}
            />
          ))}
        </section>
      </main>

      <footer className="mt-6 text-center">
        <Link
          to="/posts"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          See All Posts
        </Link>
      </footer>
    </div>
  );
};

export default Home;

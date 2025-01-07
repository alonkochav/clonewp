import React, { useState, useEffect } from "react";
import postService from "../services/postService"; // Adjust the path as necessary

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  date: string;
  categoryId?: number;
  tags?: string[];
  featuredImage?: string;
}

const PostsPage: React.FC = () => {
  // const [posts, setPosts] = useState<Post[] | undefined>();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default PostsPage;

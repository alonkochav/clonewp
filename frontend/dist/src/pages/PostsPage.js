import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import postService from "../services/postService"; // Adjust the path as necessary
import Post from "../components/Post";


const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  if (loading) return _jsx("div", { children: "Loading..." });
  if (error) return _jsxs("div", { children: ["Error: ", error] });
  return _jsx("div", {
    children: posts.map((post) =>
      _jsx("div", { children: post.title }, post.id)
    ),
  });
};
export default PostsPage;
//# sourceMappingURL=PostsPage.js

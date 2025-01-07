import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { usePosts } from "../context/PostContext"; // Assuming you have a PostContext
const Home = () => {
    const [loading, setLoading] = useState(true);
    const { posts, fetchPosts } = usePosts();
    useEffect(() => {
        const loadPosts = async () => {
            await fetchPosts();
            setLoading(false);
        };
        loadPosts();
    }, [fetchPosts]);
    if (loading) {
        return _jsx("div", { className: "text-center mt-10", children: "Loading..." });
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("header", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-800", children: "Welcome to Your WordPress Clone" }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Explore the latest posts from our community" })] }), _jsx("main", { children: _jsx("section", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: posts.map((post) => (_jsx(Post, { id: post.id, title: post.title, content: post.content, author: post.author, date: post.date, category: post.category, tags: post.tags, featuredImage: post.featuredImage }, post.id))) }) }), _jsx("footer", { className: "mt-6 text-center", children: _jsx(Link, { to: "/posts", className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300", children: "See All Posts" }) })] }));
};
export default Home;
//# sourceMappingURL=Home.js.map
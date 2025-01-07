import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
const Post = ({ id, title, content, author, date, category, tags, featuredImage, }) => {
    // Helper function to format the date (you might want a more robust date formatting utility)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    return (_jsxs("article", { className: "mb-8 bg-white shadow rounded-lg overflow-hidden", children: [featuredImage && (_jsx("img", { src: featuredImage, alt: title, className: "w-full h-64 object-cover" })), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: _jsx(Link, { to: `/post/${id}`, className: "text-blue-600 hover:text-blue-800", children: title }) }), _jsxs("div", { className: "text-sm text-gray-600 mb-4", children: [_jsxs("span", { children: ["By ", author] }), " - ", _jsx("span", { children: formatDate(date) }), category && _jsxs("span", { className: "ml-2", children: ["in ", category] })] }), _jsx("p", { className: "text-gray-700 mb-4 line-clamp-3", children: content }), tags && tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag, index) => (_jsxs("span", { className: "px-2 py-1 bg-gray-200 rounded text-xs text-gray-800", children: ["#", tag] }, index))) })), _jsx(Link, { to: `/post/${id}`, className: "text-blue-600 hover:text-blue-800 mt-4 inline-block", children: "Read More" })] })] }));
};
export default Post;
//# sourceMappingURL=Post.js.map
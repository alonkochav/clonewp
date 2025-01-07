import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
const AdminPanel = () => {
    // State hooks for managing local component state
    const [selectedTab, setSelectedTab] = useState("users");
    // Function to handle tab changes
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    return (_jsxs("div", { className: "p-4 bg-gray-100 min-h-screen flex flex-col", children: [_jsx("h1", { className: "text-2xl font-bold mb-4 text-gray-800", children: "Admin Panel" }), _jsxs("div", { className: "flex mb-4", children: [_jsx("button", { onClick: () => handleTabChange("users"), className: `px-4 py-2 mr-2 ${selectedTab === "users"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-700"} rounded`, children: "Users" }), _jsx("button", { onClick: () => handleTabChange("posts"), className: `px-4 py-2 ${selectedTab === "posts"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-700"} rounded`, children: "Posts" })] }), _jsxs("div", { className: "bg-white p-4 rounded shadow", children: [selectedTab === "users" && (_jsx("div", { children: _jsx("h2", { className: "text-lg font-semibold mb-2", children: "User Management" }) })), selectedTab === "posts" && (_jsx("div", { children: _jsx("h2", { className: "text-lg font-semibold mb-2", children: "Post Management" }) }))] }), _jsx("div", { className: "mt-4", children: _jsx(Link, { to: "/create-post", className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600", children: "Create New Post" }) })] }));
};
export default AdminPanel;
//# sourceMappingURL=AdminPanel.js.map
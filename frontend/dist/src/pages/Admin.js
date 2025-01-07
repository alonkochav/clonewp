import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";
import { useAuth } from "../context/AuthContext"; // Assuming you have an auth context
const Admin = () => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated || !user || user.role !== "admin") {
        return (_jsx("div", { className: "text-center mt-10", children: "Access Denied: You do not have permission to view this page." }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("header", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Admin Dashboard" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Welcome, ", user.username] }), _jsx(Link, { to: "/", className: "text-red-600 hover:text-red-800 underline", children: "Logout" })] })] }), _jsx("main", { children: _jsx(AdminPanel, {}) }), _jsx("footer", { className: "mt-6 text-center text-sm text-gray-500", children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Your WordPress Clone"] }) })] }));
};
export default Admin;
//# sourceMappingURL=Admin.js.map
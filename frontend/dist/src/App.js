import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PostsPage from "./pages/PostsPage";
import { PostProvider } from "./context/PostContext";
const App = () => {
    return (_jsx(PostProvider, { children: _jsx(Router, { children: _jsx("div", { className: "App min-h-screen bg-gray-100", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/admin", element: _jsx(Admin, {}) }), _jsx(Route, { path: "/posts", element: _jsx(PostsPage, {}) })] }) }) }) }));
};
export default App;
//# sourceMappingURL=App.js.map
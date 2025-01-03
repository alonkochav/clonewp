import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PostsPage from "./pages/PostsPage";
import { PostProvider } from "./context/PostContext";

const App: React.FC = () => {
  return (
    <PostProvider>
      <Router>
        <div className="App min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/posts" element={<PostsPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </PostProvider>
  );
};

export default App;

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

// Import any necessary custom components or hooks here
// e.g., import UserList from './UserList';
// import PostList from './PostList';

interface AdminPanelProps {
  // Define any props that might be passed to this component
}

const AdminPanel: React.FC<AdminPanelProps> = () => {
  // State hooks for managing local component state
  const [selectedTab, setSelectedTab] = useState<string>("users");

  // Function to handle tab changes
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h1>

      {/* Tab navigation */}
      <div className="flex mb-4">
        <button
          onClick={() => handleTabChange("users")}
          className={`px-4 py-2 mr-2 ${
            selectedTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } rounded`}
        >
          Users
        </button>
        <button
          onClick={() => handleTabChange("posts")}
          className={`px-4 py-2 ${
            selectedTab === "posts"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } rounded`}
        >
          Posts
        </button>
        {/* Add more tabs as needed */}
      </div>

      {/* Content based on selected tab */}
      <div className="bg-white p-4 rounded shadow">
        {selectedTab === "users" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">User Management</h2>
            {/* Here you might render a UserList component or directly list users */}
            {/* <UserList /> */}
          </div>
        )}
        {selectedTab === "posts" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Post Management</h2>
            {/* Here you might render a PostList component or directly list posts */}
            {/* <PostList /> */}
          </div>
        )}
      </div>

      {/* Admin actions or other utilities */}
      <div className="mt-4">
        <Link
          to="/create-post"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create New Post
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

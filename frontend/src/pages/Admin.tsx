import React from "react";
import { Link } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";
import { useAuth } from "../context/AuthContext"; // Assuming you have an auth context

const Admin: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user || user.role !== "admin") {
    return (
      <div className="text-center mt-10">
        Access Denied: You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {user.username}
          </span>
          <Link to="/" className="text-red-600 hover:text-red-800 underline">
            Logout
          </Link>
        </div>
      </header>

      <main>
        {/* AdminPanel component handles the main content */}
        <AdminPanel />
      </main>

      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Your WordPress Clone</p>
      </footer>
    </div>
  );
};

export default Admin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

interface PostFormProps {
  initialPost?: {
    id?: number;
    title: string;
    content: string;
    categoryId?: string | number | undefined;
  };
  onSubmit: (postData: {
    title: string;
    content: string;
    categoryId?: string | number | undefined;
  }) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  initialPost = { title: "", content: "", categoryId: undefined },
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  const [categoryId, setCategoryId] = useState(initialPost.categoryId || "");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      title,
      content,
      categoryId: categoryId ? parseInt(categoryId.toString(), 10) : undefined,
    });
    navigate("/admin"); // Redirect to admin panel or wherever appropriate after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={8}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a Category</option>
          {/* Here you would dynamically populate options from your categories */}
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialPost.id ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
const PostForm = ({
  initialPost = { title: "", content: "", categoryId: undefined },
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  const [categoryId, setCategoryId] = useState(initialPost.categoryId || "");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      content,
      categoryId: categoryId ? parseInt(categoryId.toString(), 10) : undefined,
    });
    navigate("/admin"); // Redirect to admin panel or wherever appropriate after submission
  };
  return _jsxs("form", {
    onSubmit: handleSubmit,
    className: "max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg",
    children: [
      _jsxs("div", {
        className: "mb-4",
        children: [
          _jsx("label", {
            htmlFor: "title",
            className: "block text-sm font-medium text-gray-700",
            children: "Title",
          }),
          _jsx("input", {
            type: "text",
            id: "title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            className:
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
            required: true,
          }),
        ],
      }),
      _jsxs("div", {
        className: "mb-4",
        children: [
          _jsx("label", {
            htmlFor: "content",
            className: "block text-sm font-medium text-gray-700",
            children: "Content",
          }),
          _jsx("textarea", {
            id: "content",
            value: content,
            onChange: (e) => setContent(e.target.value),
            className:
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
            rows: 8,
            required: true,
          }),
        ],
      }),
      _jsxs("div", {
        className: "mb-4",
        children: [
          _jsx("label", {
            htmlFor: "categoryId",
            className: "block text-sm font-medium text-gray-700",
            children: "Category",
          }),
          _jsxs("select", {
            id: "categoryId",
            value: categoryId,
            onChange: (e) => setCategoryId(e.target.value),
            className:
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
            children: [
              _jsx("option", { value: "", children: "Select a Category" }),
              _jsx("option", { value: "1", children: "Category 1" }),
              _jsx("option", { value: "2", children: "Category 2" }),
            ],
          }),
        ],
      }),
      _jsx("button", {
        type: "submit",
        className:
          "w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        children: initialPost.id ? "Update Post" : "Create Post",
      }),
    ],
  });
};
export default PostForm;
//# sourceMappingURL=PostForm.js.map

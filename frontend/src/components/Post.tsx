import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

interface PostProps {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date;
  categoryId?: string;
  tags?: string[];
  featuredImage?: string;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  content,
  author,
  date,
  categoryId,
  tags,
  featuredImage,
}) => {
  // Helper function to format the date (you might want a more robust date formatting utility)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="mb-8 bg-white shadow rounded-lg overflow-hidden">
      {featuredImage && (
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">
          <Link
            to={`/post/${id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {title}
          </Link>
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          <span>By {author}</span> - <span>{formatDate(date)}</span>
          {category && <span className="ml-2">in {category}</span>}
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{content}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/post/${id}`}
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default Post;

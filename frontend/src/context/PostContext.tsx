import axios from "axios";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface PostContextType {
  posts: Post[];
  currentPost: Post | null;
  setCurrentPost: (post: Post | null) => void;
  fetchPosts: () => Promise<void>;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  categoryId?: number;
  tags?: string[];
  featuredImage?: string;
  created_at: Date;
  updated_at: Date;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get<Post[]>("/posts"); // Replace with your actual endpoint
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      // Handle error appropriately, like setting an error state or showing a notification
    }
  }, []); // Empty dependency array if no dependencies, otherwise list them

  return (
    <PostContext.Provider
      value={{ posts, currentPost, setCurrentPost, fetchPosts }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};

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
  // Add other post properties as needed
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const fetchPosts = useCallback(async () => {
    // Here you would make an API call to fetch posts
    const fetchedPosts: Post[] = []; // Mock data or from API
    setPosts(fetchedPosts);
  }, []); // Empty array if no dependencies, otherwise list them

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

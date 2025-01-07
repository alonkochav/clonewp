import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, } from "react";
const PostContext = createContext(undefined);
export const PostProvider = ({ children, }) => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const fetchPosts = useCallback(async () => {
        try {
          const response = await axios.get<Post[]>('/api/posts'); // Replace with your actual endpoint
          setPosts(response.data);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
          // Handle error appropriately, like setting an error state or showing a notification
        }
      }, []); // Empty dependency array if no dependencies, otherwise list them
    return (_jsx(PostContext.Provider, { value: { posts, currentPost, setCurrentPost, fetchPosts }, children: children }));
};
export const usePosts = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePosts must be used within a PostProvider");
    }
    return context;
};
//# sourceMappingURL=PostContext.js.map
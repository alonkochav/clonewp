import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, } from "react";
const PostContext = createContext(undefined);
export const PostProvider = ({ children, }) => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const fetchPosts = useCallback(async () => {
        // Here you would make an API call to fetch posts
        const fetchedPosts = []; // Mock data or from API
        setPosts(fetchedPosts);
    }, []); // Empty array if no dependencies, otherwise list them
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
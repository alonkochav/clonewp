import axios, { AxiosResponse } from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  category_id?: number;
  created_at: string;
  updated_at: string;
}

interface PostResponse {
  data: Post[];
  pagination?: { current_page: number; total_pages: number };
}

// Adjust the base URL according to your backend server's address
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor to handle global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const postService = {
  getAllPosts: async (page = 1, limit = 10): Promise<PostResponse> => {
    const response: AxiosResponse<PostResponse> = await api.get("/posts", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response: AxiosResponse<Post> = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (
    post: Omit<Post, "id" | "created_at" | "updated_at">
  ): Promise<Post> => {
    const response: AxiosResponse<Post> = await api.post("/posts", post);
    return response.data;
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response: AxiosResponse<Post> = await api.put(`/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  // Example for adding a comment to a post
  addComment: async (
    postId: number,
    comment: { content: string }
  ): Promise<void> => {
    await api.post(`/posts/${postId}/comments`, comment);
  },
};

/*
Notes:
Environment Variables: The BASE_URL uses an environment variable REACT_APP_API_URL. This should be set in your .env file for different environments.
Typing: TypeScript interfaces (Post and PostResponse) are used to define the shape of the data. Adjust these according to your actual data structures.
Axios: It's assumed that you've installed axios (npm install axios @types/axios). If not, you'll need to do so for this service to work.
Error Handling: Basic error logging is implemented via an axios response interceptor. In a production app, you might want more detailed error handling, perhaps dispatching error messages to a global state or showing notifications.
Pagination: The getAllPosts function includes pagination parameters. You can adjust this according to your backend's API structure.
Authentication: If your API requires authentication, you would typically add an authorization header to each request or use axios interceptors to add tokens:
--
*/
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
/*
--
Service Usage: In your components or hooks, you would import this service and call these methods to interact with your backend:
--
import postService from './services/postService';

const fetchPosts = async () => {
    try {
        const posts = await postService.getAllPosts();
        // Handle posts
    } catch (error) {
        // Handle error
    }
};
--
Remember to handle the asynchronous nature of these calls properly, possibly using React's useEffect hook or custom hooks for fetching data.
*/

export default postService;

import { Dispatch } from 'redux';
import { Post, PostResponse } from '../../store/types'; // Assuming you have a types file with these interfaces defined

// Action types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

// Action creators
export const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST
});

export const fetchPostsSuccess = (posts: PostResponse) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts
});

export const fetchPostsFailure = (error: string) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error
});

export const fetchPostRequest = (id: number) => ({
    type: FETCH_POST_REQUEST,
    payload: id
});

export const fetchPostSuccess = (post: Post) => ({
    type: FETCH_POST_SUCCESS,
    payload: post
});

export const fetchPostFailure = (error: string) => ({
    type: FETCH_POST_FAILURE,
    payload: error
});

export const createPostRequest = (post: Omit<Post, 'id'>) => ({
    type: CREATE_POST_REQUEST,
    payload: post
});

export const createPostSuccess = (post: Post) => ({
    type: CREATE_POST_SUCCESS,
    payload: post
});

export const createPostFailure = (error: string) => ({
    type: CREATE_POST_FAILURE,
    payload: error
});

// Thunk action creator for fetching posts
export function fetchPosts(page = 1, limit = 10) {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            // Here you would call your API via the postService or directly with axios or fetch
            const response = await postService.getAllPosts(page, limit);
            dispatch(fetchPostsSuccess(response));
        } catch (error) {
            dispatch(fetchPostsFailure(error.message || 'An error occurred'));
        }
    }
}

// Thunk action creator for fetching a single post
export function fetchPost(id: number) {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPostRequest(id));
        try {
            const post = await postService.getPostById(id);
            dispatch(fetchPostSuccess(post));
        } catch (error) {
            dispatch(fetchPostFailure(error.message || 'An error occurred'));
        }
    }
}

// Thunk action creator for creating a post
export function createPost(post: Omit<Post, 'id'>) {
    return async (dispatch: Dispatch) => {
        dispatch(createPostRequest(post));
        try {
            const newPost = await postService.createPost(post);
            dispatch(createPostSuccess(newPost));
        } catch (error) {
            dispatch(createPostFailure(error.message || 'Failed to create post'));
        }
    }
}
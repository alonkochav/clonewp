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
export const fetchPostsSuccess = (posts) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts
});
export const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error
});
export const fetchPostRequest = (id) => ({
    type: FETCH_POST_REQUEST,
    payload: id
});
export const fetchPostSuccess = (post) => ({
    type: FETCH_POST_SUCCESS,
    payload: post
});
export const fetchPostFailure = (error) => ({
    type: FETCH_POST_FAILURE,
    payload: error
});
export const createPostRequest = (post) => ({
    type: CREATE_POST_REQUEST,
    payload: post
});
export const createPostSuccess = (post) => ({
    type: CREATE_POST_SUCCESS,
    payload: post
});
export const createPostFailure = (error) => ({
    type: CREATE_POST_FAILURE,
    payload: error
});
// Thunk action creator for fetching posts
export function fetchPosts(page = 1, limit = 10) {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            // Here you would call your API via the postService or directly with axios or fetch
            const response = await postService.getAllPosts(page, limit);
            dispatch(fetchPostsSuccess(response));
        }
        catch (error) {
            dispatch(fetchPostsFailure(error.message || 'An error occurred'));
        }
    };
}
// Thunk action creator for fetching a single post
export function fetchPost(id) {
    return async (dispatch) => {
        dispatch(fetchPostRequest(id));
        try {
            const post = await postService.getPostById(id);
            dispatch(fetchPostSuccess(post));
        }
        catch (error) {
            dispatch(fetchPostFailure(error.message || 'An error occurred'));
        }
    };
}
// Thunk action creator for creating a post
export function createPost(post) {
    return async (dispatch) => {
        dispatch(createPostRequest(post));
        try {
            const newPost = await postService.createPost(post);
            dispatch(createPostSuccess(newPost));
        }
        catch (error) {
            dispatch(createPostFailure(error.message || 'Failed to create post'));
        }
    };
}
//# sourceMappingURL=posts.js.map
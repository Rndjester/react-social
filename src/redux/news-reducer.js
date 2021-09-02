const ADD_POST = '/news/ADD-POST'
const UPDATE_POST_AREA = '/news/UPDATE-POST-AREA'
const DELETE_POST = '/news/DELETE_POST'

let initialState = {
    posts: [
        {id: 1, message: "Hi, whats app", likes: 12},
        {id: 2, message: "First mess", likes: 11},
        {id: 3, message: "Nice day", likes: 3},
        {id: 4, message: "Let's end this site", likes: 7}
    ],
    textareaValue: ''
}

const newsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: state.posts.length + 1,
                    message: state.textareaValue,
                    likes: 0}],
                textareaValue: ''
            }
        case UPDATE_POST_AREA:
            return {
                ...state,
                textareaValue: action.value
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.id)
            }
        default:
            return state
    }
}
export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostAreaActionCreator = (text) => ({value: text, type: UPDATE_POST_AREA})
export const deletePost = (id) => ({type: DELETE_POST, id})

export default newsReducer
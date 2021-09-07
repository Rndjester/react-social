const ADD_POST = '/news/ADD-POST'
const UPDATE_POST_AREA = '/news/UPDATE-POST-AREA'
const DELETE_POST = '/news/DELETE_POST'

type PostsType = {
    id: number,
    message: string,
    likes: number
}

interface initialStateType {
    posts: Array<PostsType>,
    textareaValue: string
}

let initialState: initialStateType = {
    posts: [
        {id: 1, message: "Hi, whats app", likes: 12},
        {id: 2, message: "First mess", likes: 11},
        {id: 3, message: "Nice day", likes: 3},
        {id: 4, message: "Let's end this site", likes: 7}
    ],
    textareaValue: ''
}

const newsReducer = (state = initialState, action: any): initialStateType => {
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

type UpdatePostAreaActionCreatorType = {
    value: string,
    type: typeof UPDATE_POST_AREA
}

type DeletePostType = {
    type: typeof DELETE_POST,
    id: number
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostAreaActionCreator = (text: string): UpdatePostAreaActionCreatorType => ({value: text, type: UPDATE_POST_AREA})
export const deletePost = (id: number): DeletePostType => ({type: DELETE_POST, id})

export default newsReducer
import newsReducer, {addPostActionCreator, deletePost} from "./news-reducer";

let initialState = {
    posts: [
        {id: 1, message: "Hi, whats app", likes: 12},
        {id: 2, message: "First mess", likes: 11},
        {id: 3, message: "Nice day", likes: 3},
        {id: 4, message: "Let's end this site", likes: 7}
    ],
    textareaValue: ''
}

it ('increment posts', () => {
    let action = addPostActionCreator('pes')
    let newState = newsReducer(initialState, action)
    expect(newState.posts.length).toBe(5)
});

it ('length after deleting should be decrement', () => {
    let action = deletePost(1)
    let newState = newsReducer(initialState, action)
    expect(newState.posts.length).toBe(3)
});


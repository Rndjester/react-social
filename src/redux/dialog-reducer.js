const ADD_MESSAGE = "ADD-MESSAGE"

let initialState = {
    users: [
        {name:'Дима', id: '1', avatar: null },
        {name:'Юля', id: '2', avatar: null},
        {name:'Вероника', id:'3', avatar: null},
        {name: 'Женя', id: '4', avatar: null}
    ],
    messages: [
        {text:'Привет', id: '1' },
        {text:'Все хорошо', id: '2' },
        {text:'Как дела?', id:'3' },
        {text: 'Отлично', id: '4'}
    ],
}

const dialogReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    text: action.message,
                    id: state.messages.length + 1
                }]
            }

        default:
            return {...state}
    }
}
export const addMessage = (message) => ({type: ADD_MESSAGE, message})

export default dialogReducer
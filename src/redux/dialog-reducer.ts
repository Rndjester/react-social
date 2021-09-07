const ADD_MESSAGE = "ADD-MESSAGE"

interface initialStateType {
    users: Array<usersType>
    messages: Array<messagesType>
}

interface usersType {
    name: string,
    id: number,
    avatar?: string | null
}

interface messagesType {
    text: string,
    id: number | string,
}


let initialState: initialStateType = {
    users: [
        {name:'Дима', id: 1, avatar: null },
        {name:'Юля', id: 2, avatar: null},
        {name:'Вероника', id: 3, avatar: null},
        {name: 'Женя', id: 4, avatar: null}
    ],
    messages: [
        {text:'Привет', id: 1 },
        {text:'Все хорошо', id: 2 },
        {text:'Как дела?', id: 3 },
        {text: 'Отлично', id: 4}
    ],
}

const dialogReducer = (state = initialState, action: any): initialStateType => {
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

type addMessageType = {
    type: typeof ADD_MESSAGE,
    message: string
}

export const addMessage = (message: string): addMessageType => ({type: ADD_MESSAGE, message})

export default dialogReducer
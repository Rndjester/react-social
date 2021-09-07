import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED: string = 'SET_INITIALIZED'

type initialStateType = {
    initialized: boolean
}
type initializedSuccessActionType = {
    type: typeof SET_INITIALIZED
}

let initialState: initialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {

            return {
                ...state,
                initialized: true
            }
        }
        default: return state
    }
}

export const setInitializedSuccess = ():initializedSuccessActionType => ({type: SET_INITIALIZED})

export const initializedAPP = () => (dispatch: any) => {
    let dispatchRes = dispatch(getAuthUserData())
    Promise.all([dispatchRes])
        .then(() => {
            dispatch(setInitializedSuccess())
        })

}

export default appReducer
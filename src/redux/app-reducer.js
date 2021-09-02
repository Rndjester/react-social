import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
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

export const setInitializedSuccess = () => ({type: SET_INITIALIZED})

export const initializedAPP = () => (dispatch) => {
    let dispatchRes = dispatch(getAuthUserData())
    Promise.all([dispatchRes])
        .then(() => {
            dispatch(setInitializedSuccess())
        })

}

export default appReducer
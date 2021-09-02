import {applyMiddleware, combineReducers, createStore} from "redux";
import newsReducer from "./news-reducer";
import dialogReducer from "./dialog-reducer";
import friendsReducer from "./friends-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from 'redux-thunk'
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";

let reducers = combineReducers({
    newsPage: newsReducer,
    dialogPage: dialogReducer,
    friendsPage: friendsReducer,
    profilePage: profileReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));



export default store

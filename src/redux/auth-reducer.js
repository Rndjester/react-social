import {securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {push} from "react-router-redux";

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default: return state
    }
}
export const setUserData = (userId, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
)
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: captchaUrl})


export const getAuthUserData = () => async (dispatch) => {
    let data = await usersAPI.authMe()
    if (data.resultCode === 0) {
        let {id, login, email} = (data.data)
        dispatch(setUserData(id, email, login, true))
    }
}

export const sendLoginData = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await usersAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        dispatch(stopSubmit("login", {_error: response.data.messages}))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const sendLogout = () => async (dispatch) => {
    let response = await usersAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
        dispatch(push('/'));
    }
}

export default authReducer


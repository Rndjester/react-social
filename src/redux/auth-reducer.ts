import {securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {push} from "react-router-redux";

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

export type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: null
}
export type setUserDataPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
export type setUserDataType = {
    type: typeof SET_USER_DATA,
    payload: setUserDataPayloadType
}
export type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl: string
    }
}

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: initialStateType = initialState, action: any): initialStateType => {
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
export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):setUserDataType => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
)
export const getCaptchaUrlSuccess = (captchaUrl:string):{ payload: string; type: string } => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: captchaUrl
}
    )


export const getAuthUserData = () => async (dispatch:any) => {
    let data = await usersAPI.authMe()
    if (data.resultCode === 0) {
        let {id, login, email} = (data.data)
        dispatch(setUserData(id, email, login, true))
    }
}

export const sendLoginData = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const sendLogout = () => async (dispatch: any) => {
    let response = await usersAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
        dispatch(push('/'));
    }
}

export default authReducer;
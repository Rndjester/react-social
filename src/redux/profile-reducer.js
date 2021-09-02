import {profileAPI} from "../api/api";
import {getState} from "../App";
import {stopSubmit} from "redux-form";

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = 'SET_PHOTO'
const SET_PROFILE = 'SET_PROFILE'

let initialState = {
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE: {

            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case SET_PROFILE: {
            return {
                ...state,
                profile: {...action.profile}
            }
        }
        default: return state
    }
}

export default profileReducer

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const setPhoto = (photos) => ({type: SET_PHOTO, photos})


export const getUserProfile = (userId) => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateUserStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (photo) => async(dispatch) => {
    let response = await profileAPI.loadPhoto(photo)
    let data = await response.data
    if (data.resultCode === 0) {
        dispatch(setPhoto(data.data.photos))
    }
}
export const saveProfile = (profile) => async(dispatch) => {
    const userId = getState().auth.userId
    let response = await profileAPI.loadProfileInfo(profile)
    let data = await response.data
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else {
        dispatch(stopSubmit("profile", {_error: response.data.messages}))
    }
}

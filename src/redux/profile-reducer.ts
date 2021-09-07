import {profileAPI} from "../api/api";
import {getState} from "../App";
import {stopSubmit} from "redux-form";

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = 'SET_PHOTO'
const SET_PROFILE = 'SET_PROFILE'

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}

type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType
    photos: PhotosType
}

interface initialStateInterface {
    profile: null | ProfileType,
    status: string
}

let initialState: initialStateInterface = {
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action: any): initialStateInterface => {
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
                profile: {...state.profile, photos: action.photos } as ProfileType
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

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
type SetPhotoType = {
    type: typeof SET_PHOTO,
    photos: PhotosType
}


export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})
export const setPhoto = (photos: PhotosType): SetPhotoType => ({type: SET_PHOTO, photos})


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status)
    if (data.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (photo: string) => async(dispatch: any) => {
    let response = await profileAPI.loadPhoto(photo)
    let data = await response.data
    if (data.resultCode === 0) {
        dispatch(setPhoto(data.data.photos))
    }
}
export const saveProfile = (profile: string) => async(dispatch: any) => {
    const userId: any = getState().auth.userId
    let response = await profileAPI.loadProfileInfo(profile)
    let data = await response.data
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else {
        dispatch(stopSubmit("profile", {_error: response.data.messages}))
    }
}

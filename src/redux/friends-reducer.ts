import {usersAPI} from "../api/api";
import {updateObjInArray} from "../helpers/helpers-function";
import {PhotosType} from "./profile-reducer";

const FOLLOW: string = 'FOLLOW'
const UNFOLLOW: string = 'UNFOLLOW'
const SET_USERS: string = 'SET_USERS'
const SET_CURRENT_PAGE: string = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT: string = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING: string = 'TOGGLE_FETCHING'
const FOLLOWING_PROGRESS_FETCHING: string = 'FOLLOWING_PROGRESS_FETCHING'

interface initialStateType {
    users: Array<Users>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    portionSize: number,
    isFetching: boolean,
    followingProgress: []
}

type Users = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}

let initialState: initialStateType = {
    users: [],
    pageSize: 15,
    totalUsersCount: 100,
    currentPage: 1,
    portionSize: 10,
    isFetching: false,
    followingProgress: []
}

const friendsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case FOLLOW:
            return  {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', {follow: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', {follow: false})
            }
        case SET_USERS: {

            return  {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return  {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching

            }
        }
        case FOLLOWING_PROGRESS_FETCHING: {
            return {
                ...state,
                followingProgress: action.fetching ?
                    [...state.followingProgress, action.userId]:
                    [...state.followingProgress.filter(id => id !== action.userId)]
            }
        }
        default:
            return state
    }
}

type FollowType = {
    type: typeof FOLLOW,
    userId: number
}
export const follow = (userId: number): FollowType => ({type: FOLLOW, userId })
type UnFollowType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unFollow = (userId: number): UnFollowType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<Users>
}
export const setUsers = (users: Array<Users>): SetUsersType => ({type: SET_USERS, users})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE , currentPage})
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING,
    isFetching: boolean
}
export const toggleFetching = (fetching: boolean): ToggleFetchingType => ({type: TOGGLE_FETCHING, isFetching: fetching})
type ToggleFollowingProgressType = {
    type: typeof FOLLOWING_PROGRESS_FETCHING,
    fetching: boolean
    userId: number
}
export const toggleFollowingProgress = (fetching: boolean, userId: number): ToggleFollowingProgressType => ({type: FOLLOWING_PROGRESS_FETCHING, fetching: fetching, userId: userId})

export const getUsersTS = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleFetching(true))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setCurrentPage(page))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleFetching(false))
}
const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, id))
    dispatch(actionCreator(id))
    dispatch(toggleFollowingProgress(false, id))
}
export const unfollowTS = (id: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unFollow.bind(usersAPI), unFollow)
}
export const followTS = (id: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), follow)
}

export default friendsReducer
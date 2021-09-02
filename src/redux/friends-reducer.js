import {usersAPI} from "../api/api";
import {updateObjInArray} from "../helpers/helpers-function";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const FOLLOWING_PROGRESS_FETCHING = 'FOLLOWING_PROGRESS_FETCHING'

let initialState = {
    users: [],
    pageSize: 15,
    totalUsersCount: 100,
    currentPage: 1,
    portionSize: 10,
    isFetching: false,
    followingProgress: []
}

const friendsReducer = (state = initialState, action) => {
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

export const follow = (userId) => ({type: FOLLOW, userId })
export const unFollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE , currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleFetching = (fetching) => ({type: TOGGLE_FETCHING, isFetching: fetching})
export const toggleFollowingProgress = (fetching, userId) => ({type: FOLLOWING_PROGRESS_FETCHING, fetching: fetching, userId: userId})

export const getUsersTS = (page, pageSize) => async (dispatch) => {
    dispatch(toggleFetching(true))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setCurrentPage(page))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleFetching(false))
}
const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, id))
    // let response = await apiMethod(id)
    dispatch(actionCreator(id))
    dispatch(toggleFollowingProgress(false, id))
}
export const unfollowTS = (id) => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unFollow.bind(usersAPI), unFollow)
}
export const followTS = (id) => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), follow)
}

export default friendsReducer
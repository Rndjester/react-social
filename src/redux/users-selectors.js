import {createSelector} from 'reselect'

export const getUsers = (state) => {
    return state.friendsPage.users
}

export const getUserSuper = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state) => {
    return state.friendsPage.pageSize
}
export const getPortionSize = (state) => {
    return state.friendsPage.portionSize
}
export const getTotalUsersCount = (state) => {
    return state.friendsPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.friendsPage.currentPage
}
export const getIsFetching = (state) => {
    return state.friendsPage.isFetching
}
export const getFollowingProgress = (state) => {
    return state.friendsPage.followingProgress
}
import {connect} from "react-redux";
import {followTS, getUsersTS, unfollowTS} from "../../redux/friends-reducer";
import * as React from "react";
import Friends from "./Friends";
import './friends.css'
import Preloader from "../layout/preoladers/Preloader";
import {
    getCurrentPage,
    getFollowingProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount, getUserSuper
} from "../../redux/users-selectors";



class FriendsComponent extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersTS(currentPage, pageSize)
    }
    onSetPage = (p) => {
        const {pageSize} = this.props
        this.props.getUsersTS(p, pageSize)
    }

    render() {
        return (<>
            {this.props.isFetching?<Preloader/>:null}
            <Friends onSetPage = {this.onSetPage}
                         totalUsersCount = {this.props.totalUsersCount}
                         pageSize = {this.props.pageSize}
                         currentPage = {this.props.currentPage}
                         users={this.props.users}
                         isFetching={this.props.isFetching}
                         unfollowTS = {this.props.unfollowTS}
                         followTS = {this.props.followTS}
                         followingProgress = {this.props.followingProgress}
                         portionSize = {this.props.portionSize}
            />
        </>)
    }
}
let mapStateToProps = (state) => {
    return {
        portionSize: getPortionSize(state),
        users: getUserSuper(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}
let mapDispatchToProps = {
    getUsersTS, unfollowTS, followTS
}

let FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsComponent)

export default FriendsContainer
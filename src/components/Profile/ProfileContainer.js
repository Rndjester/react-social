import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import './profile.css'
import {withRouter} from "react-router-dom";
import {witchAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileComponent extends React.Component {
    userCheck() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.userID;
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }
    componentDidMount() {
        this.userCheck()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.userCheck()
        }

    }

    render() {
        return (
            <div>
                <Profile profile ={this.props.profile}
                         isOwner = {!this.props.match.params.userId}
                         status = {this.props.status}
                         updateUserStatus = {this.props.updateUserStatus}
                         savePhoto={this.props.savePhoto}
                         saveProfile = {this.props.saveProfile}
                />
            </div>

        )
    }

}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        userID: state.auth.userId
    }
}
let mapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    witchAuthRedirect)((ProfileComponent))


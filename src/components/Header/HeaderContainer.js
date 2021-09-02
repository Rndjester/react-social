import {Header} from "./Header";
import React from "react";
import {connect} from "react-redux";
import {sendLogout, setUserData} from "../../redux/auth-reducer";

class headerComponent extends React.Component {
    render () {
        return (
            <Header  {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
let mapDispatchToProps = {
    setUserData,
    sendLogout,
}


let HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(headerComponent)
export default HeaderContainer
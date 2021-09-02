import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsRedirect = (state) => {
    return {
        isAuth: true
    }
}

export const witchAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth === false) return <Redirect to = {'/login'}/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}
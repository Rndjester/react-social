import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";


import './app.css'
import {Route} from "react-router-dom";
import Login from "./components/Login/Login";
import {initializedAPP} from "./redux/app-reducer";
import Preloader from "./components/layout/preoladers/Preloader";
import MyPostsContainer from "./components/Lenta/MyPosts/MyPostsContainer";
import {withRouter} from "react-router-dom";

import HeaderContainer from "./components/Header/HeaderContainer";

const DialogContainer = React.lazy(() => import("./components/Dialogs/DialogContainer"))
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

class App extends React.Component {
    componentDidMount() {
        this.props.initializedAPP()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app container">
                <div className="app__wrap">
                    <HeaderContainer/>
                    <React.Suspense fallback={<Preloader />}>
                        <div className="content">
                            <Route path="/friends"
                                   render={() => <FriendsContainer/>}
                            />
                            <Route path="/login"
                                   render={() => <Login />}
                            />
                            <Route path="/lenta"
                                   render={() => <MyPostsContainer  />}
                            />
                            <Route path="/profile/:userId?"
                                   render={() => <ProfileContainer />}
                            />
                            <Route path="/dialog"
                                   render={() => <DialogContainer/>}
                            />
                        </div>
                    </React.Suspense>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}
let AppComponent = compose(
    withRouter,
    connect(mapStateToProps, {initializedAPP})
)(App)

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppComponent />
            </Provider>
        </BrowserRouter>
    )
}
export const getState = () => {
    return store.getState()
}
window.store = store
export  default MainApp
import React from "react";
import {NavLink} from "react-router-dom";

const DialogUser = (props) => {
    let avatarElm = () => {
        if (!props.avatar) {return (
            <img src="https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51402215-stock-illustration-male-avatar-profile-picture-use.jpg" alt=""/>
        )}
        else {return (
            <img src={props.avatar} alt=""/>
        )}
    }
    let path = '/dialogs/' + props.id
    return(
        <NavLink to = {path} className='dialogs__user'>
            <div className='dialogs__avatar'>
                {avatarElm()}
            </div>
            <div className='dialog__user-info' >
                <div className='dialog__item-name'>{props.user}</div>
            </div>
        </NavLink>
    )
}
export default DialogUser
import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from '../../img/user.png'

export const FriendItem = (props) => {
    let followButton = () => {
        if(props.info.follow) {
            return (<button disabled={props.followingProgress.some(id => id === props.info.id)}
                            onClick={() => {props.unfollowTS(props.info.id)}}
                            className='button friends__follow active'>Отписаться</button>)
        }
        return (<button disabled={props.followingProgress.some(id => id === props.info.id)}
                        onClick={() => {props.followTS(props.info.id)}}
                        className='button friends__follow'>Подписатся</button>)
    }
    return (
        <div >

                <div className='friends__item'>
                    <div className='friends__avatar'>
                        {!props.info.photos.small?<img alt = "Avatar" src = {userPhoto}/>:<img alt = "Avatar" src = {props.info.photos.small}/>}
                    </div>
                    <div className='friends__top'>
                        <div className="friends__name">{props.info.name}</div>
                    </div>
                    <div className='friends__button-wrap'>
                        <NavLink to = {'/profile/' + props.info.id}>
                            <div className='friends__button-profile button'>Профиль</div>
                        </NavLink>
                        {followButton()}
                    </div>

                </div>

        </div>
    )
}
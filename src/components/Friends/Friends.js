import React from "react";
import {FriendItem} from "./Friend";
import {Paginator} from "../layout/paginators/Paginator";

let Friends = (props) => {
    return (
        <div className='friends__wrap'>
            <Paginator currentPage = {props.currentPage} portionSize = {props.portionSize} onSetPage = {props.onSetPage} totalUsersCount = {props.totalUsersCount} pageSize = {props.pageSize}/>
            <div className='friends__grid'>
                {
                    props.users.map(friend => <FriendItem followingProgress = {props.followingProgress}
                                                          followTS = {props.followTS}
                                                          unfollowTS = {props.unfollowTS}
                                                          info = {friend}/>)
                }
            </div>
            <div>
                <button className="friends__add">Добавить пользователей</button>
            </div>
        </div>
    )
}
export default Friends

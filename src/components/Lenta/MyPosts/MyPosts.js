import {Post} from "./Post/Post";
import React from "react";

export const MyPosts = (props) => {

    let postsElement = props.newsPage.posts.map((post) => {
        return <Post message ={post.message} likes ={post.likes}/>
    })

    let onAddPost = () => {
        props.addPostActionCreator()
    }
    let onTextAreaChange = (e) => {
        props.updatePostAreaActionCreator(e.target.value)
    }

    return (
        <div>
            <div>
                Добавить пост
            </div>
            <div>
                <textarea onChange={onTextAreaChange} value ={props.newsPage.textareaValue} />
            </div>

            <button onClick={onAddPost}>
                Новый пост
            </button>
            <div>
                {postsElement}
            </div>

        </div>
    )
}
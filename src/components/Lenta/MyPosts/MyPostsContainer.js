import {addPostActionCreator, updatePostAreaActionCreator} from "../../../redux/news-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {

    return {
        newsPage: state.newsPage
    }
}
let mapDispatchToProps = {
        updatePostAreaActionCreator,
        addPostActionCreator
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
import './dialogs.css'
import {addMessage} from "../../redux/dialog-reducer";
import Dialog from "./Dialog";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps =  {
        addMessage
}
const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog)

export default DialogContainer
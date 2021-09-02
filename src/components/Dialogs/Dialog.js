import React from 'react'
import DialogItem from './DialogsItems'
import './dialogs.css'
import DialogUser from "./DialogUser";
import {Field, reduxForm} from "redux-form";

const DialogForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit} className="dialogs__send">
            <Field component='input' className='dialogs__input' name ={"fieldMessageBody"}/>
            <button type = 'submit' className='button dialogs__button'>Написать</button>
        </form>
    )
}

export const DialogReduxForm = reduxForm({
    form: 'dialogForm'
})(DialogForm)

const Dialog = (props) => {
    let allMassage = props.dialogPage.messages.map(message => <DialogItem message = {message.text} id = {message.id}/>)
    let usersBlock = props.dialogPage.users.map(user => <DialogUser user = {user.name} id = {user.id}/>)
    let addNewMassage = (values) => {
        props.addMessage(values.fieldMessageBody)
    }
    return(
        <div className='dialogs'>
            <div className="dialogs__left">
                <div className='dialogs__head'>Диалоги</div>
                <div className='dialogs__users'>
                    {usersBlock}
                </div>
                <div className="button dialogs__adduser">Добавить пользователя</div>
            </div>
           <div className="dialogs__right">
                <div className='dialogs__messages'>
                    <div className='dialogs__items'>
                        {allMassage}
                    </div>
                </div>
               <DialogReduxForm onSubmit = {addNewMassage}/>
           </div>
        </div>
    )
}
export default Dialog
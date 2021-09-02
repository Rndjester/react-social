import React from "react";

const DialogItem = (props) => {
    return(
        <div className='dialogs__item'>
            <div className='dialogs__item-message'>{props.message}</div>
        </div>

    )

}
export default DialogItem
import React from "react";

export let labelInput = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <label className={'label ' + (hasError ? "error" : "")}>
            <div className={'login__label-text'}>{props.text}</div>
            <input {...props} {...input}/>
            { hasError && <span> { meta.error } </span> }
        </label>
    )
}
export let easyInput = ({input, meta, ...props}) => {
    return (
        <label className={'label'}>
            <input {...props} {...input}/>
        </label>
    )
}

export let checkbox = ({input, meta, ...props}) => {
    return (
        <label className='checkbox'>
            <input {...props} {...input}/>
            <span className='checkbox__span'></span>
        </label>
    )
}

import React from "react";
import {checkbox, easyInput} from "../layout/inputs/inputs";
import {Field, reduxForm} from "redux-form";

const Contact = ({contactTitle}) => {
    return  <div className='profile__link'>
        <div className='profile__link-name'>{contactTitle}:</div>
        <Field component = {easyInput} name = {"contacts."+contactTitle} className='login__input input__text'/>
    </div>
}


const ProfileDataForm = ({initialValues, handleSubmit, error}) => {
    return <form onSubmit = {handleSubmit}>
        <div className='profile__link'>
            <div className='profile__link-name'>Имя </div> <Field component = {easyInput} name = 'fullName' className='login__input input__text'/>
        </div>
        <div className='profile__about'>
            <div className='profile__link'>
                <div className='profile__link-name'>О себе:</div>
                <Field component = {easyInput} name = 'aboutMe' className='login__input input__text'/>
            </div>
        </div>
        <div className='profile__link'>
            <div className='profile__link-name'>Ищет работу: </div> <Field component = {checkbox} type = 'checkbox' name = 'lookingForAJob' className='checkbox__input'/>
        </div>
        <div className='profile__links'>
            <div>Ссылки:</div>
            {Object.keys(initialValues.contacts).map(key => {
                return <Contact key = {key} contactTitle = {key}/>
            })}
        </div>
        <div className='login__errors'>{error}</div>
        <button type = 'submit'  className="button green">Сохранить</button>

    </form>
}
export const ProfileDataFormRedux = reduxForm({form: "profile"})(ProfileDataForm)

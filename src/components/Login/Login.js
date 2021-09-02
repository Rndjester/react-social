import React from "react";
import './Login.css'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../helpers/validators";
import {labelInput} from "../layout/inputs/inputs";
import {sendLoginData, sendLogout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {NavLink} from "react-router-dom";

const maxLength10 = maxLengthCreator(30)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit = {handleSubmit} className='login__form'>
            <NavLink to = "/" className='login__close'></NavLink>
            <h1>Войти</h1>
            <Field component = {labelInput} text = {'Логин'} name = {'email'} className='login__input input__text' validate = {[required, maxLength10]}/>
            <Field component = {labelInput} text = {'Пароль'} name = {'password'} className='login__input input__text' validate = {[required, maxLength10]} type={"password"}/>

            <div className='login__errors'>{error}</div>
            <label className='login__label flex aic'>
                <Field component={'input'} type="checkbox"  name = {'rememberMe'}/>
                <div>Запомнить меня</div>
            </label>
            <button className='login__button button' type = 'submit'>Войти</button>q
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)



const Login = (props) => {
    const onSubmit = (formData) => {
        props.sendLoginData(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    debugger
    return (
        props.isAuth?<Redirect to = {`/profile`}/>:<div className='overlay login__overlay'>
                <LoginReduxForm onSubmit = {onSubmit} captchaUrl = {props.captchaUrl}/>
            </div>


    )
}
let mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        email: state.auth.email
    }
}


export default connect(mapStateToProps, {sendLoginData, sendLogout})(Login)
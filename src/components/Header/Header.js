import React from 'react'
import './header.css'
import {Navbar} from "../Navbar/Navbar";
import {NavLink} from "react-router-dom";

export const Header = (props) => {
    return (
        <header className='header'>
            <div className='header__wrap'>
                <div className="header__logo">
                    <img alt = "превью" src = "https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png" />
                </div>
                <div className='login__block'>
                    {props.isAuth ?  <button onClick={props.sendLogout}>Выйти</button>: <NavLink to='/login'>войти</NavLink>}
                </div>
            </div>

            <Navbar className = "navbar"/>
        </header>
    )
}

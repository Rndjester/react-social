import React from 'react'
import './navbar.css'
import {NavLink} from "react-router-dom";
import user from './../../img/user.png'
import card from './../../img/id-card.png'
import settings from './../../img/settings.png'
import smartphone from './../../img/smartphone.png'
import newspaper from './../../img/newspaper.png'

export const Navbar = (props) => {
	return(
		<div className="navbar">
			<div className = 'navbar__item'>
				<NavLink className = 'navbar__item-link' to = "/lenta" >
					<div className = 'navbar__icon'>
						<img src={newspaper} alt=""/>
					</div>
					<div>Лента</div>
				</NavLink>
			</div>
			<div className = 'navbar__item'>
				<NavLink className = 'navbar__item-link' to = "/dialog" >
					<div className = 'navbar__icon'>
						<img src={smartphone} alt=""/>
					</div>
					<div>Диалоги</div>
				</NavLink>
			</div>
			<div className = 'navbar__item'>
				<NavLink className = 'navbar__item-link' to = "/profile" >
					<div className = 'navbar__icon'>
						<img src={user} alt=""/>
					</div>
					<div>Профиль</div>
				</NavLink>

			</div>
			<div className = 'navbar__item'>
				<NavLink className = 'navbar__item-link' to = "/friends" >
					<div className = 'navbar__icon'>
						<img src={user} alt=""/>
					</div>
					<div>Друзья</div>
				</NavLink>

			</div>
			<div className='navbar__item'>
				<NavLink className='navbar__item-link' to="/setting">
					<div className='navbar__icon'>
						<img
							src={settings}
							alt=""/>
					</div>
					<div>Настройки</div>
				</NavLink>

			</div>
			<div className='navbar__item'>
				<NavLink className='navbar__item-link' to="/more">
					<div className='navbar__icon'>
						<img
							src={card}
							alt=""/>
					</div>
					<div>Больше</div>
				</NavLink>

			</div>

		</div>
	)
}
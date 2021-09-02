import Preloader from "../layout/preoladers/Preloader";
import React, {useState} from "react";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import userPhoto from '../../img/user.png'
import {ProfileDataFormRedux} from "./ProfileDataForm";

const Contact = ({contactTitle, contactName}) => {
    return  <div className='profile__link'>
        <div className='profile__link-name'>{contactTitle}:</div>
        <div className='profile__link-item'>{contactName}</div>
    </div>
}
let ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>

        <div className='profile__about'>
            <div>
                О себе:
            </div>
            <div>
                {profile.aboutMe}
            </div>
        </div>
        <div className='profile__link'>
            <div className='profile__link-name'>Ищет работу: </div> {profile.lookingForAJob ? 'Да' : 'Нет'}
        </div>
        {profile.lookingForAJob &&
        <div className='profile__link'>
            <div className='profile__link-name'>Мои скилы: </div> <div>{profile.lookingForAJobDescription}</div>
        </div>

        }
        <div className='profile__links'>
            <div>Ссылки:</div>
            {Object.keys(profile.contacts).map(key => {
                return <Contact key = {key} contactTitle = {key} contactName = {profile.contacts[key]}/>
            })}
        </div>
        {isOwner && <div>
            <button onClick = {goToEditMode} className="button">Редактировать</button>
        </div>}
    </div>

}

export const Profile = ({profile, isOwner, updateUserStatus, status, savePhoto, saveProfile}) => {

    let [eMode, setEMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = async (formData) => {
        await saveProfile(formData)
        setEMode(false)
    }
    return (
        <div className="profile__wrap">
            <div className="profile__top">
                {profile.fullName}
            </div>
           <div className="profile__item">
               <div className="profile__avatar">

                   <img src={profile.photos.small || userPhoto} alt=""/>
                   <div>
                       {isOwner && <input type = 'file' onChange = {(e) => onMainPhotoSelected(e)}/>}
                   </div>
               </div>

           </div>
            <div className='profile__info'>
                <div className='profile__name'>
                    {profile.fullName}
                </div>
                <ProfileStatusWithHook  status = {status} updateUserStatus = {updateUserStatus}/>
                {eMode ?
                    <ProfileDataFormRedux initialValues = {profile} onSubmit = {onSubmit}/>
                    :<ProfileData profile = {profile} goToEditMode = {() => {setEMode(true)}} isOwner = {isOwner}/>}
            </div>
        </div>
    )
}
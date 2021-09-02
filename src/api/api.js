import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "a43b1adc-9e3a-45b0-9db0-15a63d9c97ca"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    authMe()  {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    unFollow (id)  {
        return  instance.delete(`follow/${id}`, {},)
    },
    follow (id)  {
        return instance.post(`follow/${id}`, {})
    },
    login (email, password, rememberMe=false, captcha)  {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout ()  {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
    },
    loadPhoto(photo) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {})
    },
    loadProfileInfo(profile) {
        return instance.put('profile', profile)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

import axios from 'axios'

const API_URL = '/api/register'
const API_URL_LOGIN = '/api/auth'

//Register User
const register = async (userData) => {
    const responce = await axios.post(API_URL, userData)

    if(responce.data) {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }
    return responce.data
}

//Login User
const login = async (userData) => {
    const responce = await axios.post(API_URL_LOGIN, userData)

    if(responce.data) {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }
    return responce.data
}

//Logout User
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService
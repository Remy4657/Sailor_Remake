import axios from "../setup/axios"

const userRegister = (data) => {
    return axios.post("/api/v1/user/register", { ...data })
}
const userLogin = (data) => {
    return axios.post("/api/v1/user/login", { ...data })
}
const userLoginByGoogle = () => {
    return axios.get("/api/v1/auth/google")
}
const userLogout = () => {
    return axios.get("/api/v1/user/logout")
}
const refresh = async () => {
    return axios.get("/api/v1/refresh")
}
const userCheckout = (data) => {
    return axios.post("/api/v1/user/checkout", { ...data })
}
// nnn
const sendIdAccount = (data) => {
    return axios.post("/api/v1/user/send-idaccount", data)
}
const refreshAccessToken = async () => {
    return axios.get("/api/v1/refresh_access_token")
}
const setNewAccessToken = async (newAccessToken) => {
    return axios.post("/api/v1/set_new_access_token", { newAccessToken: newAccessToken })
}

export {
    userRegister, userLogin, userCheckout, sendIdAccount, userLogout,
    refresh, refreshAccessToken, setNewAccessToken, userLoginByGoogle
}
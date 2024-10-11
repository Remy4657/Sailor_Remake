import axios from 'axios'


const createOrder = (data) => {
    return axios.post("http://localhost:8080/api/v1/order/create", data)
}
const sendEmail = (idAccount) => {
    return axios.post("http://localhost:8080/api/v1/send-email", { idAccount })
}

export {
    createOrder, sendEmail
}
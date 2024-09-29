import axios from 'axios'

const readOrder = (data) => {
    return axios.post("http://localhost:8080/api/v1/order/read")
}
const createOrder = (data) => {
    return axios.post("http://localhost:8080/api/v1/order/create", data)
}

export {
    createOrder
}
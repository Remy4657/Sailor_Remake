import axios from "axios"

const fetchCart = (idAccount) => {
    return axios.post("http://localhost:8080/api/v1/cart/read", idAccount)
}
const fetchAllCart = (idAccount) => {
    return axios.get("http://localhost:8080/api/v1/cart-all/read")
}
const updateCart = (data) => {
    return axios.put("http://localhost:8080/api/v1/update-cart-qty", { ...data })
}
const deleteCart = (item) => {
    return axios.delete("http://localhost:8080/api/v1/delete-cart", { data: { id: item.Products.id } })
}
const initCart = (item) => {
    return axios.post("http://localhost:8080/api/v1/cart/init", { ...item })
}
const addToCart = (item) => {
    return axios.post("http://localhost:8080/api/v1/cart/add", { ...item })
}
const fetchCart_Detail = (idAccount) => {
    return axios.get(`http://localhost:8080/api/v1/cart-detail/read/${idAccount}`)
}

const updateShipping = (item) => {
    return axios.put("http://localhost:8080/api/v1/shipping/update", { ...item })
}
const fetchInfoOrder = (data) => {
    return axios.post("http://localhost:8080/api/v1/order/read", data)
}
const fetchOrderConfirm = (data) => {
    return axios.post("http://localhost:8080/api/v1/order-confirm/read", data)
}
const inserUserToCart = (item) => {
    return axios.post("http://localhost:8080/api/v1/add-user-to-cart", { ...item })
}

export {
    fetchCart, updateCart, deleteCart, fetchAllCart, addToCart, updateShipping, fetchInfoOrder, fetchOrderConfirm, inserUserToCart, fetchCart_Detail, initCart
}
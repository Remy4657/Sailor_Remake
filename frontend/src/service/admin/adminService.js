import axios from 'axios'

const createNewProduct = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/product/create", { ...data })
}
const updateProduct = (data) => {
    return axios.put("http://localhost:8080/api/v1/admin/product/update", { ...data })
}
const deleteProduct = (product) => {
    return axios.delete("http://localhost:8080/api/v1/admin/product/delete", { data: { id: product.id } })
}
// blog
const fetchAllBlog = () => {
    return axios.get("http://localhost:8080/api/v1/blog/read")
}
const createNewBlog = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/blog/create", { ...data })
}
const updateBlog = (data) => {
    return axios.put("http://localhost:8080/api/v1/admin/blog/update", { ...data })
}
const deleteBlog = (blog) => {
    return axios.delete("http://localhost:8080/api/v1/admin/blog/delete", { data: { id: blog.id } })
}
// category
const fetchAllCategory = () => {
    return axios.get("http://localhost:8080/api/v1/category/read")
}
const createNewCategory = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/category/create", { ...data })
}
const updateCategory = (data) => {
    return axios.put("http://localhost:8080/api/v1/admin/category/update", { ...data })
}
const deleteCategory = (data) => {
    return axios.delete("http://localhost:8080/api/v1/admin/category/delete", { data: { id: data.id } })
}

// order
const fetchAllOrder = (idAccount) => {
    return axios.post("http://localhost:8080/api/v1/order/read-all", { ...idAccount })
}
const createNewOrder = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/order/create", { ...data })
}
const updateOrder = (data) => {
    return axios.put("http://localhost:8080/api/v1/admin/order/update", { ...data })
}
const deleteOrder = (data) => {
    return axios.delete("http://localhost:8080/api/v1/admin/order/delete", { data: { id: data.id } })
}
// payment
const fetchAllPayment = () => {
    return axios.get("http://localhost:8080/api/v1/payment/read")
}
const createNewPayment = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/payment/create", { ...data })
}
const updatePayment = (data) => {
    return axios.put("http://localhost:8080/api/v1/admin/payment/update", { ...data })
}
const deletePayment = (data) => {
    return axios.delete("http://localhost:8080/api/v1/admin/payment/delete", { data: { id: data.id } })
}
// shippingnpm
const fetchAllShipping = () => {
    return axios.get("http://localhost:8080/api/v1/shipping/read")
}
const createNewShipping = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/shipping/create", { ...data })
}
const updateShipping = (data) => {
    return axios.put("http://localhost:8080/api/v1/admin/shipping/update", { ...data })
}
const deleteShipping = (data) => {
    return axios.delete("http://localhost:8080/api/v1/admin/shipping/delete", { data: { id: data.id } })
}

// login
const userRegister = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/register", { ...data })
}
const userLogin = (data) => {
    return axios.post("http://localhost:8080/api/v1/admin/login", { ...data })
}
const userLogout = () => {
    return axios.get("http://localhost:8080/api/v1/admin/user/logout")
}

export {
    createNewProduct, updateProduct, fetchAllBlog, createNewBlog, updateBlog, deleteProduct, deleteBlog,
    fetchAllCategory, createNewCategory, updateCategory, deleteCategory, fetchAllOrder, createNewOrder, updateOrder, deleteOrder, userRegister, userLogin,
    fetchAllPayment, createNewPayment, updatePayment, deletePayment,
    fetchAllShipping, createNewShipping, updateShipping, deleteShipping, userLogout
}
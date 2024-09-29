import axios from 'axios'

const fetchAllProduct = () => {
    return axios.get("http://localhost:8080/api/v1/product/read")
}
const fetchProductDetail = (id) => {
    return axios.get(`http://localhost:8080/api/v1/product/detail/${id}`)
}



export {
    fetchAllProduct, fetchProductDetail
}
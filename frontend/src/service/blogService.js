import axios from 'axios'

const fetchAllBlog = () => {
    return axios.get("http://localhost:8080/api/v1/blog/read")
}



export {
    fetchAllBlog
}
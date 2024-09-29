import db from "../models/index";

const getAllBlog = async () => {
    try {
        let blogs = await db.Blog.findAll({

        });
        if (blogs) {
            // console.log('check user', blogs)
            return {
                EM: 'get data succes',
                EC: 0,
                DT: blogs
            }
        }
        else {
            console.log('not get user')
            return {
                EM: 'get data succes',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAllBlog
}
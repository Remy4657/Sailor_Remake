import blogService from '../services/blogService'

const readFunc = async (req, res) => {
    try {

        let data = await blogService.getAllBlog()

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
module.exports = {
    readFunc
}
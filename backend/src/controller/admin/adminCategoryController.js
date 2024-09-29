import categoryService from '../../services/adminService/categoryService'


const createFunc = async (req, res) => {
    try {
        console.log('product add: ', req.body)
        let data = await categoryService.createNewCategory(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log('error createFunc: ', e)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const updateFunc = async (req, res) => {
    try {

        let data = await categoryService.updateCategory(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await categoryService.deleteCategory(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
module.exports = { createFunc, updateFunc, deleteFunc }
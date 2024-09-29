import shippingService from '../../services/adminService/shippingService'


const createFunc = async (req, res) => {
    try {
        console.log('shipping add: ', req.body)
        let data = await shippingService.createNewShipping(req.body)

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

        let data = await shippingService.updateShipping(req.body)

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
        let data = await shippingService.deleteShipping(req.body.id)
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
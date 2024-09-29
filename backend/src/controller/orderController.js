import orderService from '../services/orderService'

const readFuncAll = async (req, res) => {
    try {


        let data = await orderService.getOrderAll()

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const readFunc = async (req, res) => {
    try {


        let data = await orderService.getOrder(req.body.idAccount)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const readOrderConfirmFunc = async (req, res) => {
    try {


        let data = await orderService.getOrderConfirm(req.body.idAccount)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const createFuncAll = async (req, res) => {
    try {


        let data = await orderService.createOrder(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ""
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}

module.exports = {
    readFunc, readFuncAll, readOrderConfirmFunc, createFuncAll
}
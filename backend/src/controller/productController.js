import productService from '../services/productService'

const readFunc = async (req, res) => {
    try {


        let data = await productService.getAllProduct()

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
const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api",
    });
};
const readProductDetailFunc = async (req, res) => {
    try {
        //console.log('req: ', req.params.id)
        let data = await productService.getProductDetail(req.params.id)

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
    readFunc, testApi, readProductDetailFunc
}
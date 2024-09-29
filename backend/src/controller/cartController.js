import cartService from '../services/cartService'

const initCartFunc = async (req, res) => {
    try {

        //console.log('id account controller: ', req.body.idAccount)
        let data = await cartService.initCart(req.body)

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
            DT: ""
        });
    }
}

const readFunc = async (req, res) => {
    try {

        //console.log('id account controller: ', req.body.idAccount)
        let data = await cartService.getCart(req.body.idAccount)

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
            DT: ""
        });
    }
}
const readAllFunc = async (req, res) => {
    try {

        //console.log('id account controller: ', req.body.idAccount)
        let data = await cartService.getAllCart()

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
const updateCartFunc = async (req, res) => {
    try {

        //console.log('req detail', req.body)
        let data = await cartService.updateCart(req.body)

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
const deleteCartFunc = async (req, res) => {
    try {

        console.log('cart delete', req.body.id)
        let data = await cartService.deleteCart(req.body.id)

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
const addToCartFunc = async (req, res) => {
    try {

        //console.log('product add: ', req.body)
        let data = await cartService.addToCart(req.body)
        console.log('res add to cart: ', data)

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
const updateShippingFunc = async (req, res) => {
    try {

        // console.log('shipping update', req.body)
        let data = await cartService.updateShipping(req.body)

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

const addUserToCartFunc = async (req, res) => {
    try {

        //console.log('id account add to cart controller: ', req.body.idAccount)
        let data = await cartService.addUserToCart(req.body.idAccount)

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
const readCartDetailFunc = async (req, res) => {
    try {

        //console.log('id account add to cart controller: ', req.body.idAccount)
        let data = await cartService.readCartDetail(req.params.idAccount)

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
module.exports = {
    readFunc, updateCartFunc, deleteCartFunc, addToCartFunc, readAllFunc, updateShippingFunc, addUserToCartFunc, readCartDetailFunc, initCartFunc
}
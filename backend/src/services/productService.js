import db from "../models/index";

const getAllProduct = async () => {
    try {
        let products = await db.Product.findAll({
            include: [{ model: db.Cart, attributes: ["id"] }],
        });
        if (products) {
            // console.log('check user', products)
            return {
                EM: 'get data succes',
                EC: 0,
                DT: products
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
const getProductDetail = async (id) => {
    try {
        console.log('id: ', id)
        let product = await db.Product.findOne({
            where: { id: id }
        });
        if (product) {
            // console.log('check user', products)
            return {
                EM: 'get product detail succes',
                EC: 0,
                DT: product
            }
        }
        else {
            console.log('not get detail product')
            return {
                EM: 'get detail product error',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAllProduct, getProductDetail
}
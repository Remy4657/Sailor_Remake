import db from "../../models/index";

const getAllProduct = async () => {
    try {
        let products = await db.Product.findAll({
            include: [{ model: db.Category }, { model: db.Cart, attributes: ["id"] }],
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
const createNewProduct = async (data) => {

    try {

        // if (data.name && data.image && data.price && data.priceOld && data.status && data.categoryId) {
        //     return {
        //         EM: "Empty something field",
        //         EC: 0,
        //         DT: ''
        //     };
        // }

        await db.Product.create({ ...data })
        return {
            EM: 'Create new product ok',
            EC: 1,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong from server',
            EC: -1,
            DT: []
        }
    }
}

const updateProduct = async (data) => {
    try {
        // if (!data.groupId) {
        //     return {
        //         EM: 'Not found group id',
        //         EC: 0,
        //         DT: 'group'
        //     }
        // }
        let product = await db.Product.findOne({
            where: { id: data.id }
        })
        if (product) {
            await product.update({
                name: data.name,
                image: data.image,
                price: data.price,
                pricePld: data.pricePld,
                status: data.status,
                categoryId: data.categoryId
            })
            return {
                EM: 'Update product succeed',
                EC: 1,
                DT: []
            }
        }
        else {
            //not found
            return {
                EM: 'product not find',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong from user',
            EC: -1,
            DT: []
        }
    }
}
const deleteProduct = async (id) => {
    try {
        // await db.User.destroy({
        //     where: {
        //         id: id,
        //     },
        // });
        // return {
        //     EM: 'delete user success',
        //     EC: 0,
        //     DT: []
        // }

        let product = await db.Product.findOne({
            where: { id: id }
        })
        if (product) {
            await product.destroy()
            return {
                EM: 'delete product success',
                EC: 0,
                DT: []
            }

        } else {
            return {
                EM: 'product not exist',
                EC: 2,
                DT: []
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'some thing wrong from server (delete)',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {
    getAllProduct, updateProduct, createNewProduct, deleteProduct
}
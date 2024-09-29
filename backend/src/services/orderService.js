import db from "../models/index";

const getIdCurrentCart = async (idAccount) => {
    try {
        const productCart = await db.Cart.findOne({
            where: {
                userId: +idAccount
            },
            order: [['id', 'DESC']] // Sắp xếp các bản ghi theo ID từ cao xuống thấp
        });
        return productCart.id
    } catch (error) {
        return {
            EM: error,
            EC: 0,
            DT: ""
        }
    }

}

const getOrderAll = async () => {

    try {


        // let order = await db.Cart.findAll({


        //     // attributes: ["id", "ProductId", "CartId", "qty", "createdAt", "updatedAt"],
        //     include: [
        //         {
        //             model: db.User, attributes: ["phone", "email"]
        //         },
        //         { model: db.Product, attributes: ["id", "name", "description", "price", "image"] }

        //     ],

        //     raw: true,
        //     nest: true
        // });
        let order = await db.Orders.findAll({


            attributes: ["infoOrder", "totalMoney", "phone", "email", "address"],


            raw: true,
            nest: true
        });
        //console.log('get cart by id: ', cart)
        if (order) {
            // console.log('check user', cart)
            return {
                EM: 'get order success',
                EC: 0,
                DT: order
            }
        }
        else {
            console.log('not get order')
            return {
                EM: 'get order error',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'wrong from server',
            EC: -1,
            DT: []
        }
    }
}
const getOrder = async (idAccount) => {

    try {
        let currentIDCart = await getIdCurrentCart(idAccount)
        console.log("id cart: ", currentIDCart)
        let order = await db.Cart.findAll({

            where: {
                id: currentIDCart,
            },

            // attributes: ["id", "userId"],
            include: [
                // {
                //     model: db.User, attributes: ["id", "email"]
                // },
                { model: db.Product, attributes: ["id", "name", "description", "price", "image"] },
                { model: db.Shipping, attributes: ["id", "value", "method"] }
            ],

            raw: true,
            nest: true
        });
        //console.log('get cart by id: ', cart)
        if (order) {
            // console.log('check user', cart)
            return {
                EM: 'get order success',
                EC: 0,
                DT: order
            }
        }
        else {
            console.log('not get order')
            return {
                EM: 'get order error',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'wrong from server',
            EC: -1,
            DT: []
        }
    }
}

const getOrderConfirm = async (idAccount) => {

    try {


        let order = await db.Cart.findAll({

            where: {
                userId: +idAccount
            },

            // attributes: ["id", "userId"],
            // include: [
            //     // {
            //     //     model: db.User, attributes: ["id", "email"]
            //     // },
            //     { model: db.Product, attributes: ["id", "name", "description", "price", "image"] },
            //     { model: db.Shipping, attributes: ["id", "value", "method"] }
            // ],

            raw: true,
            nest: true
        });
        //console.log('get cart by id: ', cart)
        if (order) {
            // console.log('check user', cart)
            return {
                EM: 'get order success',
                EC: 0,
                DT: order
            }
        }
        else {
            console.log('not get order')
            return {
                EM: 'get order error',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'wrong from server',
            EC: -1,
            DT: []
        }
    }
}
const createOrder = async (data) => {
    try {
        await db.Orders.create({ ...data });
        return {
            EM: "Create new order successfully",
            EC: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong",
            EC: -2,
        };
    }
}
module.exports = {
    getOrder, getOrderAll, getOrderConfirm, createOrder
}
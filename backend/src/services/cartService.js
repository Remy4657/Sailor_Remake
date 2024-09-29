import db from "../models/index";
const { Op, and } = require("sequelize");


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

const checkCartExist = async (idAccount) => {
    try {
        const cartOrder = await db.Orders.findOne({
            where: {
                cartId: await getIdCurrentCart(idAccount)
            },
            raw: true,
            nest: true

        });
        return cartOrder
    } catch (error) {
        return {
            EM: error,
            EC: 0,
            DT: ""
        }
    }

}
const initCart = async (item) => {
    try {
        let isExistCartInOrder = await checkCartExist(item.idAccount)
        let currentIdCart = await getIdCurrentCart(item.idAccount)    // lay thong tin gio hang vua moi order xong de insert vao gio hang moi

        if (isExistCartInOrder !== null) {
            let user = await db.User.findOne({
                where: {
                    id: item.idAccount,

                }
            })
            await db.Cart.build({ userId: item.idAccount, email: user.email }).save()
        }
        let List_CartDetail = await db.Cart_Detail.findAll({ // lay thong tin chi tiet gio hang vua order xong de chen vao gio hang moi
            where: {
                CartId: currentIdCart,
            },
            raw: true
        })
        // update id cart 
        currentIdCart = await getIdCurrentCart(item.idAccount)

        List_CartDetail = List_CartDetail.map(item => {
            return {
                ...item,
                CartId: +currentIdCart

            };
        });


        await db.Cart_Detail.bulkCreate(
            [
                ...List_CartDetail
            ],
            // { fields: ['ProductId', 'CartId', 'qty'] },
        );

        return {
            EM: 'init cart success',
            EC: 1,
            DT: ""
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
const getAllCart = async () => {
    try {

        let cart = await db.Cart_Detail.findAll({

            raw: true,
            nest: true
        });
        //console.log('cart: ', cart)
        if (cart) {
            // console.log('check user', cart)
            return {
                EM: 'get cart success',
                EC: 0,
                DT: cart
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
        return {
            EM: 'wrong from server',
            EC: -1,
            DT: []
        }
    }
}

const getCart = async (idAccount) => {

    try {
        let maxCartIdByAcountId = await db.Cart.max('Cart.id',
            {
                attributes: ["id"],
                where: { userId: +idAccount },
                raw: true,
                nest: true

            })

        let cart = await db.Cart.findAll({
            attributes: [
                "id", "userId"
            ],
            where:
            {
                id: maxCartIdByAcountId
            },
            include: [
                {
                    model: db.User, attributes: ["id", "email"]
                },
                { model: db.Product, attributes: ["id", "name", "description", "price", "image"] }
            ],

            raw: true,
            nest: true
        });

        if (cart) {

            return {
                EM: 'get cart success',
                EC: 0,
                DT: cart
            }
        }
        else {
            console.log('not get cart')
            return {
                EM: 'get cart error',
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
const updateCart = async (data) => {
    try {
        console.log('data cart: ', data.User.id)
        if (!data) {
            return {
                EM: 'Not found id product cart',
                EC: 0,
                DT: 'group'
            }
        }
        let currentIdCart = await getIdCurrentCart(data.User.id)
        console.log("currentIdCart: ", currentIdCart)
        let cartDetail = await db.Cart_Detail.findOne({
            where: { CartId: currentIdCart, ProductId: data.Products.id }
        })
        if (cartDetail && data.type === 'plus') {
            await cartDetail.update({
                qty: data.Products.Cart_Detail.qty + 1
            })
            return {
                EM: 'Update plus cart detail succeed',
                EC: 1,
                DT: []
            }
        }
        else if (cartDetail && data.type === 'minus') {
            await cartDetail.update({
                qty: data.Products.Cart_Detail.qty - 1
            })
            return {
                EM: 'Update minus cart detail succeed',
                EC: 1,
                DT: []
            }
        }
        else {
            //not found
            return {
                EM: 'update cart qty invalid',
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

const deleteCart = async (idProduct) => {
    try {
        //console.log('id product delete: ', id)
        if (!idProduct) {
            return {
                EM: 'Not found id product to delete',
                EC: 0,
                DT: []
            }
        }
        else {
            // await db.Cart.destroy({
            //     where: {
            //         id: id
            //     }
            // })
            await db.Cart_Detail.destroy({
                where: {
                    ProductId: idProduct
                }
            })
            return {
                EM: 'Delete product success',
                EC: 1,
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
const addToCart = async (item) => {
    try {
        if (!item.id) {
            return {
                EM: 'id product not found',
                EC: 0,
                DT: []
            }
        }

        // let productCart = await db.Cart.findOne({
        //     where: {
        //         userId: +item.idAccount,

        //     }
        // })

        let isExistCartInOrder = await checkCartExist(item.idAccount)
        // cart da co trong order roi
        // if ((isExistCartInOrder != null) || (isExistCartInOrder === null && currentCartByAccount.userId != item.idAccount)) {
        if ((isExistCartInOrder != null)) {
            let user = await db.User.findOne({
                where: {
                    id: item.idAccount,

                }
            })
            await db.Cart.build({ userId: item.idAccount, email: user.email }).save()
        }

        let currentIdCart = await getIdCurrentCart(item.idAccount)    // get current cart to execute
        console.log("currentIdCart: ", currentIdCart)


        let product = await db.Cart_Detail.findOne({
            where: {
                CartId: currentIdCart,
                ProductId: item.id,
            },
            raw: true,
            nest: true
        })

        if (product == null) {
            console.log(">>nullproduct: ", product)
            await db.Cart_Detail.create({ ProductId: item.id, CartId: currentIdCart, qty: 1 })
        }
        else {
            await db.Cart_Detail.update(
                { qty: product.qty + 1 },
                {
                    where: { CartId: currentIdCart, ProductId: item.id },
                }
            );
        }
        return {
            EM: 'add product to success',
            EC: 1,
            DT: [product]
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
const updateShipping = async (data) => {

    try {
        let currentIdCart = await getIdCurrentCart(data.idAccount)
        let shipping = await db.Cart.findOne({
            where: { id: currentIdCart }
        })
        await shipping.update({
            ShippingId: data.id
        }) //, password: hashPassword
        return {
            EM: 'Update cart ok',
            EC: 1,
            DT: []
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

const addUserToCart = async (idAccount) => {
    try {
        if (!idAccount) {
            return {
                EM: 'id account not found',
                EC: 0,
                DT: []
            }
        }
        else {
            let userCart = await db.Cart.findOne({
                where: {
                    userId: +idAccount,

                }
            })
            let user = await db.User.findOne({
                where: {
                    id: +idAccount,

                }
            })
            if (!userCart) {

                await db.Cart.build({ userId: idAccount, email: user.email }).save()
                return {
                    EM: 'Add user to cart success',
                    EC: 0,
                    DT: []
                }
            }
            else {
                return {
                    EM: 'User logined prev',
                    EC: 0,
                    DT: []
                }
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
// get cart-detail to save in order
const readCartDetail = async (idAccount) => {
    try {
        let idCurrentCart = await getIdCurrentCart(idAccount)
        let cart_detail = await db.Cart.findAll({

            where: {
                id: idCurrentCart
            },

            attributes: ["id", "userId", "email", "phone", "totalMoney", "address"],
            include: [
                {
                    model: db.Product, attributes: ["name"]
                },
                {
                    model: db.Shipping, attributes: ["id"]
                },


            ],

            raw: true,
            nest: true
        });
        //console.log('get cart_detail by id: ', cart_detail)
        if (cart_detail) {
            // console.log('check user', cart_detail)
            return {
                EM: 'get cart_detail success',
                EC: 0,
                DT: cart_detail
            }
        }
        else {
            console.log('not get cart_detail')
            return {
                EM: 'get cart_detail error',
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
module.exports = {
    getAllCart, getCart, updateCart, deleteCart, addToCart, updateShipping, addUserToCart, readCartDetail, initCart
}
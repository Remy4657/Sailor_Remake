import db from "../../models/index";
import bcrypt from "bcryptjs";

const createNewOrder = async (data) => {

    try {
        // if (data.name && data.image && data.price && data.priceOld && data.status && data.categoryId) {
        //     return {
        //         EM: "Empty something field",
        //         EC: 0,
        //         DT: ''
        //     };
        // }

        await db.Orders.create({ ...data })
        return {
            EM: 'Create new order ok',
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

const updateOrder = async (data) => {
    try {
        let order = await db.Orders.findOne({
            where: { id: data.id }
        })
        console.log("data update: ", data)
        if (order) {
            await order.update({
                infoOrder: data.infoOrder,
                totalMoney: data.totalMoney,
                phone: data.phone,
                email: data.email,
                address: data.address,
            })
            return {
                EM: 'Update order success',
                EC: 1,
                DT: []
            }
        }
        else {
            //not found
            return {
                EM: 'order not found',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: error,
            EC: -1,
            DT: []
        }
    }
}
const deleteOrder = async (id) => {
    try {

        let order = await db.Orders.findOne({
            where: { id: id }
        })
        if (order) {
            await order.destroy()
            return {
                EM: 'delete order success',
                EC: 0,
                DT: []
            }

        } else {
            return {
                EM: 'order not exist',
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
    updateOrder, createNewOrder, deleteOrder
}
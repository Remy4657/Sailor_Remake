import db from "../../models/index";
import bcrypt from "bcryptjs";

const createNewPayment = async (data) => {

    try {

        // if (data.name && data.image && data.price && data.priceOld && data.status && data.categoryId) {
        //     return {
        //         EM: "Empty something field",
        //         EC: 0,
        //         DT: ''
        //     };
        // }

        await db.Payment.create({ method: data.name })
        return {
            EM: 'Create new blog ok',
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

const updatePayment = async (data) => {
    try {
        // if (!data.groupId) {
        //     return {
        //         EM: 'Not found group id',
        //         EC: 0,
        //         DT: 'group'
        //     }
        // }
        let blog = await db.Payment.findOne({
            where: { id: data.id }
        })
        if (blog) {
            await blog.update({
                method: data.name,


            })
            return {
                EM: 'Update blog succeed',
                EC: 1,
                DT: []
            }
        }
        else {
            //not found
            return {
                EM: 'blog not find',
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
const deletePayment = async (id) => {
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

        let blog = await db.Payment.findOne({
            where: { id: id }
        })
        if (blog) {
            await blog.destroy()
            return {
                EM: 'delete blog success',
                EC: 0,
                DT: []
            }

        } else {
            return {
                EM: 'blog not exist',
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
    updatePayment, createNewPayment, deletePayment
}
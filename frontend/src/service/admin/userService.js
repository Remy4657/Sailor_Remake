import db from "../models";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });
    if (user) {
        return true;
    }
    return false;
};
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone },
    });
    if (user) {
        return true;
    }
    return false;
};
const userRegister = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 0,
                DT: 'email'
            };
        }
        // check phone number
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone number is already exist",
                EC: 0,
                DT: 'phone'
            };
        }
        if (data.password !== data.confirmPassword) {
            return {
                EM: "Confirm password invalid",
                EC: 0,
                DT: []
            };
        }
        // hash password:
        const hashPassword = bcrypt.hashSync(data.password, salt);


        //console.log('data new user: ', data)
        await db.User.create({ username: data.username, email: data.email, phone: data.phone, password: hashPassword }) //, password: hashPassword
        // await db.Cart.create({ username: data.username, email: data.email, phone: data.phone, password: data.password })
        return {
            EM: 'Create new user ok',
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


const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};

const userLogin = async (data) => {
    try {

        //await db.User.create({ username: data.username, email: data.email, phone: data.phone, password: data.password }) //, password: hashPassword
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { username: data.username },

                    { email: data.username }
                ]
            }
        });
        if (user) { //  && checkPassword(data.password, user.password)
            return {
                EM: 'Login success',
                EC: 1,
                DT: user.id
            }
        }
        else {
            return {
                EM: 'Invalid password or username',
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
module.exports = {
    userRegister, userLogin
}
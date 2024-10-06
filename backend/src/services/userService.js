import db from "../models";
const { Op } = require("sequelize");
import bcrypt from "bcryptjs";
import jwtAction from "../jwt/JWTAction"
import jwt from 'jsonwebtoken';
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
const nodemailer = require('nodemailer');
import orderService from "./orderService"


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
        if (data.password !== data.cfpassword) {
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

const userCheckout = async (data) => {
    try {
        console.log("data checkout: ", data)
        let cart = await db.Cart.findOne({
            order: [['id', 'DESC']],
            where: { userId: data.idAccount }
        })
        if (data.phone == '' || data.address == '') {
            return {
                EM: 'Not empty input',
                EC: 0,
                DT: []
            }
        }
        await db.Cart.update({
            userId: data.idAccount,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            totalMoney: data.totalMoney,
            address: data.address,
            commune: data.commune,
            district: data.district,
            city: data.city,
            codeCart: data.codeCart,
            totalMoney: data.totalMoney,
            paymentId: +data.idPayment
        },
            {
                where: {
                    id: cart.id,
                },
            },)

        //await db.Cart.save();

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
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};
const UserRole = async (user) => {
    const data = await db.User.findOne({
        where: { id: user.id },
        attributes: ["id", "username", "email"],
        include: {
            model: db.Role,
            attributes: ["id", "name"],
            //through: { attributes: [] }
        },
        nest: true,
        raw: true
    })
    return data ? data : {}
}
const userLogin = async (data) => {
    try {

        //await db.User.create({ username: data.username, email: data.email, phone: data.phone, password: data.password }) //, password: hashPassword
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { username: data.username },
                    { email: data.username }
                ]

            },
            raw: true,
        });

        if (user && checkPassword(data.password, user.password)) {
            const userRole = await UserRole(user)
            const payload = {
                userRole
            }
            console.log("payload: ", payload)
            const obj_token = jwtAction.GenerateToken(payload)
            return {
                EM: 'Login success',
                EC: 1,
                DT: {
                    payload: payload,
                    access_token: obj_token.access_token,
                    refresh_token: obj_token.refresh_token,
                    UserId: user.id
                }
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
const refreshToken = async (refresh_token) => {
    try {
        if (refresh_token) {
            const decoded = jwtAction.VerifyToken(refresh_token)
            // console.log("decoded: ", decoded)
            if (decoded) {
                // lấy được biến cleanedDecoded giống biến decoded nhưng loại bỏ iat và exp
                const { iat, exp, ...cleanedDecoded } = decoded;

                try {
                    const access_token = jwt.sign(cleanedDecoded, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
                    });

                    return {
                        EM: 'refresh token succes',
                        EC: 1,
                        DT: access_token
                    }

                } catch (error) {
                    console.log("error: ", error)
                }
            }
            else {
                return {
                    EM: 'decoded null',
                    EC: 0,
                    DT: []
                }
            }
        }
        else {
            return {
                EM: 'refresh token not found',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: error,
            EC: -1,
            DT: ""
        }
    }
}
const adminLogin = async (data) => {
    try {

        //await db.User.create({ username: data.username, email: data.email, phone: data.phone, password: data.password }) //, password: hashPassword
        const user = await db.Admin.findOne({
            where:

                { username: data.username },

        });
        if (user && checkPassword(data.password, user.password)) { // 
            return {
                EM: 'Login success',
                EC: 1,
                DT: user.id
            }
        }
        else {
            return {
                EM: 'sai r',
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
const adminRegister = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 0,
                DT: ''
            };
        }
        // check phone number
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone number is already exist",
                EC: 0,
                DT: ''
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
        await db.Admin.create({ username: data.username, email: data.email, phone: data.phone, password: hashPassword }) //, password: hashPassword
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
const sendEmail = async (idAccount) => {
    try {
        const dataOrder = await orderService.getOrder(idAccount)

        console.log('dataOrder: ', dataOrder)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other email services
            auth: {
                user: 'trongdatga@gmail.com', // Your email
                pass: 'fsvb zkih aeyf yciz'   // Your email password or app password
            }
        });

        // Step 2: Set email options
        const mailOptions = {
            from: 'your-email@gmail.com',        // Sender address
            to: 'trongdatga@gmail.com',   // List of recipients
            subject: 'Xác nhận đơn hàng!',  // Subject line
            text: '',         // Plain text body
            html: `
            <div>
                <h1>Cảm ơn bạn đã đặt hàng!</h1>
                <h2>Thông tin đơn hàng</h3>
                <h3>Địa chỉ giao hàng:</h6>
                <p>
                    ${dataOrder.DT[0].firstname},<br>
                    ${dataOrder.DT[0].address}, ${dataOrder.DT[0].commune}, ${dataOrder.DT[0].district}, ${dataOrder.DT[0].city}<br>
                    SDT: ${dataOrder.DT[0].phone}
                </p>
                <ul>
                    ${dataOrder.DT.map(item => `
                    <li>
                    ${item.Products.name} - Số lượng: ${item.Products.Cart_Detail.qty} - Giá: ${item.Products.price} VNĐ
                    </li>
                    `).join('')}
                </ul>

                <p><b>Tổng cộng: ${dataOrder.DT[0].totalMoney} VNĐ.</b></p>

            </div>
            ` // HTML body (optional)
        };

        // Step 3: Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return {
            EM: "Send email success",
            EC: 1,
            DT: dataOrder.DT,
        };

    } catch (error) {
        console.log(error)
        return {
            EM: "error from server",
            EC: "-1",
            DT: "",
        };
    }
}
module.exports = {
    userRegister, userLogin, userCheckout, adminLogin, adminRegister, refreshToken, sendEmail
}
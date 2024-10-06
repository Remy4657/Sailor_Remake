import userService from '../services/userService'
import orderService from "../services/orderService"

const userRegisterFunc = async (req, res) => {
    try {

        //console.log('req user register body: ', req.body)
        let data = await userService.userRegister(req.body)
        //console.log('req data register: ', data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const refreshController = async (req, res) => {
    try {
        //console.log("res refresh: ", res)
        if (req.user) {
            return res.status(200).json({
                EM: "Refresh page ok",
                EC: 1,
                DT: req.user,
            });
        }
        else {
            return res.status(200).json({
                EM: "Refresh page not ok",
                EC: 2,
                DT: "",
            });
        }

    } catch (error) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }
}
const userLoginFunc = async (req, res) => {
    try {

        //console.log('req body login: ', req.body)
        let data = await userService.userLogin(req.body)
        if (data && data.EC === 1) {

            res.cookie('access_token', data.DT.access_token, { httpOnly: true })
            res.cookie('refresh_token', data.DT.refresh_token, { httpOnly: true })
        }
        //console.log('req data register: ', data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }

}
const userLogoutFunc = async (req, res) => {
    try {
        res.cookie('access_token', 'a', { expires: new Date(0) });
        res.cookie('refresh_token', 'b', { expires: new Date(0) });
        return res.status(200).json({
            EM: "Logout succesfully",
            EC: 1,
            DT: "",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: e,
            EC: -1,
            DT: "",
        });
    }

}
const refreshToken = async (req, res) => {
    try {

        const varRefreshToken = req.cookies.refresh_token
        const data = await userService.refreshToken(varRefreshToken)

        if (data && +data.EC === 1) {

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
        if (data && +data.EC === 0) {                                   // khong co refresh token hoac refresh_token het han
            return res.status(401).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
        return res.status(500).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }

}
const setNewAccessToken = (req, res) => {
    try {
        //console.log("new access token: ", req.body.newAccessToken)
        res.cookie('access_token', req.body.newAccessToken, { httpOnly: true }) // ghi de acces_token
        // res.cookie('refresh_token', 'b', { expires: new Date(0) });
        return res.status(200).json({
            EM: "set New AccessToken success",
            EC: 1,
            DT: "",
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }
}
const adminLoginFunc = async (req, res) => {
    try {

        //console.log('req body login: ', req.body)
        let data = await userService.adminLogin(req.body)
        //console.log('req data register: ', data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }

}
const adminRegisterFunc = async (req, res) => {
    try {

        //console.log('req user register body: ', req.body)
        let data = await userService.adminRegister(req.body)
        //console.log('req data register: ', data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const userCheckoutFunc = async (req, res) => {
    try {

        //console.log('req body: ', req.body)
        let data = await userService.userCheckout(req.body)


        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const sendEmail = async (req, res) => {
    try {
        let data = await userService.sendEmail(req.body.idAccount)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
module.exports = {
    userRegisterFunc, userLoginFunc, userCheckoutFunc, adminLoginFunc, adminRegisterFunc, userLogoutFunc,
    refreshToken, setNewAccessToken, refreshController, sendEmail
}


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
module.exports = {
    userLogoutFunc
}
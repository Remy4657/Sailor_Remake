import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import PageNotFound from "../pages/404"
import { useNavigate, useLocation } from "react-router-dom"

const UserRoute = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const auth = useSelector(state => state.user.auth)
    const role = useSelector(state => state.user.role)


    if (!auth) {

        return <Outlet />
    }
    else {
        //alert("me")
        navigate("/")
    }
}
export default UserRoute
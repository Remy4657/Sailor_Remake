import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import DontPermission from "../pages/DontPermission"

const AdminRoute = () => {
    const role = useSelector(state => state.user.role)
    const auth = useSelector(state => state.user.auth)

    if (auth && role === "admin") {

        return <Outlet />
    }
    else {
        return <DontPermission />
    }
}
export default AdminRoute
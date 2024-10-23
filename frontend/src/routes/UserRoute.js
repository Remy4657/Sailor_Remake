import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";

const UserRoute = () => {


    const auth = useSelector(state => state.user.auth)



    if (!auth) {

        return <Outlet />
    }
    else {
        //navigate("/")
        return <Navigate to="/" />;
    }
}
export default UserRoute
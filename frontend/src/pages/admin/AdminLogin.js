import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../service/userService'
import { inserUserToCart } from '../../service/cartService'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    FETCH_DATA_LOGIN,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
} from "../../redux/actions/action";

const AdminLogin = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirectUrl = redirectInUrl ? redirectInUrl : "/admin/dashboard";

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(FETCH_DATA_LOGIN());
        let res = await userLogin({ username, password })

        if (res && res && +res.EC === 1) {

            // let data = {
            //     isAuthenticated: true,
            //     token: "fake token",
            // };
            // let idAccount = res.DT.UserId
            // let resadd = await inserUserToCart({ idAccount })

            //localStorage.setItem("token", data.token);
            // id user se xem cart của người đó
            // sessionStorage.setItem("idAccount", idAccount);
            // sessionStorage.setItem("email", res.DT.payload.userRole.email);
            // sessionStorage.setItem("username", res.DT.payload.userRole.username);
            // sessionStorage.setItem("role", res.DT.payload.userRole.Roles.name);

            //sessionStorage.setItem("account", JSON.stringify(data));
            dispatch(FETCH_DATA_SUCCESS(res.DT.payload.userRole));
            if (res.DT.payload.userRole.Roles.name === "admin") {

                toast.success(res.EM)
            }

            // dungf cai nay de reload lai trang home (de load so luong item trong cart)
            // window.location.href = redirectUrl || "/";
            navigate(redirectUrl || "/admin/dashboard")
        }
        else {
            toast.error(res.EM)
            dispatch(FETCH_DATA_ERROR());
        }
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "rgb(180 93 22)" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="/img/product/e-p1.png"
                                            alt="login form" className="img-fluid" style={{
                                                borderRadius: "1rem 0 0 1rem",
                                                marginTop: "20%"
                                            }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form>

                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h1 fw-bold mb-0"> Logo </span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" for="form2Example17">Email address</label>
                                                    <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setUsername(e.target.value)} />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" for="form2Example27">Password</label>
                                                    <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        style={{
                                                            background: "linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)",
                                                            borderColor: "#ff6c00"
                                                        }}
                                                        onClick={(e) => handleLogin(e)}
                                                    >Login</button>
                                                </div>

                                                <a className="small text-muted" href="#!">Forgot password?</a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <a href="#!"
                                                    style={{ color: "#393f81" }}>Register here</a></p>
                                                <a href="#!" className="small text-muted">Terms of use.</a>
                                                <a href="#!" className="small text-muted">Privacy policy</a>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AdminLogin
import { Link, useNavigate } from 'react-router-dom'
import { userLogin, userLoginByGoogle } from '../service/userService'
import { inserUserToCart } from '../service/cartService'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    FETCH_DATA_LOGIN,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
} from "../redux/actions/action";


const Login = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirectUrl = redirectInUrl ? redirectInUrl : "/";

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
            let idAccount = res.DT.UserId
            await inserUserToCart({ idAccount })

            //localStorage.setItem("token", data.token);
            // id user se xem cart của người đó
            // sessionStorage.setItem("idAccount", idAccount);
            // sessionStorage.setItem("email", res.DT.payload.userRole.email);
            // sessionStorage.setItem("username", res.DT.payload.userRole.username);
            // sessionStorage.setItem("role", res.DT.payload.userRole.Roles.name);

            //sessionStorage.setItem("account", JSON.stringify(data));
            dispatch(FETCH_DATA_SUCCESS(res.DT.payload.userRole));
            toast.success(res.EM)
            // dungf cai nay de reload lai trang home (de load so luong item trong cart)
            // window.location.href = redirectUrl || "/";
            navigate(redirectUrl || "/")
        }
        else {
            toast.error(res.EM)
            dispatch(FETCH_DATA_ERROR());
        }
    }
    const handleLoginByGoogle = async (e) => {
        e.preventDefault()
        await userLoginByGoogle()
        //window.open("http://localhost:8080/api/v1/auth/google", "_self")
        //navigate("http://localhost:8080/api/v1/auth/google")
    }
    return (
        <>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Login/Register</h1>
                            <nav className="d-flex align-items-center">
                                <a href="index.html">Home<span className="lnr lnr-arrow-right"></span></a>
                                <a href="category.html">Login/Register</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Banner Area --> */}

            {/* <!--================Login Box Area =================--> */}
            <section className="login_box_area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_box_img">
                                <img className="img-fluid" src={require('../assets/img/img_/login.jpg')} alt="" />
                                <div className="hover">
                                    <h4>New to our website?</h4>
                                    <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                                    <Link className="primary-btn" to="/register">Create an Account</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Log in to enter</h3>
                                <form className="row login_form" action="" method="post" id="contactForm">
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        {/* <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                            <label for="f-option2">Keep me logged in</label>
                                        </div> */}
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn" onClick={(e) => handleLogin(e)}>Log In</button>
                                        {/* <button type="submit" value="submit" className="primary-btn mt-3" onClick={(e) => handleLoginByGoogle(e)}>Log In by Google</button> */}
                                        <Link to="http://localhost:8080/login-google">login by google</Link>
                                        <a href="#">Forgot Password?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    )
}
export default Login
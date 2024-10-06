import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../service/userService'
import { inserUserToCart } from '../service/cartService'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    FETCHING_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
} from "../redux/actions/action";
import { useForm } from "react-hook-form"

const Login = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirectUrl = redirectInUrl ? redirectInUrl : "/";

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (data) => {
        // e.preventDefault()
        dispatch(FETCHING_DATA());
        let res = await userLogin(data)

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
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
                                {/* <form className="row login_form" action="" method="post" id="contactForm">
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn" onClick={(e) => handleLogin(e)}>Log In</button>
                                        <Link to="http://localhost:8080/login-google">login by google</Link>
                                        <a href="#">Forgot Password?</a>
                                    </div>
                                </form> */}

                                <form onSubmit={handleSubmit(handleLogin)} className="row login_form">
                                    <div className="col-md-12 form-group">
                                        <input className="form-control" type="text" defaultValue="" placeholder="Username" {...register("username", { required: true })} />
                                        {errors.username && <span
                                            style={{
                                                color: "red",
                                                display: "block",
                                                width: "100%",
                                                textAlign: "left"
                                            }}>
                                            This field is required</span>}
                                    </div>
                                    <div className="col-md-12 form-group mt-3">
                                        <input className="form-control" type="password" defaultValue="" placeholder="Password" {...register("password", { required: true })} />
                                        {errors.password && <span style={{
                                            color: "red",
                                            display: "block",
                                            width: "100%",
                                            textAlign: "left"
                                        }}>This field is required</span>}
                                    </div>

                                    <div className="col-md-12 form-group mt-5">
                                        <input type="submit" value="LOGIN" className="primary-btn" />
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
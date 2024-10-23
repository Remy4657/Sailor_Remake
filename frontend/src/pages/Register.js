import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { userRegister } from '../service/userService'
import { useForm } from "react-hook-form"

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        let res = await userRegister(data)
        if (res && res.EC === 0) {
            toast.error(res.EM)
        }
        else {
            toast.success(res.EM)
            navigate("/login")
        }
        console.log("data: ", data)
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
                                    <Link className="primary-btn" to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Sigh up to enter</h3>

                                <form onSubmit={handleSubmit(handleRegister)} className="row login_form" action="" method="post" id="contactForm">
                                    <div className="col-md-12 form-group">
                                        <input type="email" className="form-control" id="name" name="name" placeholder="Email" {...register("email", { required: "Email address is required" })} />
                                        {errors.email && <span className='error' role="alert">Email address is required</span>}
                                    </div>
                                    <div className="col-md-12 form-group mt-2">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Username" {...register("username", { required: true })} />
                                        {errors.username && <span className='error'>Username is required.</span>}
                                    </div>
                                    <div className="col-md-12 form-group mt-2">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Phone number" {...register("phone", { required: true })} />
                                        {errors.phone && <span className='error'>Phone is required.</span>}
                                    </div>
                                    <div className="col-md-12 form-group mt-2">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Password" {...register("password", { required: true, minLength: 4 })} />
                                        {errors.password?.type === "required" && <span className='error'>Password is required.</span>}
                                        {errors.password?.type === "minLength" && (
                                            <span className="error">Password must be at least 4 characters long.</span>
                                        )}
                                    </div>
                                    <div className="col-md-12 form-group mt-2">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Confirm password" {...register("cfpassword", { required: true })} />
                                        {errors.cfpassword && <span className='error'>Confirm password is required.</span>}
                                    </div>
                                    <div className="col-md-12 form-group mt-4">
                                        <input type="submit" value="Register" className="primary-btn" />
                                        Are you had account?<Link className='text-info' to="/login"> Login</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    )
}
export default Register
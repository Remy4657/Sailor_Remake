import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import { userRegister } from '../service/userService'

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [dataUserRegister, setDataUserRegister] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        let data = { email, username, phone, password, confirmPassword }
        let res = await userRegister(data)
        if (res && res.EC === 0) {
            toast.error(res.EM)
        }
        else {
            toast.success(res.EM)
            navigate("/login")
        }
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
                                    <Link className="primary-btn" to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Sigh up to enter</h3>
                                <form className="row login_form" action="" method="post" id="contactForm">
                                    <div className="col-md-12 form-group">
                                        <input type="email" className="form-control" id="name" name="name" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    {/* <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                            <label for="f-option2">Keep me signed up</label>
                                        </div>
                                    </div> */}
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn" onClick={(e) => { handleRegister(e) }}>Register</button>
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
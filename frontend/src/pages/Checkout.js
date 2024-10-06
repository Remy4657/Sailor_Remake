import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Checkout.scss'
import { useNavigate } from 'react-router-dom'
import { fetchInfoOrder } from "../service/cartService"
import { createOrder, sendEmail } from "../service/orderService"
import { toast } from 'react-toastify'
import { userCheckout } from '../service/userService'
import { fetchCart_Detail } from '../service/cartService'
import { initCart } from '../service/cartService'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form"


const Checkout = () => {

    const navigate = useNavigate()
    const [EC, setEC] = useState(1)
    const [productCheckout, setProductCheckout] = useState({ checkout: [], shipping: 0, totalMoney: 0 })
    const [paymentMethod, setPaymentMethod] = useState()
    const [detailCart, setDetailCart] = useState({})

    const idAccount = useSelector(state => state.user.account.idAccount)
    const username = useSelector(state => state.user.account.username)


    const [dataCheckout, setDataCheckout] = useState({
        firstname: '',
        lastname: '',
        email: username,
        phone: '',
        address: '',
        commune: '',
        district: '',
        city: '',
        codeCart: '',
        idAccount: +idAccount,
        totalMoney: 0
    })
    useEffect(() => {
        if (!username) {
            navigate("/login?redirect=/checkout")
        }

        fetchOrderFunc()
        // fetch detail cart of user to save in order
        // fetchDetailCart()

    }, [])


    const fetchOrderFunc = async () => {
        let res = await fetchInfoOrder({ idAccount })

        setProductCheckout({
            ...productCheckout,
            checkout: res.data.DT,
            shipping: res.data.DT[0].Shipping.value,
            totalMoney: res.data.DT.reduce((total, currentValue, currentIndex) => (total + res.data.DT[currentIndex].Products.price * res.data.DT[currentIndex].Products.Cart_Detail.qty), res.data.DT[0].Shipping.value)
        })
        setDataCheckout({ ...dataCheckout, totalMoney: res.data.DT.reduce((total, currentValue, currentIndex) => (total + res.data.DT[currentIndex].Products.price * res.data.DT[currentIndex].Products.Cart_Detail.qty), res.data.DT[0].Shipping.value) })
    }

    var obj
    // init data to save in order table
    const fetchDetailCart = async () => {
        const res_detail_cart = await fetchCart_Detail(idAccount)
        const cartDetailsObject = res_detail_cart.data.DT.reduce((arr_ini, item, index) => {
            arr_ini[`Product${index + 1}`] = { name: item.Products.name, qty: item.Products.Cart_Detail.qty };
            return arr_ini;
        }, {});
        obj = {
            cartId: res_detail_cart.data.DT[0].id,
            infoOrder: JSON.stringify(cartDetailsObject),
            totalMoney: res_detail_cart.data.DT[0].totalMoney,
            // + 10 && res_detail_cart.data.DT[0].Shipping.id == 1)
            // || (res_detail_cart.data.DT[0].totalMoney + 15 && res_detail_cart.data.DT[0].Shipping.id == 2),
            email: res_detail_cart.data.DT[0].email,
            address: res_detail_cart.data.DT[0].address,
            phone: res_detail_cart.data.DT[0].phone
        }
        //console.log("obj: ", obj)
        //setDetailCart(obj)
    }
    const handleProceed = async (data) => {
        let res = await userCheckout({ ...dataCheckout, ...data, idPayment: paymentMethod })
        console.log("data Checkout: ", dataCheckout)
        if (res && res.EC === 0) {
            setEC(0)
            toast.error(res.EM)
        }
        await fetchDetailCart()
        let resCreateOrder = await createOrder(obj)
        await sendEmail(+idAccount)
        // khoi tao gio hang moi
        await initCart({ idAccount: +idAccount })

        navigate("/thank-you")
    }

    const preventF = (e) => {
        console.log('ec: ', EC)
        if (EC == 0) {
            e.preventDefault()
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
            {/* <!-- Start Banner Area --> */}
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Checkout</h1>
                            <nav className="d-flex align-items-center">
                                <a href="index.html">Home<span className="lnr lnr-arrow-right"></span></a>
                                <a href="single-product.html">Checkout</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Banner Area -->

    <!--================Checkout Area =================--> */}
            <section className="checkout_area section_gap">
                <div className="container">

                    <div className="billing_details">
                        <div className="row">
                            <div className="col-lg-8">
                                <h3>Billing Details</h3>
                                {/* <form className="row contact_form" action="#" method="post">
                                    <div className="col-md-6 form-group p_star">
                                        <input required="true" placeholder='Firstname' type="text" className="form-control" id="first" name="name" onChange={(e) => setDataCheckout({ ...dataCheckout, firstname: e.target.value })} />
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input placeholder='Lastname' type="text" className="form-control" id="last" name="name" onChange={(e) => setDataCheckout({ ...dataCheckout, lastname: e.target.value })} />
                                    </div>

                                    <div className="col-md-6 form-group p_star">
                                        <input placeholder='Phone number' type="text" className="form-control" id="number" name="number" onChange={(e) => setDataCheckout({ ...dataCheckout, phone: e.target.value })} />
                                    </div>


                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='Address' type="text" className="form-control" id="nha" name="nha" onChange={(e) => setDataCheckout({ ...dataCheckout, address: e.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='Commune' type="text" className="form-control" id="xa" name="xa" onChange={(e) => setDataCheckout({ ...dataCheckout, commune: e.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='District' type="text" className="form-control" id="district" name="district" onChange={(e) => setDataCheckout({ ...dataCheckout, district: e.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='City' type="text" className="form-control" id="city" name="city" onChange={(e) => setDataCheckout({ ...dataCheckout, city: e.target.value })} />
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="zip" name="zip" placeholder="Postcode/ZIP" onChange={(e) => setDataCheckout({ ...dataCheckout, codeCart: e.target.value })} />
                                    </div>
                                    <div className="col-md-12 form-group">

                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <h3>Shipping Details</h3>
                                            <input type="checkbox" id="f-option3" name="selector" />
                                            <label for="f-option3">Ship to a different address?</label>
                                        </div>
                                        <textarea className="form-control" name="message" id="message" rows="1" placeholder="Order Notes"></textarea>
                                    </div>
                                </form> */}

                                <form className="row contact_form" action="#" method="post" onSubmit={handleSubmit(handleProceed)}>
                                    <div className="col-md-6 form-group p_star">
                                        <input required="true" placeholder='Firstname' type="text" className="form-control" id="first" name="name" {...register("firstname", { required: true })} />
                                        {errors.firstname && <span className='error' role="alert">Firstname is required.</span>}
                                    </div>
                                    <div className="col-md-6 form-group p_star">
                                        <input placeholder='Lastname' type="text" className="form-control" id="last" name="name"  {...register("lastname", { required: true })} />
                                        {errors.lastname && <span className='error' role="alert">Lastname is required</span>}
                                    </div>

                                    <div className="col-md-6 form-group p_star">
                                        <input placeholder='Phone number' type="text" className="form-control" id="number" name="number"  {...register("phone", { required: true })} />
                                        {errors.phone && <span className='error' role="alert">Phone number is required</span>}
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='Address' type="text" className="form-control" id="nha" name="nha"  {...register("address", { required: true })} />
                                        {errors.address && <span className='error' role="alert">Address is required</span>}
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='Commune' type="text" className="form-control" id="xa" name="xa"  {...register("commune", { required: true })} />
                                        {errors.commune && <span className='error' role="alert">Commune is required</span>}
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='District' type="text" className="form-control" id="district" name="district"  {...register("district", { required: true })} />
                                        {errors.district && <span className='error' role="alert">District is required</span>}
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <input placeholder='City' type="text" className="form-control" id="city" name="city" {...register("city", { required: true })} />
                                        {errors.city && <span className='error' role="alert">City is required</span>}
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="zip" name="zip" placeholder="Postcode/ZIP" />
                                    </div>
                                    <div className="col-md-12 form-group">

                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <h3>Shipping Details</h3>
                                            <input type="checkbox" id="f-option3" name="selector" />
                                            <label for="f-option3">Ship to a different address?</label>
                                        </div>
                                        <textarea className="form-control" name="message" id="message" rows="1" placeholder="Order Notes"></textarea>
                                    </div>

                                    <div className="col-md-12 form-group mt-4">
                                        <input type="submit" value="CHECKOUT" className="primary-btn" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4">
                                <div className="order_box">
                                    <h2>Your Order</h2>
                                    <ul className="list">
                                        <li><a href="#">Product <span>Total</span></a></li>
                                        {productCheckout.checkout.map((item, index) => {
                                            //   a = a + item.Products.price * item.Products.Cart_Detail.qty + productCheckout[0].Shipping.value

                                            return (
                                                <li key={`key-${index}`}><a href='#'>{item.Products.name}<span className="middle">x {item.Products.Cart_Detail.qty}</span><span className="last">${item.Products.Cart_Detail.qty * item.Products.price}</span></a></li>

                                            )
                                        })}

                                    </ul>
                                    <ul className="list list_2">


                                        <li><a href='#'>Shipping: <span>${productCheckout.shipping}</span></a></li>
                                        {/* <li><a href="#">Shipping <span>{productCheckout[0].Shipping.method}: ${productCheckout[0].Shipping.value}.00</span></a></li> */}



                                        <li><a href="#">Total <span>${productCheckout.totalMoney}</span></a></li>
                                    </ul>
                                    <div className="payment_item">
                                        <div className="radion_btn">
                                            <input type="radio" id="f-option5" name="selector" value={1} onChange={(e) => { setPaymentMethod(e.target.value) }} />
                                            <label for="f-option5">Check payments</label>
                                            <div className="check"></div>
                                        </div>
                                        <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                            Store Postcode.</p>
                                    </div>
                                    <div className="payment_item active">
                                        <div className="radion_btn">
                                            <input type="radio" id="f-option6" name="selector" value={2} onChange={(e) => { setPaymentMethod(e.target.value) }} />
                                            <label for="f-option6">Paypal </label>
                                            <img src="img/product/card.jpg" alt="" />
                                            <div className="check"></div>
                                        </div>
                                        <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                            account.</p>
                                    </div>
                                    <div className="creat_account">
                                        <input type="checkbox" id="f-option4" name="selector" />
                                        <label for="f-option4">I’ve read and accept the </label>
                                        <a href="#">terms & conditions*</a>
                                    </div>
                                    {/* <div onClick={() => handleProceed()}>
                                        <Link className="primary-btn" to="/thank-you" onClick={(e) => preventF(e)}>Thanh toán</Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================End Checkout Area =================--> */}
        </>
    )
}
export default Checkout
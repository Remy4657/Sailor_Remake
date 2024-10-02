import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"

import { fetchInfoOrder } from "../service/cartService"

const ConfirmPayment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [productCheckout, setProductCheckout] = useState({ checkout: [], shipping: 0, totalMoney: 0 })
    const [infoOrder, setInfoOrder] = useState({})
    var shipping = 0
    var tt = 0
    const idAccount = useSelector(state => state.user.account.idAccount)
    const username = useSelector(state => state.user.account.username)


    useEffect(() => {
        if (!username) {
            navigate("/login?redirect=/thank-you")
        }
        //fetchCartF()
        fetchOrderFunc()

    }, [])
    let inforOrder
    const fetchOrderFunc = async () => {
        //alert('me')
        let res = await fetchInfoOrder({ idAccount })
        console.log('res fetch order thankyou: ', res.data.DT)
        //setInfoOrder(res.data.DT[0])
        inforOrder = res.data.DT[0]
        setProductCheckout({
            ...productCheckout,
            checkout: [...res.data.DT],
            shipping: res.data.DT[0].Shipping.value,
            totalMoney: res.data.DT.reduce((total, currentValue, currentIndex) => (total + res.data.DT[currentIndex].Products.price * res.data.DT[currentIndex].Products.Cart_Detail.qty), res.data.DT[0].Shipping.value)
        })
        console.log('infor order: ', inforOrder)
    }
    return (
        <>
            {/* <!-- Start Banner Area --> */}
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Confirmation</h1>
                            <nav className="d-flex align-items-center">
                                <a href="index.html">Home<span className="lnr lnr-arrow-right"></span></a>
                                <a href="category.html">Confirmation</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Banner Area -->

	<!--================Order Details Area =================--> */}
            <section className="order_details section_gap">
                <div className="container">
                    <h3 className="title_confirmation">Thank you. Your order has been received.</h3>
                    <div className="row order_d_inner">
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Order Info</h4>
                                <ul className="list">

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="details_item">
                                <h4>Billing Address</h4>
                                <ul className="list">

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="order_details_table">
                        <h2>Order Details</h2>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productCheckout.checkout.map((item, index) => (
                                        <tr key={`key-${index}`}>
                                            <td>
                                                <p>{item.Products.name}</p>
                                            </td>
                                            <td>
                                                <h5>x {item.Products.Cart_Detail.qty}</h5>
                                            </td>
                                            <td>
                                                <p>${item.Products.Cart_Detail.qty * item.Products.price}</p>
                                            </td>
                                        </tr>
                                    ))}


                                    <tr>
                                        <td>
                                            <h4>Shipping</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>${productCheckout.shipping}.00</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Total</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>${productCheckout.totalMoney}.00</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--================End Order Details Area =================--> */}
        </>
    )
}
export default ConfirmPayment
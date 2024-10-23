
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { addToCart } from "../service/cartService"
import { ADD_TO_CART } from "../redux/actions/action"
import { fetchCart } from "../service/cartService"

const Product = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { item } = props

    // convert from string to array
    if (item.imageReview !== "") {
        const items = JSON.parse(item.imageReview)

        //console.log("item: ", items)
    }

    // let idAccount = sessionStorage.getItem("idAccount")
    const idAccount = useSelector((state) => state.user.account.idAccount);

    let cart = useSelector((state) => state.user.cart)

    const addCart = async (e) => {

        if (idAccount && idAccount !== "") {
            const existItem = cart.find((x) => x.Products.id === item.id);
            const qty = existItem ? existItem.Products.Cart_Detail.qty + 1 : 1;

            e.preventDefault()
            await addToCart({ ...item, idAccount: +idAccount }) //, lengCartAll: lengthCart

            let a = []

            const fetchCartF = async () => {

                let resCart = await fetchCart({ idAccount })
                let tt = 0
                if (resCart && resCart.data.DT) {
                    resCart.data.DT.map((item, index) => {
                        if (item.Products.name != null && item.User.id != null) {
                            a.push(item)
                            tt = tt + item.Products.price * item.Products.Cart_Detail.qty
                        }
                    })
                }
            }
            // get cart info to update cart 
            await fetchCartF()

            dispatch(ADD_TO_CART(a))
            toast.success('Add product to cart success!')
        }
        else {
            navigate("/login?redirect=/cart")
        }


    }
    return (
        <div className="col-lg-3 col-md-6">
            <div className="single-product">
                <div className="d-flex flex-column">
                    <img className="img-fluid" src={item.image} alt="" />
                </div>
                <div className="product-details">
                    <h6>{item.name}</h6>
                    <div className="price">
                        <h6>{item.price} đ</h6>
                        <h6 className="l-through">{item.priceOld} đ</h6>
                    </div>
                    <div className="prd-bottom">
                        <a href="" className="social-info" onClick={(e) => addCart(e)}>
                            <span className="ti-bag"><i className="fa-solid fa-cart-shopping"></i></span>
                            <p className="hover-text">add to bag</p>
                        </a>
                        <a href="" className="social-info">
                            <span className="lnr lnr-heart"><i className="fa-regular fa-heart"></i></span>
                            <p className="hover-text">Wishlist</p>
                        </a>
                        <a href="" className="social-info">
                            <span className="lnr lnr-sync"><i className="fa-solid fa-arrows-rotate"></i></span>
                            <p className="hover-text">compare</p>
                        </a>
                        <a href="" className="social-info">
                            <span className="lnr lnr-move"><i className="fa-solid fa-info"></i></span>
                            <p className="hover-text"><Link to={`/product/detail/${item.id}`} state={{ item: item }}>view more</Link></p>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Product
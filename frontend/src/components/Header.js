import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { LOGOUT } from "../redux/actions/action";
import { INITIAL_LIST_PRODUCT } from "../redux/actions/action";
import './Header.scss'
import { fetchAllProduct } from "../service/productService";
import { userLogout } from "../service/userService";
import Autocomplete from "./Autocomplete/Autocomplete";

const Header = () => {
    //const useSelector = useSelector()
    const isAuth = useSelector(state => state.user.auth)
    const [isShowSearch, setIsShowSearch] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.account.username);
    const cart = useSelector(state => state.user.cart)
    const refListProduct = useRef()
    const defaultFocusList = {
        isFocusHome: true,
        isShop: false,
        isFocusAbout: false,
        isFocusContact: false,
        isFocusBlog: false,
        isFocusCart: false,
    }
    const [focusList, setFocusList] = useState(defaultFocusList)
    const [isShowSidebar, setIsShowSidebar] = useState(false)

    const handleLogout = async (e) => {
        e.preventDefault()
        await userLogout()

        dispatch(LOGOUT())
        navigate('/login')
    }

    const fetchProducts = async () => {
        let res = await fetchAllProduct()
        //let res = await fetchAllUser()
        if (res && res.data.DT) {
            refListProduct.current = res.data.DT
            // console.log('all data: ', res.data.DT)
            dispatch(INITIAL_LIST_PRODUCT(res.data.DT))

        }
    }
    const handleFocusClick = (field) => {
        setFocusList({
            isFocusHome: false,
            isShop: false,
            isFocusAbout: false,
            isFocusContact: false,
            isFocusBlog: false,
            isFocusCart: false,
            [field]: true
        })
    }
    const handleBarOnclick = () => {
        setIsShowSidebar(true)
    }
    const handleCloseClick = () => {
        setIsShowSidebar(false)

    }

    return (
        <div>
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">

                        <h1 className="logo me-auto"><Link to="#">Sailor</Link></h1>

                        <Link to="index.html" className="logo me-auto"><img src="../assets/img/logo.png" alt="" className="img-fluid" /></Link>

                        <nav id="navbar" className="navbar navbar-user">
                            <div className={isShowSidebar ? "div-ul" : "div-ul d-none-cus"}>
                                <ul className={"ul"}>

                                    <li className="d-flex justify-content-between">
                                        <Link className={focusList.isFocusHome ? "active" : ""} to="/" onClick={() => handleFocusClick("isFocusHome")}>HOME</Link>
                                        <i class="fa-solid fa-xmark d-none-cus-close" onClick={handleCloseClick}
                                            style={{ cursor: "pointer", padding: "10px", height: "fit-content", fontSize: "20px" }}></i>

                                    </li>

                                    <li className="dropdown"><Link to="#" className={focusList.isShop ? "active" : ""}><span>SHOP</span> <i className="fa-solid fa-chevron-down"></i></Link>
                                        <ul>
                                            <li><Link to="/category" className={focusList.isShop ? "active" : ""} onClick={() => handleFocusClick("isShop")}>SHOP CATEGORY</Link></li>
                                            <li className="dropdown"><Link to="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></Link>
                                                <ul>
                                                    <li><Link to="#">Deep Drop Down 1</Link></li>
                                                    <li><Link to="#">Deep Drop Down 2</Link></li>
                                                    <li><Link to="#">Deep Drop Down 3</Link></li>
                                                    <li><Link to="#">Deep Drop Down 4</Link></li>
                                                    <li><Link to="#">Deep Drop Down 5</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><Link to="/about" className={focusList.isFocusAbout ? "active" : ""} onClick={() => handleFocusClick("isFocusAbout")}>ABOUT</Link></li>
                                    <li><Link to="/blog" className={focusList.isFocusBlog ? "active" : ""} onClick={() => handleFocusClick("isFocusBlog")}>BLOG</Link></li>
                                    <li><Link to="/contact" className={focusList.isFocusContact ? "active" : ""} onClick={() => handleFocusClick("isFocusContact")}>CONTACT</Link></li>
                                    <li className="search"><i className="fa-solid fa-magnifying-glass"
                                        onClick={() => {
                                            fetchProducts()
                                            setIsShowSearch(!isShowSearch)

                                        }}></i></li>
                                    <li className="cart">
                                        <Link to="/cart" className={focusList.isFocusCart ? "active" : ""} onClick={() => handleFocusClick("isFocusCart")}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <span>{isAuth && cart.length}</span>
                                        </Link>
                                    </li>


                                    {username ? <li className="dropdown"><Link className="getstarted ">{username}</Link>
                                        <ul>
                                            <li><Link to="/profile">Thông tin tài khoản</Link></li>
                                            <li><Link to="/order">Đơn hàng đã mua</Link></li>
                                            <li><Link to="/" onClick={(e) => handleLogout(e)}>Log out</Link></li>


                                        </ul>
                                    </li> : <li><Link to="/login" className="getstarted">LOGIN</Link></li>}


                                </ul>
                            </div>

                            <i className="fa-solid fa-bars bi bi-list mobile-nav-toggle" onClick={handleBarOnclick}></i>

                        </nav>

                    </div>

                    {/* <input value={valueSearch} onChange={(e) => handleSearchOnchange(e)} onKeyUp={(e) => handleSearch(e)} className={isShowSearch ? "input-search show" : "input-search hidden"} type="text" placeholder="Search product..." /> */}
                    {isShowSearch && <Autocomplete setIsShowSearch={setIsShowSearch} />}

                    {/* <ul>
                        {listSuggest.map((item, index) => <li key={`li ${index}`}>{item.name}</li>)}
                    </ul> */}
                </header>

            </div>


        </div>

    )
}
export default Header


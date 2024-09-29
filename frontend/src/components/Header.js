import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LOGOUT } from "../redux/actions/action";
import { INITIAL_LIST_PRODUCT } from "../redux/actions/action";
import './Header.scss'
import { fetchAllProduct } from "../service/productService";
import { userLogout } from "../service/userService";

const Header = () => {
    //const useSelector = useSelector()
    const isAuth = useSelector(state => state.user.auth)
    const [isShowSearch, setIsShowSearch] = useState(false)
    const [valueSearch, setValueSearch] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.account.username);
    const listProduct = useSelector((state) => state.user.listProduct);
    const cart = useSelector(state => state.user.cart)

    // when refresh => get user info was saved at session to avoid lost info user
    useEffect(() => {
        // if (sessionStorage.getItem("username") !== null && sessionStorage.getItem("email") !== null &&
        //     sessionStorage.getItem("idAccount") !== null && sessionStorage.getItem("role") !== null) {
        //     const userInfo = {
        //         Roles: {
        //             name: sessionStorage.getItem("role")
        //         },
        //         email: sessionStorage.getItem("email"),
        //         username: sessionStorage.getItem("username"),
        //         id: sessionStorage.getItem("idAccount")
        //     }
        //     dispatch(
        //         FETCH_DATA_SUCCESS(
        //             //sessionStorage.getItem("userAccount"),
        //             userInfo
        //         )
        //     );
        // }
    }, []);


    const handleLogout = async (e) => {
        e.preventDefault()
        await userLogout()

        dispatch(LOGOUT())
        navigate('/login')
    }
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            const filterListProduct = listProduct.filter(item => item.name.includes(valueSearch.toLocaleUpperCase()) === true || item.name.includes(valueSearch.toLowerCase()) === true)
            dispatch(INITIAL_LIST_PRODUCT(filterListProduct))
        }
    }
    const fetchProducts = async () => {
        let res = await fetchAllProduct()
        //let res = await fetchAllUser()
        if (res && res.data.DT) {

            // console.log('all data: ', res.data.DT)
            dispatch(INITIAL_LIST_PRODUCT(res.data.DT))

        }
    }

    return (
        <div>
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">

                        <h1 className="logo me-auto"><a href="#">Sailor</a></h1>

                        <a href="index.html" className="logo me-auto"><img src="../assets/img/logo.png" alt="" className="img-fluid" /></a>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li>
                                    <Link className="active" to="/">HOME</Link>

                                </li>

                                <li className="dropdown"><a href="#"><span>SHOP</span> <i className="fa-solid fa-chevron-down"></i></a>
                                    <ul>
                                        <li><Link to="/category">SHOP CATEGORY</Link></li>
                                        <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                                <li><a href="#">Deep Drop Down 1</a></li>
                                                <li><a href="#">Deep Drop Down 2</a></li>
                                                <li><a href="#">Deep Drop Down 3</a></li>
                                                <li><a href="#">Deep Drop Down 4</a></li>
                                                <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><Link href="/about">ABOUT</Link></li>
                                <li><Link to="/blog">BLOG</Link></li>
                                <li><Link to="/contact">CONTACT</Link></li>
                                <li className="search"><i className="fa-solid fa-magnifying-glass"
                                    onClick={() => {
                                        fetchProducts()
                                        setIsShowSearch(!isShowSearch)

                                    }}></i></li>
                                <li className="cart">
                                    <Link to="/cart">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <span>{isAuth && cart.length}</span>
                                    </Link>
                                </li>
                                {username ? <li className="dropdown"><Link className="getstarted ">{username}</Link>
                                    <ul>
                                        <li><Link to="/" onClick={(e) => handleLogout(e)}>Log out</Link></li>


                                    </ul>
                                </li> : <li><Link to="/login" className="getstarted">LOGIN</Link></li>}
                                {/* <li><Link to="/login" className="getstarted">LOGIN</Link></li> */}
                            </ul>
                            <i className="fa-solid fa-bars bi bi-list mobile-nav-toggle"></i>

                        </nav>

                    </div>

                    <input value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} onKeyUp={(e) => handleSearch(e)} className={isShowSearch ? "input-search show" : "input-search hidden"} type="text" placeholder="Search product..." />
                </header>

            </div>


        </div>

    )
}
export default Header


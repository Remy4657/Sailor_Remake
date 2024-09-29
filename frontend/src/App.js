
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/main.css'
import { sendIdAccount } from "./service/userService";

import Home from './pages/Home';
import Header from './components/Header';
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import About from './pages/About';
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";

import Register from "./pages/Register";

import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import ConfirmPayment from "./pages/ConfirmPayment";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Product from "./pages/admin/Product/Product";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchCart, fetchAllCart } from "./service/cartService"
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { INITIAL_CART_REDUX, INITIAL_CARTALL_REDUX, FETCH_DATA_SUCCESS } from "./redux/actions/action"
import { refresh } from "./service/userService";
import Pagination from "./components/Pagination";



function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { search } = useLocation();
  const idAccount = useSelector(state => state.user.account.idAccount)
  const role = useSelector(state => state.user.role)
  const dispatch = useDispatch()

  const nonSecurePaths = ['/register'] // khais bao nhung trang nao khi refresh maf chua login thif da ve trang login
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const isAdminRoute = location.pathname.startsWith('/admin')
  var a = []

  //let idAccount = sessionStorage.getItem("idAccount")

  const handleRefresh = async () => {
    const res = await refresh()

    if (res.EC === 1) {
      const userInfo = {
        Roles: {
          name: res.DT.userRole.Roles.name
        },
        email: res.DT.userRole.email,
        username: res.DT.userRole.username,
        id: res.DT.userRole.id
      }
      dispatch(
        FETCH_DATA_SUCCESS(
          //sessionStorage.getItem("userAccount"),
          userInfo
        )
      );

    }
    else {
      const IsNotTrueWebToNavigate = nonSecurePaths.find((item) => item === window.location.pathname)
      if (IsNotTrueWebToNavigate) {
        navigate("/login")
      }

    }
  }
  useEffect(() => {
    // sendIdAccount()
    // if (!username) {
    //   navigate("/login?redirect=/cart")
    // }
    handleRefresh()
    fetchCartF()  // khi refresh ma khong fetch cart thif ko update dc so luong item hien o header vi init cart o hom no se chay truoc init cart o App.js nen khong co idaccount o trang home.js
  }, [idAccount])

  // const sendIdAccount = async () => {
  //   await sendIdAccount({ idAccount: idAccount })
  // }

  const fetchCartF = async () => {

    let resCart = await fetchCart({ idAccount })
    let tt = 0
    a = []
    if (resCart && resCart.data.DT) {
      // dispatch(INITIAL_CARTALL_REDUX(resCart.data.DT))
      resCart.data.DT.map((item, index) => {
        if (item.Products.name != null && item.User.id != null) {
          a.push(item)
          tt = tt + item.Products.price * item.Products.Cart_Detail.qty
        }
      })
    }
    dispatch(INITIAL_CART_REDUX(a))
  }
  const fetchAllCartF = async () => {
    let res = await fetchAllCart()
    if (res && res.data.DT) {
      dispatch(INITIAL_CARTALL_REDUX(res.data.DT))
    }
  }

  return (
    <div className="">

      <div>
        {!isAdminRoute &&
          <Header />}
        <Routes>
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/thank-you" element={<ConfirmPayment />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/product/detail/:id" element={<ProductDetail />} />
          <Route exact path='/login' element={<UserRoute />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pa" element={<Pagination />} />
          {/* admin */}
          <Route exact path="/admin/login" element={<AdminLogin />} />

          <Route exact path='/admin/dashboard' element={<AdminRoute />}>
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/admin/product" element={<Product />} />

        </Routes>
        {!isAdminRoute && <Footer />}
      </div>

      <div>

      </div>


    </div>
  );
}

export default App;

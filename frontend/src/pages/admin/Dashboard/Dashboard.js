import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import "../css/styles_admin.css"
//import styles from "./css/styles_admin.module.css";
import { useState, useEffect, useRef } from "react"
import { fetchAllProduct } from "../../../service/admin/productService"
import { deleteProduct } from "../../../service/admin/adminService"
import ModalDelete from "./ModalDelete";
import ModalProduct from "./ModalProduct";
import { fetchAllCategory } from "../../../service/admin/adminService";
import { userLogout } from "../../../service/admin/adminService";
import { LOGOUT } from "../../../redux/actions/action";
import { fetchAllOrder } from "../../../service/admin/adminService";

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [listOrder, setListOrder] = useState([])
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [action, setAction] = useState('Create')
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState()
    const [dataEdit, setDataEdit] = useState('')
    const [listProduct, setListProduct] = useState([])
    const [filterListOrder, setFilterListOrder] = useState([]);
    const [keySearch, setKeySearch] = useState("")
    const [page, setPage] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(10)
    const refListOrder = useRef()
    const account = useSelector(state => state.user.account)

    const handleSidebarClick = () => {
        setToggleSidebar(!toggleSidebar)
    }

    useEffect(() => {
        fetchOrder()
    }, [])


    //phan trang, item per page, fetch list product lan dau load
    useEffect(() => {
        //setListProduct(listProductRedux)
        setFilterListOrder(
            listOrder.filter((item, index) => (index >= page * itemPerPage) && (index < (page + 1) * itemPerPage)
            )
        );
    }, [page, itemPerPage, listOrder]);

    const fetchOrder = async () => {
        let res = await fetchAllOrder()
        console.log("res order: ", res)
        if (res && res.data.DT) {
            refListOrder.current = res.data.DT
            setListOrder(res.data.DT)
        }
    }
    // handle modal
    const handleEdit = (item) => {
        setAction('Update')
        setIsShowModalCreate(true)
        setDataEdit(item)
    }
    const handleDelete = (item) => {
        setDataModalDelete(item)
        setIsShowModalDelete(true)
    }
    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false)
    }
    const handleShowModalDelete = () => {
        setIsShowModalDelete(true)
    }
    const confirmDelete = async () => {
        let response = await deleteProduct(dataModalDelete)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            fetchOrder()
        }
        else {
            toast.error('error delete')
        }
        setIsShowModalDelete(false)
    }
    const handleShowModalCreate = () => {
        setAction('Create')
        setIsShowModalCreate(true)
    }
    const handleCloseModalCreate = () => {
        setIsShowModalCreate(false)
        // khi dong modal sưa thi set data edit bang rong de khong doc data khi add new ngay sau khi sua
        setDataEdit({})
        // them xong thi goi lai de fetch user
        // fetchUsers()

    }
    const ItemPerPageOnchange = (e) => {
        const ItemPerPage = e.target.value
        setItemPerPage(ItemPerPage)
    }
    function handleSearch(e) {
        if (e.key === 'Enter') {
            const listProductFilterSearch = refListOrder.current.filter(item => item.infoOrder.toLowerCase().includes(keySearch.toLowerCase()))
            setListOrder(listProductFilterSearch)
        }
    }
    const handleLogout = async (e) => {
        e.preventDefault()
        await userLogout()
        dispatch(LOGOUT())
        navigate('/admin/login')
    }

    return (
        <div class={toggleSidebar ? "sb-nav-fixed sb-sidenav-toggled" : "sb-nav-fixed"}>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* <!-- Navbar Brand--> */}
                <a class="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
                {/* Sidebar Toggle */}
                <button
                    class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                    id="sidebarToggle" href="#!"
                    onClick={() => handleSidebarClick()}
                >
                    <i class="fas fa-bars"></i>
                </button>
                {/* <!-- Navbar Search--> */}
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </form>
                {/* <!-- Navbar--> */}
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">{account.username}</a></li>
                            <li><a class="dropdown-item" href="#!" onClick={(e) => handleLogout(e)}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                                <div class="sb-sidenav-menu-heading">Core</div>
                                <Link class="nav-link" to="/admin/dashboard">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </Link>
                                <Link class="nav-link" to="/admin/product">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Product
                                </Link>
                                <div class="sb-sidenav-menu-heading">Interface</div>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                    Layouts
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="layout-static.html">Static Navigation</a>
                                        <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                    </nav>
                                </div>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                    Pages
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                    <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                            Authentication
                                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                        </a>
                                        <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                            <nav class="sb-sidenav-menu-nested nav">
                                                <a class="nav-link" href="login.html">Login</a>
                                                <a class="nav-link" href="register.html">Register</a>
                                                <a class="nav-link" href="password.html">Forgot Password</a>
                                            </nav>
                                        </div>
                                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                            Error
                                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                        </a>
                                        <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                            <nav class="sb-sidenav-menu-nested nav">
                                                <a class="nav-link" href="401.html">401 Page</a>
                                                <a class="nav-link" href="404.html">404 Page</a>
                                                <a class="nav-link" href="500.html">500 Page</a>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>
                                <div class="sb-sidenav-menu-heading">Addons</div>
                                <a class="nav-link" href="charts.html">
                                    <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                    Charts
                                </a>
                                <a class="nav-link" href="tables.html">
                                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                    Tables
                                </a>
                            </div>
                        </div>
                        <div class="sb-sidenav-footer">

                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                            <div class="row">
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-primary text-white mb-4">
                                        <div class="card-body">Primary Card</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-warning text-white mb-4">
                                        <div class="card-body">Warning Card</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-success text-white mb-4">
                                        <div class="card-body">Success Card</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card bg-danger text-white mb-4">
                                        <div class="card-body">Danger Card</div>
                                        <div class="card-footer d-flex align-items-center justify-content-between">
                                            <a class="small text-white stretched-link" href="#">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <i class="fas fa-chart-area me-1"></i>
                                            Area Chart Example
                                        </div>
                                        <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <i class="fas fa-chart-bar me-1"></i>
                                            Bar Chart Example
                                        </div>
                                        <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>

                                </div>
                                <div class="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex">
                                            <div style={{ width: "100px" }} className="">

                                                <select onChange={(e) => ItemPerPageOnchange(e)} aria-label="Default select example" className="form-select w-15">
                                                    <option selected value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="50">50</option>
                                                </select>

                                            </div>
                                            <div className="ms-3"><button className="btn btn-primary" >
                                                <i class="fa-solid fa-plus pe-2"></i>
                                                Add order
                                            </button></div>
                                        </div>
                                        <div style={{ width: "300px" }}>
                                            <input type="text" placeholder="Search..." className="form-control"
                                                onChange={(e) => setKeySearch(e.target.value)}
                                                onKeyDown={(e) => handleSearch(e)} />
                                        </div>
                                    </div>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr style={{ borderWidth: "1px" }}>
                                                <th>Stt</th>
                                                <th>Thông tin sản phẩm</th>
                                                <th>Tổng tiền</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Địa chỉ</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterListOrder && filterListOrder.length > 0 ?
                                                <>
                                                    {
                                                        filterListOrder.map((item, index) => {
                                                            return (
                                                                <tr key={`row ${index}`} >
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{item.infoOrder}</td>
                                                                    <td>{item.totalMoney}</td>
                                                                    <td>{item.phone}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.address}</td>
                                                                    <td className="d-flex">
                                                                        <button className="btn btn-warning me-3" onClick={() => handleEdit(item)}>
                                                                            <i class="fa-solid fa-pencil"></i>
                                                                        </button>
                                                                        <button className="btn btn-danger" onClick={() => handleDelete(item)}>
                                                                            <i class="fa-solid fa-trash"></i>
                                                                        </button>
                                                                    </td>

                                                                </tr>
                                                            )
                                                        })}
                                                </>
                                                :
                                                <>

                                                    <tr>
                                                        <td>
                                                            List order not found
                                                        </td>
                                                    </tr>
                                                </>
                                            }

                                        </tbody>
                                    </table>
                                    <ReactPaginate
                                        containerClassName={"pagination"}
                                        pageClassName={"page-item"}
                                        activeClassName={"active-pagination"}
                                        onPageChange={(event) => setPage(event.selected)}
                                        pageCount={Math.ceil(listOrder.length / itemPerPage)}
                                        breakLabel="..."
                                        previousLabel={<i className="fas fa-chevron-left" ></i>}
                                        nextLabel={<i className="fas fa-chevron-right"></i>}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2023</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>


        </div>
    )
}
export default Dashboard
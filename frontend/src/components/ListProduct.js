import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './owl.carousel.css'
import './ListProduct.scss'
import Product from './Products'
import ReactPaginate from "react-paginate";
import '../service/productService'
import { fetchAllProduct } from '../service/productService'
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL_LIST_PRODUCT } from '../redux/actions/action'


const ListProduct = () => {
    const dispatch = useDispatch()

    const [page, setPage] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(8)
    const [filterData, setFilterData] = useState([]);
    const [listProduct, setListProduct] = useState([])
    const [typeProduct, setTypeProduct] = useState("all")
    const [price, setPrice] = useState({
        start: null,
        end: null
    })

    let listProductRedux = useSelector((state) => state.user.listProduct)


    useEffect(() => {
        setListProduct(listProductRedux)
    }, [listProductRedux])

    // phan trang, item per page, click category, fetch data
    useEffect(() => {
        //setListProduct(listProductRedux)
        setFilterData(
            listProduct.filter((item, index) => (index >= page * itemPerPage) && (index < (page + 1) * itemPerPage)
            )
        );
    }, [page, listProductRedux, itemPerPage, listProduct]);

    const fetchProducts = async () => {
        let res = await fetchAllProduct()
        //let res = await fetchAllUser()
        if (res && res.data.DT) {

            // console.log('all data: ', res.data.DT)
            dispatch(INITIAL_LIST_PRODUCT(res.data.DT))

        }
    }
    useEffect(() => {
        fetchProducts()

    }, [])
    const handleClickAllProduct = (e) => {
        e.preventDefault()
        setPage(0)
        setListProduct(listProductRedux)
        setPrice({ start: "", end: "" })
        setTypeProduct("all")
    }
    const handleClickAdidas = (e) => {
        e.preventDefault()
        setPage(0)

        // cập nhật lại list product khi xong moi lan lap, de lap tren list product do
        //setFilterData(listProductRedux)
        //setListProduct(listProductRedux)
        const listProductAdidas = listProductRedux.filter(item => item.categoryId === 1)
        setListProduct(listProductAdidas)
        setPrice({ start: "", end: "" })

        // cai nay de css khi click
        setTypeProduct("adidas")
    }

    const handleClickNike = (e) => {

        e.preventDefault()
        setPage(0)
        // cập nhật lại list product khi xong moi lan lap, de lap tren list product do
        //setFilterData(listProductRedux)
        //setListProduct(listProductRedux)
        const listProductNike = listProductRedux.filter(item => item.categoryId === 2)
        //setListProduct(listProductNike)
        setListProduct(listProductNike)
        setPrice({ start: "", end: "" })


        setTypeProduct("nike")
    }
    const handleClickPuma = (e) => {
        e.preventDefault()
        setPage(0)
        // cập nhật lại list product khi xong moi lan lap, de lap tren list product do
        //setFilterData(listProductRedux)
        //setListProduct(listProductRedux)
        const listProductPuma = listProductRedux.filter(item => item.categoryId === 3)
        setListProduct(listProductPuma)
        setPrice({ start: "", end: "" })

        setTypeProduct("puma")
    }

    const ItemPerPageOnchange = (e) => {
        const ItemPerPage = e.target.value
        setItemPerPage(ItemPerPage)
    }
    const SearchPrice = () => {

        const listProductByPrice = listProduct.filter(item => price.start <= item.price && item.price <= price.end)
        setListProduct(listProductByPrice)
    }
    const PriceOnchange = (e) => {
        const { name, value } = e.target;
        setPrice({ ...price, [name]: value })

    }

    return (
        // <!-- start product Area -->

        <>
            {/* < section className="owl-carousel active-product-area section_gap" >
                < div className="single-product-slider" >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <div className="section-title">
                                    <h1>Latest Products</h1>
                                    <p>

                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            {filterData ? filterData.map((item, index) => {
                                return (
                                    <Product key={`key-${index}`} item={item} />

                                )
                            }) : <div></div>}

                        </div>
                    </div>
                </div >
            </section > */}

            <div className="container category-product">
                <h1 style={{ margin: "80px 0", textAlign: "center" }}>All product</h1>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <div className="sidebar-categories">
                            <div className="head">Browse Categories</div>
                            <ul className="main-categories">
                                <li className={typeProduct === "all" ? "main-nav-list active" : "main-nav-list"}>
                                    <Link onClick={(e) => handleClickAllProduct(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                        className="lnr lnr-arrow-right"></span>All product<span className="number"></span></Link>
                                </li>
                                <li className={typeProduct === "adidas" ? "main-nav-list active" : "main-nav-list"}>
                                    <Link onClick={(e) => handleClickAdidas(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                        className="lnr lnr-arrow-right"></span>Adidas<span className="number"></span></Link>
                                </li>
                                <li className={typeProduct === "nike" ? "main-nav-list active" : "main-nav-list"} >
                                    <Link onClick={(e) => handleClickNike(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                        className="lnr lnr-arrow-right"></span>Nike<span className="number"></span></Link>
                                </li>
                                <li className={typeProduct === "puma" ? "main-nav-list active" : "main-nav-list"} >
                                    <Link onClick={(e) => handleClickPuma(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                        className="lnr lnr-arrow-right"></span>Puma<span className="number"></span></Link>
                                </li>

                            </ul>
                        </div>
                        <div className="sidebar-filter mt-50">
                            <div className="top-filter-head">Product Filters</div>

                            {/* <div className="common-filter">
                                <div className="head">Color</div>
                                <form action="#">
                                    <ul>
                                        <li className="filter-list"><input className="pixel-radio" type="radio" id="black" name="color" /><label for="black">Black<span>(29)</span></label></li>
                                        <li className="filter-list"><input className="pixel-radio" type="radio" id="balckleather" name="color" /><label for="balckleather">Black
                                            Leather<span>(29)</span></label></li>
                                        <li className="filter-list"><input className="pixel-radio" type="radio" id="blackred" name="color" /><label for="blackred">Black
                                            with red<span>(19)</span></label></li>
                                        <li className="filter-list"><input className="pixel-radio" type="radio" id="gold" name="color" /><label for="gold">Gold<span>(19)</span></label></li>
                                        <li className="filter-list"><input className="pixel-radio" type="radio" id="spacegrey" name="color" /><label for="spacegrey">Spacegrey<span>(19)</span></label></li>
                                    </ul>
                                </form>
                            </div> */}

                            <div className="common-filter">
                                <div className="head">Price</div>
                                <div className="price-range-area">

                                    <div className="value-wrapper d-flex">
                                        <div id="lower-value">
                                            <input type='number' className='form-control' value={price.start} onChange={(e) => PriceOnchange(e)} name='start' />
                                        </div>
                                        <div className="connect"> - </div>
                                        <div id="upper-value">
                                            <input type='number' className='form-control' value={price.end} onChange={(e) => PriceOnchange(e)} name='end' />
                                        </div>
                                        <div>
                                            <button className='btn btn-primary search' onClick={() => SearchPrice()} style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}>
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7">

                        {/* Start Best Seller  */}
                        <section className="lattest-product-area pb-40 category-list">
                            <div className="row">
                                {/* <!-- single product --> */}

                                {/* <!-- single product --> */}
                                {filterData && filterData.length > 0 ? filterData.map((item, index) => {
                                    return (
                                        <Product key={`key-${index}`} item={item} />
                                    )
                                }) : <div style={{ marginLeft: "200px", fontSize: "30px" }}>Not products found.</div>}

                            </div>
                        </section>
                        {/* <!-- End Best Seller -->

				        <!-- Start Filter Bar --> */}
                        {filterData.length > 0 &&
                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="sorting mr-auto d-flex">
                                    <select onChange={(e) => ItemPerPageOnchange(e)}>
                                        <option selected disabled value>
                                            Show 8
                                        </option>
                                        <option value="6">Show 6</option>
                                        <option value="9">Show 9</option>
                                        <option value="12">Show 12</option>
                                    </select>
                                    <div className='ms-3 d-flex'>
                                        <p style={{ margin: "auto" }}>{itemPerPage * page + 1}-{itemPerPage * (page + 1)} of 30 items</p>
                                    </div>
                                </div>
                                <ReactPaginate
                                    containerClassName={"pagination"}
                                    pageClassName={"page-item"}
                                    activeClassName={"active-pagination"}
                                    onPageChange={(event) => setPage(event.selected)}
                                    pageCount={Math.ceil(listProduct.length / itemPerPage)}
                                    breakLabel="..."
                                    previousLabel={<i className="fas fa-chevron-left" style={{ color: "black" }}></i>}
                                    nextLabel={<i className="fas fa-chevron-right" style={{ color: "black" }}></i>}
                                />
                            </div>}

                        {/* <!-- End Filter Bar --> */}
                    </div>
                </div>
            </div>

        </>

        // <!-- end product Area -->
    )
}
export default ListProduct
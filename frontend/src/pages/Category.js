import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import './Category.scss'
import { fetchAllProduct } from "../service/productService"
import ListProduct from "../components/ListProduct"

const Category = () => {
    const [listProduct, setListProduct] = useState([])
    const listProductRedux = useSelector((state) => state.user.listProduct)

    useEffect(() => {

        fetchProducts()

    }, [])

    const fetchProducts = async () => {
        let res = await fetchAllProduct()
        //let res = await fetchAllUser()
        if (res && res.data.DT) {

            console.log('all data: ', res.data.DT)
            setListProduct(res.data.DT)

        }
    }


    return (
        <>
            {/* <!-- Start Banner Area --> */}
            <section className=" banner-area organic-breadcrumb">
                <div className="container mt-3">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Shop Category page</h1>
                            <nav className="d-flex align-items-center">
                                <Link to="index.html">Home<span className="lnr lnr-arrow-right"></span></Link>
                                <Link to="#">Shop<span className="lnr lnr-arrow-right"></span></Link>
                                <Link to="category.html">Fashon Category</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Banner Area --> */}
            {/* <div className="container category-product">
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <div className="sidebar-categories">
                            <div className="head">Browse Categories</div>
                            <ul className="main-categories">
                                <li className="main-nav-list">
                                    <Link onClick={(e) => handleClickAdidas(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                        className="lnr lnr-arrow-right"></span>Adidas<span className="number">(53)</span></Link>
                                </li>
                                <li className="main-nav-list" ><Link onClick={(e) => handleClickNike(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                    className="lnr lnr-arrow-right"></span>Nike<span className="number">(53)</span></Link>
                                </li>
                                <li className="main-nav-list" ><Link onClick={(e) => handleClickPuma(e)} data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                                    className="lnr lnr-arrow-right"></span>Puma<span className="number">(53)</span></Link>
                                </li>

                            </ul>
                        </div>
                        <div className="sidebar-filter mt-50">
                            <div className="top-filter-head">Product Filters</div>

                            <div className="common-filter">
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
                            </div>
                            <div className="common-filter">
                                <div className="head">Price</div>
                                <div className="price-range-area">
                                    <div id="price-range"></div>
                                    <div className="value-wrapper d-flex">
                                        <div className="price">Price:</div>
                                        <span>$</span>
                                        <div id="lower-value"></div>
                                        <div className="to">to</div>
                                        <span>$</span>
                                        <div id="upper-value"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7">
                     
                        <section className="lattest-product-area pb-40 category-list">
                            <div className="row">

                              
                                {listProduct ? listProduct.map((item, index) => {
                                    return (
                                        <Product key={`key-${index}`} item={item} />
                                    )
                                }) : <div></div>}

                            </div>
                        </section>
                      
                        <div className="filter-bar d-flex flex-wrap align-items-center">
                            <div className="sorting mr-auto">
                                <select>
                                    <option value="1">Show 12</option>
                                    <option value="1">Show 12</option>
                                    <option value="1">Show 12</option>
                                </select>
                            </div>
                            <div className="pagination">
                                <Link to="#" className="prev-arrow"><i className="fa fa-long-arrow-left" aria-hidden="true"></i></Link>
                                <Link to="#" className="active">1</Link>
                                <Link to="#">2</Link>
                                <Link to="#">3</Link>
                                <Link to="#" className="dot-dot"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></Link>
                                <Link to="#">6</Link>
                                <Link to="#" className="next-arrow"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></Link>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div> */}
            <ListProduct />
        </>
    )
}
export default Category
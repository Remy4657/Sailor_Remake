

const Footer = () => (
    // < !--start footer Area -->
    <footer className="footer-area section_gap">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="single-footer-widget">
                        <h6>About Us</h6>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore dolore magna aliqua.
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="single-footer-widget">
                        <h6>Newsletter</h6>
                        <p>Stay update with our latest</p>
                        <div className="" id="mc_embed_signup">
                            <form
                                target="_blank"
                                action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                method="get"
                                className="form-inline"
                            >
                                <div className="d-flex flex-row">
                                    <input
                                        className="form-control"
                                        name="EMAIL"
                                        placeholder="Enter Email"
                                        required=""
                                        type="email"
                                    />

                                    <button className="click-btn btn btn-default">
                                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                    <div style={{ position: "absolute", left: "-5000px" }}>
                                        <input
                                            name="b_36c4fd991d266f23781ded980_aefe40901a"
                                            tabIndex="-1"
                                            value=""
                                            type="text"
                                        />
                                    </div>

                                    {/* <!-- <div className="col-lg-4 col-md-4">
                                        <button className="bb-btn btn"><span className="lnr lnr-arrow-right"></span></button>
                                    </div>  --> */}
                                </div>
                                <div className="info"></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="single-footer-widget mail-chimp">
                        <h6 className="mb-20">Instragram Feed</h6>
                        <ul className="instafeed d-flex flex-wrap">
                            <li><img src={require('../assets/img/img_/i1.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i2.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i3.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i4.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i5.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i6.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i7.jpg')} alt="" /></li>
                            <li><img src={require('../assets/img/img_/i8.jpg')} alt="" /></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6">
                    <div className="single-footer-widget">
                        <h6>Follow Us</h6>
                        <p>Let us be social</p>
                        <div className="footer-social d-flex align-items-center">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-telegram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
                <p className="footer-text m-0">
                    {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                    Copyright &copy;
                    <script>
                        document.write(new Date().getFullYear());
                    </script>
                    All rights reserved
                    {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                </p>
            </div>
        </div>
    </footer>
    // <!-- End footer Area -->
)

export default Footer
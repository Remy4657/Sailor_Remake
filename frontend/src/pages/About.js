

const About = () => (
    <>
        <section className="banner-area organic-breadcrumb">
            <div className="container">
                <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                    <div className="col-first">
                        <h1>Blog Page</h1>
                        <nav className="d-flex align-items-center">
                            <a href="index.html">Home<span className="lnr lnr-arrow-right"></span></a>
                            <a href="category.html">Blog</a>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
        <div className="mt-5 container d-flex flex-direction-row justify-content-end">
            <div className="flex-fill p-5" style={{ width: "95%" }}>
                <img className="img-fluid" src={require("../assets/img/img_/product/e-p1.png")} alt="" />
            </div>
            <div className="p-5 flex-fill">
                <h3>
                    The Glossary Of Telescopes
                </h3>
                <p>
                    MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction.
                    MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction..
                </p>
            </div>
        </div>
    </>
)
export default About
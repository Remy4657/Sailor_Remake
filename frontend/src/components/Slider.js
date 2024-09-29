import { useState, useEffect } from "react";


const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex > 2 || newIndex < 0) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 2000);
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [activeIndex]);

    return (
        <>
            {/* <input type="text" placeholder="Search product..." /> */}
            <section id="hero">

                <div className="carousel-inner-cus 1" role="listbox"
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                        whiteSpace: "nowrap",
                        transition: "transform 0.3s",

                    }}>

                    <div
                        className="carousel-item-cus i1"
                        style={{
                            // backgroundImage: "url(slide-1.jpg)"

                        }}>
                        <div className="carousel-container">
                            <div className="container">
                                <h2 className="animate__animated animate__fadeInDown">
                                    Welcome to <span>Sailor</span>
                                </h2>
                                <p className="animate__animated animate__fadeInUp">
                                    Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut
                                    et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem
                                    mollitia ut. Similique ea voluptatem. Esse doloremque
                                    accusamus< br /> repellendus deleniti vel. Minus et tempore modi
                                    architecto.
                                </p>
                                <a
                                    href="#about"
                                    className="btn-get-started animate__animated animate__fadeInUp scrollto"
                                >Read More</a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item-cus i2"
                        style={{
                            // backgroundImage: "url(../assets/img/slide/slide-1.jpg)"

                        }}>
                        <div className="carousel-container">
                            <div className="container">
                                <h2 className="animate__animated animate__fadeInDown">
                                    Welcome to <span>Sailor</span>
                                </h2>
                                <p className="animate__animated animate__fadeInUp">
                                    Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut
                                    et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem
                                    mollitia ut. Similique ea voluptatem. Esse doloremque
                                    accusamus< br />repellendus deleniti vel. Minus et tempore modi
                                    architecto.
                                </p>
                                <a
                                    href="#about"
                                    className="btn-get-started animate__animated animate__fadeInUp scrollto"
                                >Read More</a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item-cus i3"
                    >
                        <div className="carousel-container">
                            <div className="container">
                                <h2 className="animate__animated animate__fadeInDown">
                                    Welcome to <span>Sailor</span>
                                </h2>
                                <p className="animate__animated animate__fadeInUp">
                                    Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut
                                    et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem
                                    mollitia ut. Similique ea voluptatem. Esse doloremque
                                    accusamus < br />repellendus deleniti vel. Minus et tempore modi
                                    architecto.
                                </p>
                                <a
                                    href="#about"
                                    className="btn-get-started animate__animated animate__fadeInUp scrollto"
                                >Read More</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* <a
                        className="carousel-control-prev"
                        href="#heroCarousel"
                        role="button"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon bi bi-chevron-left"
                            aria-hidden="true"
                        ></span>
                    </a>

                    <a
                        className="carousel-control-next"
                        href="#heroCarousel"
                        role="button"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon bi bi-chevron-right"
                            aria-hidden="true"
                        ></span>
                    </a> */}

            </section>

        </>
    )
}
export default Slider
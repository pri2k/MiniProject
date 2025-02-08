'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    speed: 1500,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".dot-2",
        clickable: true,
    },
}

export default function Testimonial1() {
    return (
        <>
            <section className="testimonial-section section-padding fix ">
                <div className="container">
                    <div className="testimonial-wrapper">
                        <div className="swiper testimonial-slider">
                            <Swiper {...swiperOptions} className="swiper-wrapper">
                                <SwiperSlide>
                                    <div className="testimonial-items">
                                        <div className="tesimonial-image bg-cover" style={{ backgroundImage: 'url("assets/img/testimonial/01.jpg")' }}>
                                            <div className="star">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </div>
                                        </div>
                                        <div className="testimonial-content">
                                            <div className="section-title">
                                                <span>REAL CLIENT STORIES</span>
                                                <h2>Customer Experiences </h2>

                                            </div>
                                            <h3 className="mb-3">Mohammed Shoyeb</h3>
                                            <p className="mt-3 mt-md-0">
                                                We couldn’t invest in a dedicated in-house marketing team as a small real estate firm. So, we outsourced our digital marketing needs to Aiz Infotech, and the results are phenomenal. This partnership will surely last long
                                            </p>
                                            <div className="author-details">
                                                <h5>Broskies Owner </h5>
                                                {/* <span>Web Designer</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-items">
                                        <div className="tesimonial-image bg-cover" style={{ backgroundImage: 'url("assets/img/testimonial/01.jpg")' }}>
                                            <div className="star">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </div>
                                        </div>
                                        <div className="testimonial-content">
                                            <div className="section-title">
                                                <span>REAL CLIENT STORIES</span>
                                                <h2>Customer Experiences </h2>
                                            </div>
                                            <h3 className="mb-3">Saddam</h3>
                                            <p className="mt-3 mt-md-0">
                                                
                                                My experience with AIZ Infotech has turned into a long business relationship. The team does wonders and develops impressive mobile applications for my customers that help them connect with my brand and place direct orders. Now, we are working on result-oriented marketing.
                                            </p>
                                            <div className="author-details">
                                                <h5>Company Owner</h5>
                                                {/* <span>Web Designer</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="testimonial-items">
                                        <div className="tesimonial-image bg-cover" style={{ backgroundImage: 'url("assets/img/testimonial/01.jpg")' }}>
                                            <div className="star">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </div>
                                        </div>
                                        <div className="testimonial-content">
                                            <div className="section-title">
                                                <span>REAL CLIENT STORIES</span>
                                                <h2>Customer Experiences </h2>
                                            </div>
                                            <h3 className="mb-3">Mohammed Asif Vohra</h3>
                                            <p className="mt-3 mt-md-0">
                                                I wanted to develop and implement a live ecosystem in business to organize activities in an integrated manner. The AIZ Infotech team delivered what I needed ideally and provided me with a centralized solution for my organization.
                                            </p>
                                            <div className="author-details">
                                                <h5>CEO of Company</h5>
                                                {/* <span>Web Designer</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>
                        {/* <div className="swiper-dot-2">
                            <div className="dot-2" />
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}

import React from 'react'
const CurrentAffairs = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="course-details-tab style-2">
                    <nav>
                        <div className="nav nav-tabs justify-content-start tab-auto" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-about" aria-selected="true">MPPSC Civil Services</button>
                            <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">MPPSC Forest Services</button>
                            <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">UPSC Civil Services</button>
                            <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">One Day Exam Preparation</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="card mt-4">
                            <div className="card-body mr-2">
                                <h4 className='text-center text-primary '>Coming Soon</h4>
                            </div>
                        </div>
                        {/* <div className="tab-pane fade active show" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            <div className="row mt-4">
                                <div className="col-xl-4 col-md-4">
                                    <div className="card all-crs-wid">
                                        <div className="card-body">
                                            <div className="courses-bx">
                                                <div className="dlab-media">
                                                    <img src="images/courses/course5.jpg" alt="" />
                                                </div>
                                                <div className="dlab-info">
                                                    <div className="dlab-title d-flex justify-content-between">
                                                        <div className="mt-2">
                                                            <h4><Link to="/coursedetails" >Shaurya Test Series</Link></h4>
                                                            <p className="m-0">{time}</p>
                                                        </div>
                                                        <div className="course_price ml-auto text-primary mt-2"><span>₹5000</span>₹499</div>
                                                    </div>
                                                    <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps ps--active-y mt-4">
                                                        <ul className="timeline">
                                                            <li>
                                                                <div className="timeline-badge info">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">12 FLTs Full Length Test</h6>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-badge success">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">24 Topic Wise Test </h6>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-badge warning">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">Bilingual Test Papers</h6>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between content align-items-center">
                                                <Link to="/testseriesexplore" aria-expanded="false" activename="active" className="btn btn-warning btn-sm">
                                                    <i className="bi-view-list" /> Explore
                                                </Link>
                                                <Link to="/package" aria-expanded="false" activename="active" className="btn btn-primary btn-sm">
                                                    <i className="bi-cart3" /> Buy Now
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4">
                                    <div className="card all-crs-wid">
                                        <div className="card-body">
                                            <div className="courses-bx">
                                                <div className="dlab-media">
                                                    <img src="images/courses/course6.jpg" alt="" />
                                                </div>
                                                <div className="dlab-info">
                                                    <div className="dlab-title d-flex justify-content-between">
                                                        <div className="mt-2">
                                                            <h4><Link to="/coursedetails">Abhyash Test Series</Link></h4>
                                                            <p className="m-0">MPPSC Civil Services</p>
                                                        </div>
                                                        <div className="course_price ml-auto text-primary mt-2"><span>₹7500</span>₹999</div>
                                                    </div>
                                                    <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps ps--active-y mt-4">
                                                        <ul className="timeline">
                                                            <li>
                                                                <div className="timeline-badge info">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">12 FLTs Full Length Test</h6>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-badge success">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">24 Topic Wise Test </h6>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-badge warning">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">Bilingual Test Papers</h6>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between content align-items-center">
                                                <Link to="/testseriesexplore" aria-expanded="false" activename="active" className="btn btn-warning btn-sm">
                                                    <i className="bi-view-list" /> Explore
                                                </Link>
                                                <Link to="/package" aria-expanded="false" activename="active" className="btn btn-primary btn-sm">
                                                    <i className="bi-cart3" /> Buy Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4">
                                    <div className="card all-crs-wid">
                                        <div className="card-body">
                                            <div className="courses-bx">
                                                <div className="dlab-media">
                                                    <img src="images/courses/course7.jpg" alt="" />
                                                </div>
                                                <div className="dlab-info">
                                                    <div className="dlab-title d-flex justify-content-between">
                                                        <div className="mt-2">
                                                            <h4><Link to="/coursedetails">Aadhar Test Series</Link></h4>
                                                            <p className="m-0">MPPSC Civil Services</p>
                                                        </div>
                                                        <div className="course_price ml-auto text-primary mt-2"><span>₹3500</span>₹399</div>
                                                    </div>
                                                    <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps ps--active-y mt-4">
                                                        <ul className="timeline">
                                                            <li>
                                                                <div className="timeline-badge info">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">12 FLTs Full Length Test</h6>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-badge success">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">24 Topic Wise Test </h6>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <div className="timeline-badge warning">
                                                                </div>
                                                                <a className="timeline-panel text-muted" href="#">
                                                                    <h6 className="mb-0">Bilingual Test Papers</h6>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between content align-items-center">
                                                <Link to="/testseriesexplore" aria-expanded="false" activename="active" className="btn btn-warning btn-sm">
                                                    <i className="bi-view-list" /> Explore
                                                </Link>
                                                <Link to="/package" aria-expanded="false" activename="active" className="btn btn-primary btn-sm">
                                                    <i className="bi-cart3" /> Buy Now
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pagination-down">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <h4 className="sm-mb-0 mb-3">Showing <span>1-6 </span>from <span>100 </span>data</h4>

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
                           
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentAffairs;
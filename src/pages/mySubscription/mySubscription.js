import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { AssemblePrefData, SubscriptionPageData } from './js/assembledata'
import { isSubscription } from '../../utils'



const MySubscription = (props) => {
    const { couresPageData } = props
    // console.log(couresPageData);
    let issubs = isSubscription()
    couresPageData?.filter(item => item)

    const [paginate, setpaginate] = useState(2)
    const BS = JSON.parse(localStorage.getItem("userdata"))
    const BuySubscriptions = BS?.subscriptions
    let data = AssemblePrefData(couresPageData)?.flat()
    let SubscriptionData = SubscriptionPageData(data)
    const [myCourseTab, setMyCourseTab] = useState(true)
    const [testSeriesTab, setTestSeriesTab] = useState(false)
    const [studyMaterialTab, setStudyMaterialTab] = useState(false)

    const SliderTab = (id) => {
        if (id === "mycourse") {
            setMyCourseTab(true)
            setTestSeriesTab(false)
            setStudyMaterialTab(false)
        } else if (id === "testseries") {
            setMyCourseTab(false)
            setTestSeriesTab(true)
            setStudyMaterialTab(false)
        } else if (id === "studymaterial") {
            setMyCourseTab(false)
            setTestSeriesTab(false)
            setStudyMaterialTab(true)
        }
    }

    const load_more = (event) => {
        setpaginate((prevValue) => prevValue + 2);
    };
    return (
        <> {issubs ? <>
            <div className="container-fluid ">
                <div className="course-details-tab style-2">
                    <nav>
                        <div className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                            <button className={myCourseTab ? "nav-link active" : "nav-link"} type="button" onClick={() => SliderTab("mycourse")} >
                                <i className="bi-journals" /> My Courses ({BuySubscriptions?.length}) </button>
                            <button className={testSeriesTab ? "nav-link active" : "nav-link"} type="button" onClick={() => SliderTab("testseries")} >
                                <i className="bi-journal-text" /> Test Series (0) </button>
                            <button className={studyMaterialTab ? "nav-link active" : "nav-link"} type="button" onClick={() => SliderTab("studymaterial")} >
                                <i className="bi bi-book-half" /> Study Material (0) </button>
                        </div>
                    </nav>
                    {BuySubscriptions?.length ? <><div className="tab-content" id="nav-tabContent">
                        {BuySubscriptions?.slice(0, paginate)?.map((ele, index) => {
                            return (
                                < div className={myCourseTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-about" role="tabpanel" key={index} >
                                    <div className="row mt-4">
                                        <div className="col-xl-12 col-md-12">
                                            <div className="card all-crs-wid">
                                                <div className="card-body">
                                                    <div className="courses-bx">
                                                        <div className="row">
                                                            <div className="col-xl-4 col-md-4">
                                                                <div className="dlab-media mb-2">
                                                                    <img src={SubscriptionData?.[index]?.web_icon} alt="img" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-8 col-md-8">
                                                                <div className="dlab-info">
                                                                    <div className="d-flex justify-content-between content align-items-center">
                                                                        <h4>
                                                                            <Link to={`${ele?.course?.slug}`} className="text-primary">{ele?.course?.name}  - ₹{ele?.subscription?.plan_price}</Link><br />
                                                                            <small className="m-0">
                                                                                <span className="text-success"><i className="bi-basket" /> Purchase at: <span className="text-black">{new Date(ele?.subscription?.created_at)?.toDateString()}</span></span>
                                                                            </small>
                                                                        </h4>
                                                                        <a href={ele?.course?.telegram_link} >
                                                                            <img src="https://cdn3.iconfinder.com/data/icons/social-media-chamfered-corner/154/telegram-512.png" height={40} className="mb-2" alt='' />
                                                                        </a>
                                                                    </div>
                                                                    <div className="row mt-4">
                                                                        <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps">
                                                                            <ul className="timeline">
                                                                                <li>
                                                                                    <div className="timeline-badge info" />
                                                                                    <Link className="timeline-panel text-muted">
                                                                                        <h6 className="mb-0">{SubscriptionData?.[index]?.CourseSubscriptionPlans_course?.reduce((min, max) => min + max?.no_of_videos, 0)}+ Video Lectures</h6>
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="timeline-badge success" />
                                                                                    <Link className="timeline-panel text-muted">
                                                                                        <h6 className="mb-0">{SubscriptionData?.[index]?.CourseSubscriptionPlans_course?.reduce((min, max) => min + max?.no_of_tests, 0)}+ Test Series </h6>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps ps--active-y">
                                                                            <ul className="timeline">
                                                                                <li>
                                                                                    <div className="timeline-badge dark" />
                                                                                    <Link className="timeline-panel text-muted">
                                                                                        <h6 className="mb-0">{SubscriptionData?.[index]?.CourseSubscriptionPlans_course?.reduce((min, max) => min + max?.no_of_notes, 0)}+ PDF Notess</h6>
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="timeline-badge danger" />
                                                                                    <Link className="timeline-panel text-muted">
                                                                                        <h6 className="mb-0">Live Classes - {SubscriptionData?.[index]?.liveClasses_course?.length ? "Available" : "Not Available"}  </h6>
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="d-flex justify-content-between content align-items-center">
                                                        <h5><i className="bi-patch-exclamation-fill text-danger" /> <span className="text-danger">Expired at:</span>
                                                            &nbsp;  {new Date(ele?.expiry_date).toDateString()}</h5>
                                                        <Link to={`${ele?.course?.slug}`} className="btn btn-primary btn-sm">
                                                            <i className="bi-emoji-heart-eyes"> View Course </i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                        <div className='text-center mt-2 mb-4'>
                           {(paginate === BuySubscriptions?.length)?"": <button className='btn btn-primary btn-md' onClick={load_more}>Load More...</button>}
                        </div>
                    </> :<Loader />}
                </div>
            </div>
        </> : <>
            <div className="container-fluid mt-1">
                <div className="tab-content" id="nav-tabContent">
                    <div className="card mt-4">
                        <div className="card-body mr-2">
                            <h4 className='text-center text-primary '>You Have No subscriptions</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>}
        </>

    )
}
export default MySubscription
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TEST_endPointUrl } from "../../common/api/endPointUrl"
import Loader from "../../components/loader/Loader"
import { Tokens } from "../../App"

const Courses = () => {

    const token = useContext(Tokens)

    const [All_prefences, setAll_prefences] = useState([])
    const [each_prefrence, setEachprefrence] = useState()
    const [filterdata, setFilterdata] = useState()

    // console.log(All_prefences.flatMap(item=>item));
    const EachPrefrence = (item) => {
        setEachprefrence(item)
        const filter = All_prefences?.find(dt => dt.slug === item.slug)
        setFilterdata(filter)

    }
    useEffect(() => {
        var Alldata = (token) => {

            fetch(TEST_endPointUrl + "api/student/get_all_preferences/", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(res => {
                if (res.length) {
                    setAll_prefences(res)
                }
            })
        }
        Alldata(token)
    }, [token])

    return (<>
        {(All_prefences && All_prefences?.length) ? <>
            <div className="container-fluid">
                <div className="course-details-tab style-2">
                    <nav>
                        <div className="nav nav-tabs justify-content-start tab-auto" id="nav-tab" role="tablist">
                            {(All_prefences && All_prefences?.length ? All_prefences : []).map((item, index) => <button className={((each_prefrence && each_prefrence?.slug) ? each_prefrence?.slug : All_prefences[0]?.slug) === item.slug ? "nav-link active" : "nav-link"} id="nav-about-tab" onClick={() => { EachPrefrence(item) }}   type="button" role="tab" key={index} aria-controls="nav-about" aria-selected={((each_prefrence && each_prefrence?.slug) ? each_prefrence?.slug : All_prefences?.[0]?.slug) === item.slug ? "true" : "false"}>{item?.name}</button>
                            )}
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade active show" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            <div className="row mt-4">
                                {(filterdata && filterdata.is_active ? filterdata?.courses : All_prefences?.[0]?.courses)?.map((item, index) =>
                                    <div className="col-xl-4 col-md-4" key={index}>
                                        <div className="card all-crs-wid h-auto">
                                            <div className="card-body">
                                                <div className="courses-bx">
                                                    <div className="dlab-media">
                                                        <img src={item?.web_icon} alt="" />
                                                    </div>
                                                    <div className="dlab-info">
                                                        <div className="dlab-title d-flex justify-content-between">
                                                            <div className="mt-2">
                                                                <h4>
                                                                    <Link to={`details/${item?.slug}`} >{item?.name}</Link>
                                                                </h4>
                                                                <p className="m-0">{(filterdata && filterdata.is_active) ? each_prefrence?.name : All_prefences[0]?.name}</p>
                                                            </div>
                                                            <div className="course_price ml-auto text-primary">
                                                                <span>₹{item?.CourseSubscriptionPlans_course?.reduce((min, price) => price?.plan_price < min ? price.discount_price : min, item?.CourseSubscriptionPlans_course[0]?.discount_price)}</span>

                                                                <br />₹{item?.CourseSubscriptionPlans_course?.reduce((min, price) => price?.plan_price < min ? price.plan_price : min, item?.CourseSubscriptionPlans_course[0]?.plan_price)}
                                                            </div>
                                                        </div>
                                                        <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps mt-4">
                                                            <ul className="timeline">
                                                                <li>
                                                                    <div className="timeline-badge info"></div>
                                                                    <Link className="timeline-panel text-muted" to="">
                                                                        <h6 className="mb-0"><i className="bi-file-earmark-play"></i> {item?.CourseSubscriptionPlans_course?.reduce((min, price) => price.plan_price < min ? price.no_of_videos : min, item?.CourseSubscriptionPlans_course[0]?.no_of_videos)}+ Video Lectures</h6>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <div className="timeline-badge success"></div>
                                                                    <Link className="timeline-panel text-muted" to="">
                                                                        <h6 className="mb-0"><i className="bi-book"></i> {item?.CourseSubscriptionPlans_course?.reduce((min, price) => price.plan_price > min ? price.no_of_notes : min, item?.CourseSubscriptionPlans_course[0]?.no_of_notes)}+ PDF Notes </h6>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <div className="timeline-badge dark"></div>
                                                                    <Link className="timeline-panel text-muted" to="">
                                                                        <h6 className="mb-0"><i className="bi-journal-text"></i> {item?.CourseSubscriptionPlans_course?.reduce((min, price) => price.plan_price > min ? price.no_of_tests : min, item?.CourseSubscriptionPlans_course[0]?.no_of_tests)}+ Test Series</h6>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <div className="timeline-badge danger"></div>
                                                                    <Link className="timeline-panel text-muted" to="">
                                                                        <h6 className="mb-0"><i className="bi-camera-reels"></i> Live Classes - {item?.CourseSubscriptionPlans_course?.reduce((min, price) => price.plan_price > min ? price.live_classes_access ? "Available" : "Not Available" : min, item?.CourseSubscriptionPlans_course[0]?.live_classes_access ? "Available" : "Not Available")}</h6>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="d-flex justify-content-between content align-items-center">
                                                    <Link onClick={() => { localStorage.setItem("course_data", JSON.stringify(item)) }} to={`details/${item?.slug}`} className="btn btn-warning btn-sm">
                                                        <i className="bi-view-list"></i> Explore </Link>
                                                    <Link to={`${item?.slug}`} className="btn btn-primary btn-sm" onClick={() => { sessionStorage.setItem("CRS", JSON.stringify(item)) }}>
                                                        <i className="bi-cart3"></i> Buy Now </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div></> : <div className="container-fluid">
            <Loader />
        </div>}
    </>)
}

export default Courses
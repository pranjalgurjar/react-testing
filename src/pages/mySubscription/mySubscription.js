import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tokens } from '../../App'
import { TEST_endPointUrl } from '../../common/api/endPointUrl'
import Loader from '../../components/loader/Loader'
import couresImg from "./images/course3.jpg"


const MySubscription = (props) => {
    const { issubs } = props
    const [student, setStudent] = useState()
    const [paginate, setpaginate] = useState(2)
    const token = useContext(Tokens)
    const myId = JSON.parse(localStorage.getItem("userdata"))
    const [myCourseTab, setMyCourseTab] = useState(true)
    const [testSeriesTab, setTestSeriesTab] = useState(false)
    const [studyMaterialTab, setStudyMaterialTab] = useState(false)
    //  console.log(student)

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

    useEffect(() => {
        const response = () => {
            if (issubs) {
                fetch(TEST_endPointUrl + "api/student/mobile/check", {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': "application/json",
                        "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mobile: myId.mobile })
                }).then(res => res.json())
                    .then(result => {
                        if (result.status) {
                            setStudent(result)
                            // console.log(result, "res")
                        }
                    })
            }
        }
        response()
    }, [myId.mobile, token, issubs])

    const load_more = (event) => {
        setpaginate((prevValue) => prevValue + 2);
    };


    return (
        <> {issubs ? <>
            {student?.message.subscriptions.length ? <>
                <div className="container-fluid ">
                    <div className="course-details-tab style-2">
                        <nav>
                            <div className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                <button className={myCourseTab ? "nav-link active" : "nav-link"} type="button" onClick={() => SliderTab("mycourse")} >
                                    <i className="bi-journals" /> My Courses ({student?.message?.subscriptions?.length}) </button>
                                <button className={testSeriesTab ? "nav-link active" : "nav-link"} type="button" onClick={() => SliderTab("testseries")} >
                                    <i className="bi-journal-text" /> Test Series (0) </button>
                                <button className={studyMaterialTab ? "nav-link active" : "nav-link"} type="button" onClick={() => SliderTab("studymaterial")} >
                                    <i className="bi bi-book-half" /> Study Material (0) </button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            {student?.message?.subscriptions?.slice(0, paginate).map((ele, index) => {
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
                                                                        <img src={couresImg} alt="img" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-8 col-md-8">
                                                                    <div className="dlab-info">
                                                                        <div className="d-flex justify-content-between content align-items-center">
                                                                            <h4>
                                                                                <Link to={`${ele?.course?.slug}`} className="text-primary">{ele?.course?.name}  - ₹{ele?.subscription?.plan_price}</Link><br />
                                                                                <small className="m-0"><i className="bi-clipboard-data" /> MPPSC Civil Services
                                                                                    <br />
                                                                                    <span className="text-success"><i className="bi-basket" /> Purchase at: <span className="text-black">{new Date(ele?.subscription?.created_at).toDateString()}</span></span>
                                                                                </small>
                                                                            </h4>
                                                                            <a href={ele?.course?.telegram_link} >
                                                                                <img src="https://cdn3.iconfinder.com/data/icons/social-media-chamfered-corner/154/telegram-512.png" height={40} className="mb-2" alt='' />
                                                                            </a>
                                                                        </div>
                                                                        <div className="row mt-2">
                                                                            <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps">
                                                                                <ul className="timeline">
                                                                                    <li>
                                                                                        <div className="timeline-badge info" />
                                                                                        <Link className="timeline-panel text-muted">
                                                                                            <h6 className="mb-0">130+ Video Lectures</h6>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="timeline-badge success" />
                                                                                        <Link className="timeline-panel text-muted">
                                                                                            <h6 className="mb-0">30+ Test Series </h6>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps ps--active-y">
                                                                                <ul className="timeline">
                                                                                    <li>
                                                                                        <div className="timeline-badge dark" />
                                                                                        <Link className="timeline-panel text-muted">
                                                                                            <h6 className="mb-0">25+ PDF Notess</h6>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="timeline-badge danger" />
                                                                                        <Link className="timeline-panel text-muted">
                                                                                            <h6 className="mb-0">Live Classes - Available </h6>
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
                            <button className='btn btn-primary btn-md' onClick={load_more}>Load More...</button>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className="container-fluid">
                    <Loader />
                </div>
            </>}
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
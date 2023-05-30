import { React, useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosClient from "../../../../webServices/webservice"
import { Tokens } from "../../../../App"
import Loader from '../../../../components/loader/Loader';
import { webUrls } from '../../../../webServices/webUrls';

const CourseDetailsOne = () => {
    const token = useContext(Tokens)
    const { cdslug } = useParams()
    const [course, setCourse] = useState()
    const [showAboutExam, setShowAboutExam] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const [showPdf, setShowPdf] = useState(false)
    const [showTestSeries, setShowTestSeries] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const cor_data = async () => {
            if (token && cdslug) {
                setLoading(true)
                try {
                    let response = await axiosClient.get(`${webUrls.COURSE_OVERVIEW_URL}${cdslug}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    if (response) {
                        setCourse(response.data)
                        setLoading(false)
                    }
                } catch (e) {
                    // console.log(e);
                }
            }
        }
        cor_data()
    }, [cdslug, token])

    return (
        <>{loading ? <div className="container-fluid mt-2"><Loader /></div>
            : <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-xl-4 col-xxl-4">
                        <div className="custome-accordion">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item card">
                                    <h2 className="accordion-header border-0" id="headingOne">
                                        <button className={showVideo ? "accordion-button d-flex justify-content-between align-items-center" : "accordion-button d-flex justify-content-between align-items-center collapsed"} onClick={() => setShowVideo(!showVideo)} type="button">
                                            <span className="acc-heading"><i className="fa fa-video-camera" aria-hidden="true" />
                                                Video Lectures</span>
                                            <span className="ms-auto">({course?.[0]?.CourseSubscriptionPlans_course?.reduce((acuu, curr) => acuu + curr?.no_of_videos, 0)})</span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className={showVideo ? "accordion-collapse collapse show" : "accordion-collapse collapse"} >
                                        <div className="accordion-body card-body pt-0">
                                            {course?.[0]?.categories[0]?.categories_topics[0]?.CategoryLectures?.map((item, index) =>
                                                <div className="acc-courses" key={index}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="acc-icon">
                                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.3337 6V4.66666C11.3337 2.79999 9.86699 1.33333 8.00033 1.33333C6.13366 1.33333 4.66699 2.79999 4.66699 4.66666V6C3.53366 6 2.66699 6.86666 2.66699 8V12.6667C2.66699 13.8 3.53366 14.6667 4.66699 14.6667H11.3337C12.467 14.6667 13.3337 13.8 13.3337 12.6667V8C13.3337 6.86666 12.467 6 11.3337 6ZM6.00033 4.66666C6.00033 3.53333 6.86699 2.66666 8.00033 2.66666C9.13366 2.66666 10.0003 3.53333 10.0003 4.66666V6H6.00033V4.66666ZM8.66699 11.3333C8.66699 11.7333 8.40033 12 8.00033 12C7.60033 12 7.33366 11.7333 7.33366 11.3333V9.33333C7.33366 8.93333 7.60033 8.66666 8.00033 8.66666C8.40033 8.66666 8.66699 8.93333 8.66699 9.33333V11.3333Z" fill="#374557" />
                                                                </svg>
                                                            </span>
                                                            <h4 className="m-0">{item?.title}</h4>
                                                        </div>
                                                        <span>{Math.floor(item?.video_duration / 60)} mins</span>
                                                    </div>
                                                </div>)}<br />
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item card">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className={showPdf ? "accordion-button d-flex justify-content-between align-items-center" : "accordion-button collapsed d-flex justify-content-between align-items-center"} type="button" onClick={() => setShowPdf(!showPdf)} >
                                            <span className="acc-heading"><i className="fa fa-book" aria-hidden="true" /> PDF Notes</span>
                                            <span className="ms-auto">({course?.[0]?.CourseSubscriptionPlans_course?.reduce((acuu, curr) => acuu + curr?.no_of_notes, 0)})</span>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className={showPdf ? "accordion-collapse collapse show" : "accordion-collapse collapse"} >
                                        <div className="accordion-body card-body pt-0">
                                            {course?.[0]?.categories[0]?.categories_topics[0]?.CategoryNotes?.map((item, index) =>
                                                <div className="acc-courses" key={index}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="acc-icon">
                                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.3337 6V4.66666C11.3337 2.79999 9.86699 1.33333 8.00033 1.33333C6.13366 1.33333 4.66699 2.79999 4.66699 4.66666V6C3.53366 6 2.66699 6.86666 2.66699 8V12.6667C2.66699 13.8 3.53366 14.6667 4.66699 14.6667H11.3337C12.467 14.6667 13.3337 13.8 13.3337 12.6667V8C13.3337 6.86666 12.467 6 11.3337 6ZM6.00033 4.66666C6.00033 3.53333 6.86699 2.66666 8.00033 2.66666C9.13366 2.66666 10.0003 3.53333 10.0003 4.66666V6H6.00033V4.66666ZM8.66699 11.3333C8.66699 11.7333 8.40033 12 8.00033 12C7.60033 12 7.33366 11.7333 7.33366 11.3333V9.33333C7.33366 8.93333 7.60033 8.66666 8.00033 8.66666C8.40033 8.66666 8.66699 8.93333 8.66699 9.33333V11.3333Z" fill="#374557" />
                                                                </svg>
                                                            </span>
                                                            <h4 className="m-0">{item?.title}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}<br />
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item card">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className={showTestSeries ? "accordion-button d-flex justify-content-between align-items-center" : "accordion-button collapsed d-flex justify-content-between align-items-center"} type="button" onClick={() => setShowTestSeries(!showTestSeries)} >
                                            <span className="acc-heading"><i className="bi-journal-text" aria-hidden="true" /> Test Series</span>
                                            <span className="ms-auto">({course?.[0]?.CourseSubscriptionPlans_course?.reduce((acuu, curr) => acuu + curr?.no_of_tests, 0)})</span>
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className={showTestSeries ? "accordion-collapse collapse show" : "accordion-collapse collapse"} >
                                        <div className="accordion-body card-body pt-0">
                                            {course?.[0]?.categories[0]?.categories_topics[0]?.CategoryTestSeries?.map((item, index) =>
                                                <div className="acc-courses" key={index}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="acc-icon">
                                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.3337 6V4.66666C11.3337 2.79999 9.86699 1.33333 8.00033 1.33333C6.13366 1.33333 4.66699 2.79999 4.66699 4.66666V6C3.53366 6 2.66699 6.86666 2.66699 8V12.6667C2.66699 13.8 3.53366 14.6667 4.66699 14.6667H11.3337C12.467 14.6667 13.3337 13.8 13.3337 12.6667V8C13.3337 6.86666 12.467 6 11.3337 6ZM6.00033 4.66666C6.00033 3.53333 6.86699 2.66666 8.00033 2.66666C9.13366 2.66666 10.0003 3.53333 10.0003 4.66666V6H6.00033V4.66666ZM8.66699 11.3333C8.66699 11.7333 8.40033 12 8.00033 12C7.60033 12 7.33366 11.7333 7.33366 11.3333V9.33333C7.33366 8.93333 7.60033 8.66666 8.00033 8.66666C8.40033 8.66666 8.66699 8.93333 8.66699 9.33333V11.3333Z" fill="#374557" />
                                                                </svg>
                                                            </span>
                                                            <h4 className="m-0">{item?.title}</h4>
                                                        </div>
                                                        <span>{Math.floor(item?.time_duration / 60)} Hour {item?.time_duration % 60} Min</span>
                                                    </div>
                                                </div>)}<br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-xxl-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="course-content row justify-content-between flex-wrap">
                                    <div className="col-xl-8 col-xxl-8">
                                        <h4><b className='text-primary'>{course?.[0]?.name}</b></h4>
                                        <h4>{course?.[0]?.categories?.[0]?.categories_topics?.[0]?.CategoryLectures?.[0]?.title}</h4>
                                        <ul className="d-flex align-items-center raiting my-0 flex-wrap">
                                            <li>{course?.[0]?.categories?.[0]?.categories_topics?.[0]?.CategoryLectures?.[0]?.discription}</li>
                                        </ul>
                                    </div>
                                    <div className="col-xl-4 col-xxl-4 border-0 pt-0 mb-4">
                                        <Link to={`/courses/${cdslug}`} className="btn btn-primary btn-md w-100" onClick={() => sessionStorage.setItem("CRS", JSON.stringify(course?.[0]))}>Buy Now</Link>
                                    </div>
                                </div>

                                <div className="course-details-tab style-2 mt-4">
                                    <nav>
                                        <div className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                            <button className={showAboutExam ? "nav-link active" : "nav-link"} id="nav-about-tab" type="button" onClick={() => setShowAboutExam(true)} >About</button>
                                            <button className={showAboutExam ? "nav-link " : "nav-link active"} id="nav-discussion-tab" type="button" onClick={() => setShowAboutExam(false)}>Examination</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className={showAboutExam ? "tab-pane fade show active" : "tab-pane fade"} id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            {course?.[0]?.course_overview?.map((item, index) => <div className="about-content" key={index}>
                                                <h4 >About This Course</h4>
                                                <p>{item?.syllabus}</p>
                                            </div>)}
                                        </div>
                                        <div className={showAboutExam ? "tab-pane fade show" : "tab-pane fade show active"} id="nav-discussion" role="tabpanel" aria-labelledby="nav-discussion-tab">
                                            {course?.[0]?.course_overview?.map((item, index) => <div className="about-content" key={index}>
                                                <h4 >examination </h4>
                                                <p>{item?.examination}</p>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </>
    );
}

export default CourseDetailsOne;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import liveGif from "./liveclass.gif"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TEST_endPointUrl } from '../../../../common/api/endPointUrl';
import Loader from '../../../../components/loader/Loader';
import { Tokens } from '../../../../App';
import { ProtectUrl } from '../../../../utils';


const CourseCategories = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const token = useContext(Tokens)
    const [categories, setCategories] = useState([])
    const [live, setLive] = useState([])

    useEffect(() => {
        const saveData = () => {
            if (ProtectUrl(slug)) {
                var config = {
                    method: 'post',
                    url: TEST_endPointUrl + 'api/student/course_details1/' + slug + "/",
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                };
                axios(config)
                    .then((response) => {
                        if (response) {
                            // console.log(response.data, "response")
                            setCategories(response.data)
                        }
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            } else {
                navigate(`/courses/${slug}`)
            }
        }
        saveData()
    }, [token, slug, navigate])


    useEffect(() => {
        const response = () => {
            if (ProtectUrl(slug)) {
                fetch(TEST_endPointUrl + `api/student/get_live_classes/${slug}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': "application/json",
                        "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'application/json'
                    },

                }).then(res => res.json())
                    .then(result => {
                        if (result) {
                            setLive(result)
                            // console.log(result, "res")
                        }
                    })
            }
        }
        response()
    }, [token, slug])

    return (<>
        {categories && categories.length ? <>
            <div className="container-fluid">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        <Link to="/subscription" className="d-flex align-self-center">
                            <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
                            </svg> Back
                        </Link>
                    </li>
                </ol>
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="row">
                            <h4 className="fc-toolbar-title text-black">
                                <i className="bi-laptop"> Course Categories ({(categories?.length) ? categories?.length : 0})</i>
                            </h4>
                            {(categories && categories.length ? categories : [])?.map((categeri, index) => {
                                const cslug = (categeri?.category?.slug)
                                return (
                                    <div className="col-xl-4 col-sm-4 mt-2" key={index}>
                                        <div className="card h-auto">
                                            <div className="card-body">
                                                <div className="card-schedule plan">
                                                    <div className="d-flex justify-content-between content align-items-center">
                                                        <h5>{categeri?.category?.name}</h5>
                                                        <Link to={`${cslug}`} className="btn btn-primary btn-xs">
                                                            <i className="bi-chevron-double-right" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="justify-content-between content align-items-center">
                                                    <span className="mr-2 fw-600">
                                                        <i className="bi-play-btn" /> {categeri?.lectures} Lectures </span>
                                                    <span className="mr-2 fw-600">
                                                        <i className="bi-file-earmark-text" /> {categeri?.notes} PDF Notes </span>
                                                    <span className="mr-2 fw-600">
                                                        <i className="bi-journal-text" /> {categeri?.test_series} Test Series </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div className="col-xl-12 col-xxl-12">
                        <div className="row">
                            <div className="widget-heading d-flex justify-content-between align-items-center">
                                <h4 className="mb-2">
                                    <i className="bi-collection-play-fill me-2" /> Live Classes ({live && live?.length ? live.length : 0})
                                </h4>
                            </div>
                            {live && live.length ? live?.map((item, index) =>
                                <div className="col-xl-4 col-md-4" key={index} >
                                    <div className="card all-crs-wid h-auto">
                                        <div className="video-img">
                                            <div className="view-demo">
                                                <div className="alert alert-primary alert-dismissible solid alert-alt">
                                                    <div className="live-bg">
                                                        <img src={liveGif} alt="" height={25} /> Live Class
                                                    </div>
                                                    <div className="text-center mt-20">
                                                        <Link to={`/liveclasses/${item?.course?.slug}`} onClick={() => { sessionStorage.setItem("li_ve", JSON.stringify(item)) }}><img src={`${item?.thumbnail}`} alt="" height={150} /></Link>
                                                        <p className="faculty-name">BY :{item?.instructor?.name}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="live-title">Live at {new Date(item?.streaming_time).toLocaleTimeString()} {new Date(item?.streaming_time).toDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="play-button text-center">
                                                    <Link to={`/liveclasses/${item?.course?.slug}`} onClick={() => { sessionStorage.setItem("li_ve", JSON.stringify(item)) }} className="popup-youtube">
                                                        <svg width={42} height={42} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M16.6154 0C7.41046 0 0 7.41043 0 16.6154V55.3846C0 64.5896 7.41046 72 16.6154 72H55.3846C64.5895 72 72 64.5896 72 55.3846V16.6154C72 7.41043 64.5895 0 55.3846 0H16.6154ZM26.259 19.3846C26.5876 19.3728 26.9098 19.4783 27.1677 19.6821L46.5523 34.9129C47.2551 35.4672 47.2551 36.5328 46.5523 37.0871C40.0921 42.1633 33.6278 47.2366 27.1677 52.3125C26.2575 53.034 24.9168 52.3814 24.9231 51.22V20.7692C24.9226 20.0233 25.5135 19.4141 26.259 19.3846Z" fill="white" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="courses-bx">
                                                <div className="dlab-info">
                                                    <h6 className="text-primary">
                                                        <i className="bi-journals" /> {item?.course?.name}
                                                    </h6>
                                                    <h5><Link to={`/liveclasses/${item?.course?.slug}`} onClick={() => { sessionStorage.setItem("li_ve", JSON.stringify(item)) }}>{item?.title}</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>) : <>
                                <div className="card-body mr-2">
                                    <h5 className="text-red text-center"> No live Classes Available</h5>
                                </div></>}
                        </div>
                    </div>
                </div>
            </div>
        </> : <div className="container-fluid">
            <Loader />
        </div>}

    </>
    )
}

export default CourseCategories


import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Tokens } from '../../../../App'
import { TEST_endPointUrl } from '../../../../common/api/endPointUrl'
import Loader from '../../../../components/loader/Loader'
import { ProtectUrl } from '../../../../utils'
import Modal from './modal'

const CoursedetailsTwo = () => {
    const navigate = useNavigate()
    const { slug, cslug } = useParams()
    const token = useContext(Tokens)
    const [modal, setModal] = useState()
    const [indexdata, setIndexdata] = useState()
    const [details, setDetails] = useState()
    const [getSearchData, setGetSearchData] = useState()
    const [searchData, setSearchData] = useState([])
    const [videoLecturesTab, setVideolectureTab] = useState(true)
    const [pdfNotesTab, setPdfNotesTab] = useState(false)
    const [testSeriesTab, setTestSeriesTab] = useState(false)
    const [testSrModelShow, setTestSrModelShow] = useState(false)
    const user = JSON.parse(localStorage.getItem("userdata"))
    const myId = user?.id

    const sendData = (coursedetail, data) => {
        sessionStorage.setItem("vid", JSON.stringify(data))
        sessionStorage.setItem("cate", JSON.stringify(coursedetail))
    }

    useEffect(() => {
        const response = () => {
            if (ProtectUrl(slug)) {
                var data = JSON.stringify({
                    mobile: user.mobile
                });
                var config = {
                    method: 'post',
                    url: TEST_endPointUrl + 'api/student/course_category/' + slug + "/" + cslug + "/" + myId + "/",

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                    .then((response) => {
                        setGetSearchData(response?.data?.Lectures)
                        setDetails(response?.data)
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            } else {
                navigate(`/courses/${slug}`)
            }
        }
        response()
    }, [token, slug, cslug, myId, user.mobile, navigate])

    const handleclick = (data, index) => {
        setModal(data)
        setIndexdata(index)
        setTestSrModelShow(true)
    }
    // console.log(details);

    const LecturesData = () => {
        setGetSearchData({ Data: details?.Lectures, cat_name: "CategoryLectures" })
        setSearchData([])
        setVideolectureTab(true)
        setPdfNotesTab(false)

        setTestSeriesTab(false)
    }

    const notesData = () => {
        setGetSearchData({ Data: details?.Notes, cat_name: "CategoryNotes" })
        setSearchData([])
        setVideolectureTab(false)
        setPdfNotesTab(true)

        setTestSeriesTab(false)
    }

    const testSeriesData = () => {
        setGetSearchData({ Data: details?.TestSeries, cat_name: "CategoryTestSeries" })
        setSearchData([])

        setVideolectureTab(false)
        setPdfNotesTab(false)
        setTestSeriesTab(true)
    }

    const searchFun = (e) => {
        let search = e.target.value
        if (getSearchData?.cat_name === "CategoryLectures") {
            let data = getSearchData?.Data?.[0]?.CategoryLectures?.filter(item => item?.title?.toLowerCase().includes(search.toLowerCase()))
            setSearchData(data)
        } else if (getSearchData?.cat_name === "CategoryNotes") {
            let data = getSearchData?.Data?.[0]?.CategoryNotes?.filter(item => item?.title?.toLowerCase().includes(search.toLowerCase()))
            setSearchData(data)
        } else if (getSearchData?.cat_name === "CategoryTestSeries") {
            let data = getSearchData?.Data?.[0]?.CategoryTestSeries?.filter(item => item?.title?.toLowerCase().includes(search.toLowerCase()))
            setSearchData(data)
        }

    }
    // console.log(searchData,"sea");
    return (<>
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to={`/subscription/${slug}`} className="d-flex align-self-center">
                        <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
                        </svg> Back
                    </Link>
                </li>
            </ol>
            <div className="row">
                <div className="col-xl-12">
                    <div className="course-dedails-bx">
                        <div className="card-body pt-0">
                            <div className="course-details-tab style-2">
                                <nav>
                                    <div className='row'>
                                        <div className="col-xl-8">
                                            <div className="nav nav-tabs justify-content-start tab-auto" id="nav-tab" role="tablist">
                                                <button className={videoLecturesTab ? "nav-link active" : "nav-link"} id="nav-videos-tab" onClick={LecturesData} type="button" role="tab" >
                                                    <i className="fa fa-video-camera me-2" /> Video Lectures ({details?.Lectures?.length?details?.Lectures?.length:0}) </button>
                                                <button className={pdfNotesTab ? "nav-link active" : "nav-link"} id="nav-pdfnotes-tab" onClick={notesData} type="button" role="tab" >
                                                    <i className="fa fa-book me-2" /> PDF Notes ({details?.Notes?.length?details?.Notes?.length:0}) </button>
                                                <button className={testSeriesTab ? "nav-link active" : "nav-link"} id="nav-testseries-tab" onClick={testSeriesData} type="button" role="tab" >
                                                    <i className="bi-journal-text me-2" /> Test Series ({details?.TestSeries?.length?details?.TestSeries?.length:0}) </button>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="input-group search-area mr-2">
                                                <span className="input-group-text">
                                                    <a href={{ javascript: "void (0)" }}>
                                                        <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z" fill="var(--secondary)" />
                                                        </svg>
                                                    </a>
                                                </span>
                                                <input type="search" className="form-control" onChange={searchFun} placeholder="Search here..." />
                                            </div>
                                            {/* {(searchData?.length) && (searchError) ? "" : <h5 className="text-red text-center"> Search index is Unavailable</h5>} */}
                                        </div>
                                    </div>
                                </nav>
                                {((details && details?.Lectures?.length) || (details && details?.Notes?.length) || (details && details?.TestSeries?.length)) ? <>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className={videoLecturesTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-videos" role="tabpanel" aria-labelledby="nav-videos-tab">
                                            {(details?.Lectures?.length) ? <>
                                                {details?.Lectures?.map((coursedetail, index) => {
                                                    return (
                                                        <div className="about-content" key={index}>
                                                            <div className="widget-heading d-flex justify-content-between align-items-center" >
                                                                <h4 className="m-0">{coursedetail?.topic?.name} ({coursedetail?.CategoryLectures?.length})</h4>
                                                            </div>
                                                            <div className="row">
                                                                {(searchData && searchData?.length ? searchData : coursedetail?.CategoryLectures)?.map((data, index) => {
                                                                    return (
                                                                        <div className="col-xl-3 col-md-3" key={index}>
                                                                            <div className="card all-crs-wid h-auto" onClick={() => sendData(coursedetail, data)}>
                                                                                <div className="video-img">
                                                                                    <div className="view-demo">
                                                                                        <img src={`${data?.app_thumbnail}`} alt="" width="100%" />
                                                                                        <div className="play-button text-center text-primary">
                                                                                            <Link to={`vid/${data.slug}`} >
                                                                                                <i className="bi-collection-play video-play" />
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="dlab-info p-2">
                                                                                        <h6>
                                                                                            <Link to={`vid/${data.slug}`}>
                                                                                                {data?.title}
                                                                                            </Link>
                                                                                        </h6>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-footer">
                                                                                    <div className="courses-bx">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <>
                                                <div className="card mt-4">
                                                    <div className="card-body mr-2">
                                                        <h5 className="text-red text-center"> No Videolecture Available</h5>
                                                    </div>
                                                </div>
                                            </>}
                                        </div>
                                        <div className={pdfNotesTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-pdfnotes">
                                            {(details?.Notes?.length) ? <>
                                                {details?.Notes?.map((coursePdf, index) => {
                                                    return (
                                                        <div className="about-content" key={index}>
                                                            <div className="widget-heading d-flex justify-content-between align-items-center">
                                                                <h4 className="m-0">{coursePdf?.topic?.name} ({coursePdf?.CategoryNotes?.length})</h4>
                                                            </div>
                                                            <div className="row">
                                                                {(searchData && searchData.length ? searchData : coursePdf?.CategoryNotes)?.map((topicData, index) => {
                                                                    return (
                                                                        <div className="col-xl-3 col-sm-3" key={index}>
                                                                            <div className="card">
                                                                                <div className="card-body">
                                                                                    <div className="card-schedule plan">
                                                                                        <div className="row justify-content-between content align-items-center">
                                                                                            <div className="col-xl-10 col-sm-10">

                                                                                                <p>{topicData?.title}</p>
                                                                                            </div>
                                                                                            <div className="col-xl-2 col-sm-2">
                                                                                                <a href={topicData?.notes_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-xs">
                                                                                                    <i className="bi-download" />
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </> : <>
                                                <div className="card mt-4">
                                                    <div className="card-body mr-2">
                                                        <h5 className="text-red text-center"> No Pdf Notes Available</h5>
                                                    </div>
                                                </div>
                                            </>}
                                        </div>
                                        <div className={testSeriesTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-testseries">
                                            {(details?.TestSeries?.length) ? <>
                                                {details?.TestSeries?.map((courseTest, index) => {
                                                    return (
                                                        <>
                                                            <h4 className="fc-toolbar-title text-black mt-4" > Test Series for {courseTest?.topic?.name} ({courseTest?.CategoryTestSeries?.length ? courseTest?.CategoryTestSeries?.length : 0}) </h4>
                                                            <div className="row mt-4" key={index}>
                                                                {(searchData && searchData.length ? searchData : courseTest?.CategoryTestSeries)?.map((testdata, index) => {
                                                                    return (
                                                                        <div className="col-xl-3 col-sm-3" key={index}>
                                                                            <div className="card">
                                                                                <div className="card-body">
                                                                                    <div className="card-schedule plan">
                                                                                        <div className="row justify-content-between content align-items-center">
                                                                                            <div className="col-xl-10 col-sm-10">
                                                                                                <p>TEST:{index + 1} {testdata?.title}</p>
                                                                                            </div>
                                                                                            <div className="col-xl-2 col-sm-2" key={index}>
                                                                                                <Link className="btn btn-primary btn-xs" onClick={() => handleclick(testdata, index)}>
                                                                                                    <i className="bi-journal-text" />
                                                                                                </Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-footer">
                                                                                    <div className="justify-content-between content align-items-center">
                                                                                        <span className="mr-2">
                                                                                            <i className="bi-info-square" /> {testdata?.no_of_qstns}Ques </span>
                                                                                        <span className="mr-2">
                                                                                            <i className="bi-journal-album" /> {testdata?.marks}Marks </span>
                                                                                        <span className="mr-2">
                                                                                            <i className="bi-stopwatch" /> {Math.floor(testdata?.time_duration / 60)} Hour {testdata?.time_duration % 60} Min </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </> : <>
                                                <div className="card mt-4">
                                                    <div className="card-body mr-2">
                                                        <h5 className="text-red text-center"> No TestSeries Available</h5>
                                                    </div>
                                                </div>
                                            </>}
                                        </div>
                                    </div>

                                </> : <Loader />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal modal={modal} indexdata={indexdata} setTestSrModelShow={setTestSrModelShow} testSrModelShow={testSrModelShow} />
        <div className={testSrModelShow ? "modal-backdrop fade show" : ""}></div>
    </>
    )
}

export default CoursedetailsTwo

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Tokens } from '../../../../../App'
import axiosClient from "../../../../../webServices/webservice"
import Loader from '../../../../../components/loader/Loader'
import { ProtectUrl } from '../../../../../utils'
import * as view from "../../../../view"
import Modal from './modal'
import { COURSES, SUBSCRIPTION } from '../../../../../route/route'
import { webUrls } from '../../../../../webServices/webUrls'

const CoursedetailsTwo = () => {
    const navigate = useNavigate()
    const { slug, cslug } = useParams()
    const token = useContext(Tokens)
    const [modal, setModal] = useState()
    const [loading, setLoading] = useState(false)
    const [indexdata, setIndexdata] = useState()
    const [details, setDetails] = useState()
    const [getSearchData, setGetSearchData] = useState()
    const [searchData, setSearchData] = useState([])
    const [videoLecturesTab, setVideolectureTab] = useState(true)
    const [pdfNotesTab, setPdfNotesTab] = useState(false)
    const [testSeriesTab, setTestSeriesTab] = useState(false)
    const [testSrModelShow, setTestSrModelShow] = useState(false)
    const user = JSON.parse(localStorage.getItem("user_data"))
    const myId = localStorage.getItem("eXvctIdv")

    const handleclick = (data, index) => {
        setModal(data)
        setIndexdata(index)
        setTestSrModelShow(true)
    }

    useEffect(() => {
        if (token) {
            const CourseCategory = async () => {
                if (ProtectUrl(slug)) {
                    setLoading(true)
                    try {
                        let data = JSON.stringify({
                            mobile: user.mobile
                        });
                        let response = await axiosClient.post(`${webUrls.COURSE_CATEGORY_URL}/${slug}/${cslug}/${myId}/`, data, {
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            }
                        })
                        if (response.status === 200) {
                            setLoading(false)
                            setGetSearchData(response?.data?.Lectures)
                            setDetails(response?.data)
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    navigate(`/${COURSES}/${slug}`)
                }
            }
            CourseCategory()
        }
    }, [token, slug, cslug, myId, user.mobile, navigate])


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
    return (<>
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to={`/${SUBSCRIPTION}/${slug}`} className="d-flex align-self-center">
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
                                                    <i className="fa fa-video-camera me-2" /> Video Lectures ({details?.Lectures?.length ? details?.Lectures?.length : 0}) </button>
                                                <button className={pdfNotesTab ? "nav-link active" : "nav-link"} id="nav-pdfnotes-tab" onClick={notesData} type="button" role="tab" >
                                                    <i className="fa fa-book me-2" /> PDF Notes ({details?.Notes?.length ? details?.Notes?.length : 0}) </button>
                                                <button className={testSeriesTab ? "nav-link active" : "nav-link"} id="nav-testseries-tab" onClick={testSeriesData} type="button" role="tab" >
                                                    <i className="bi-journal-text me-2" /> Test Series ({details?.TestSeries?.length ? details?.TestSeries?.length : 0}) </button>
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
                                {!loading ? <>
                                    <div className="tab-content" id="nav-tabContent">
                                        <view.VIDEO_LECTURES details={details} videoLecturesTab={videoLecturesTab} searchData={searchData} />
                                        <view.PDF_NOTES_TAB details={details} pdfNotesTab={pdfNotesTab} searchData={searchData} />
                                        <view.TEST_SERIES_TAB details={details} testSeriesTab={testSeriesTab} searchData={searchData} handleclick={handleclick} />
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

import React from 'react'
import { Link } from 'react-router-dom'

const VideoLectures = (props) => {
    const { details, videoLecturesTab, searchData } = props

    const sendData = (coursedetail, data) => {
        sessionStorage.setItem("vid", JSON.stringify(data))
        sessionStorage.setItem("cate", JSON.stringify(coursedetail))
    }

    return (
        <div className={videoLecturesTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-videos" role="tabpanel" aria-labelledby="nav-videos-tab">
            {(details?.Lectures?.length) ? <>
                {details?.Lectures?.map((coursedetail, index1) => {
                    return (
                        <div className="about-content" key={index1}>
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
    )
}

export default VideoLectures

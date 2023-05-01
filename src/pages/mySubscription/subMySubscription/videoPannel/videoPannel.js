import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import JoLPlayer from "jol-player"

const VideoPannel = () => {

    const VideoData = JSON.parse(sessionStorage.getItem("vid"))
    const categories = JSON.parse(sessionStorage.getItem("cate"))
    const student = JSON.parse(localStorage.getItem("userdata"))


    const [playlist, setPlaylist] = useState()
    const [searchData, setSearchData] = useState()

    const Search = (e) => {
        let search = e.target.value
        let data = categories.CategoryLectures?.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        setSearchData(data)
    }

    // /* for appear fullscreen icon on player */
    // .course-video-tab .JoL-player-container .tooltip{
    //     z-index: 1070;
    //     opacity: 1;
    //     }
    //     /* for appear overright player */
    //     .course-video-tab .JoL-player-container{
    //       z-index:0;
    //     }

    return (
        <>
            <div className="container-fluid">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        <Link onClick={() => { window.history.back() }} className="d-flex align-self-center">
                            <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
                            </svg> Back </Link>
                    </li>
                </ol>
                <div className="row">
                    <div className="col-md-8 col-lg-8">
                        <div className="card h-auto">
                            <div className="card-body">
                                <div className="course-details-tab style-2 mt-0 mb-2">
                                    <div className="live-img course-video-tab">

                                        <JoLPlayer
                                            option={{
                                                videoSrc:
                                                    `${(playlist && playlist.id) ? playlist?.video_540 : VideoData?.video_540}`,
                                                height: 335,
                                                width: "100%",
                                                theme: "#8A2BE2",
                                                poster:
                                                    `${(playlist && playlist.id) ? playlist?.app_thumbnail : VideoData?.app_thumbnail}`,

                                                language: "en",
                                                pausePlacement: "center",
                                                isShowWebFullScreen: false,
                                                isShowScreenshot : false,

                                                quality: [
                                                    {
                                                        name: "FHD",
                                                        url:
                                                            `${(playlist && playlist.id) ? playlist?.video_720 : VideoData?.video_720}`
                                                    },
                                                    {
                                                        name: "HD",
                                                        url:
                                                            `${(playlist && playlist.id) ? playlist?.video_540 : VideoData?.video_540}`
                                                    },
                                                    {
                                                        name: "SD",
                                                        url:
                                                            `${(playlist && playlist.id) ? playlist?.video_360 : VideoData?.video_360}`
                                                    }
                                                ]
                                            }}
                                        />

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-9 col-lg-9">
                                            <h4 className="mb-0 text-primary">{(playlist && playlist.id) ? playlist.title : VideoData.title}</h4>
                                            <h5>Discription : {(playlist && playlist.id) ? playlist.discription : VideoData.discription}</h5>

                                        </div>

                                    </div>
                                    <div className="row user-pic2">
                                        <div className="col-lg-1 col-md-1">
                                            <img src="https://toppng.com//public/uploads/preview/man-icon-icon-11553432006itw46zhhk8.png"  alt=''/>
                                        </div>
                                        <div className="col-lg-10 col-md-10 mt-2">
                                            <small>Faculty By:</small>
                                            <h4>Dr. Kuldeep Sarkar (M.B.B.S)</h4>
                                        </div>
                                        <div className="col-lg-1 col-md-1 mt-3">

                                            <div className="miac bg-primary" onClick={() => { window.history.back() }}>
                                                <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.9996 31.4999C23.6947 31.4999 29.9547 25.2399 29.9547 17.5453C29.9547 12.228 26.864 7.30199 22.0817 4.99645C21.6163 4.77086 21.0893 4.7401 20.6021 4.91179C20.1121 5.08257 19.7185 5.43352 19.4943 5.90044C19.0307 6.86254 19.4366 8.02239 20.3987 8.48644C23.8499 10.1505 26.0797 13.7062 26.0797 17.5453C26.0797 23.1033 21.5576 27.6249 15.9996 27.6249C10.4416 27.6249 5.91993 23.1033 5.91993 17.5453C5.91993 13.7062 8.15028 10.1505 11.6015 8.48693C12.5636 8.02337 12.9694 6.86303 12.5059 5.89995C12.2807 5.4326 11.8862 5.08159 11.3961 4.9113C10.908 4.74058 10.3811 4.77177 9.91938 4.99644C5.13568 7.3015 2.04492 12.2276 2.04492 17.5453C2.04492 25.2399 8.30542 31.4999 15.9996 31.4999Z" fill="white" />
                                                    <path d="M16 11.757C17.0681 11.757 17.9375 10.8881 17.9375 9.81946V2.4375C17.9375 1.36896 17.0681 0.5 16 0.5C14.932 0.5 14.0625 1.36896 14.0625 2.4375V9.81946C14.0625 10.8881 14.9319 11.757 16 11.757Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4">
                        <div className="course-details-tab style-2">
                            <nav>
                                <div className="nav nav-tabs tab-auto" id="nav-tab" role="tablist">
                                    <button className="nav-link active " id="nav-discussion-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-discussion" type="button" role="tab" aria-controls="nav-discussion"
                                        aria-selected="false">
                                        <i className="bi-clipboard-data mr-1"></i> {categories?.CategoryLectures?.length} Playlists </button>
                                    <button className="nav-link" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                        type="button" role="tab" aria-controls="nav-about" aria-selected="true">
                                        <i className="bi-chat-right-text"></i> 12 Comments </button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                    <div className="row mt-4">
                                        <div className="col-md-12 col-md-6">
                                            <div className="bg-white">
                                                <div className="card-header d-block">
                                                    <div className="user-pic2">
                                                        <div className="row">
                                                            <label className="col-lg-1 col-form-label" htmlFor="validationCustom04">
                                                                <img
                                                                    src={student?.dp}
                                                                    alt="" />
                                                            </label>
                                                            <div className="col-lg-1"></div>
                                                            <div className="col-lg-10 type-massage style-1">
                                                                <div className="input-group">
                                                                    <textarea className="form-control" placeholder="Add a comment..."></textarea>
                                                                    <form>
                                                                        <div className="input-group-append">
                                                                            <button type="button" className="btn btn-primary p-2">
                                                                                <svg className="ms-1" width="16" height="16" viewBox="0 0 25 24" fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M3.58106 13.6267L10.5819 12.2265C11.2071 12.1016 11.2071 11.8984 10.5819 11.7735L3.58106 10.3732C3.16406 10.29 2.75793 9.88348 2.67468 9.46686L1.27443 2.46599C1.14918 1.84049 1.51781 1.54986 2.09718 1.81724L23.4606 11.6771C23.8464 11.8552 23.8464 12.1447 23.4606 12.3229L2.09718 22.1827C1.51781 22.4501 1.14918 22.1595 1.27443 21.534L2.67468 14.5331C2.75793 14.1165 3.16406 13.71 3.58106 13.6267Z"
                                                                                        fill="white"></path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <h4 className='text-center'>No Comments Available</h4>
                                                </div>
                                                
                                                <div className="card-footer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show active" id="nav-discussion" role="tabpanel"
                                    aria-labelledby="nav-discussion-tab">
                                    <div className="row mt-4">
                                        <div className="col-md-12 col-md-6">
                                            <div className="bg-white">
                                                <div className="card-header d-block">
                                                    <div className="widget-heading d-flex justify-content-between align-items-center">
                                                        <h5 className="m-0">{categories?.topic?.name}</h5>
                                                    </div>
                                                    <div className="input-group search-area mr-2 mt-2">
                                                        <span className="input-group-text">
                                                            <a href={{ javascript: "void (0)" }}>
                                                                <svg width={24} height={24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z" fill="var(--secondary)" />
                                                                </svg>
                                                            </a>
                                                        </span>
                                                        <input type="text" onChange={Search} className="form-control" placeholder="Search here..." />
                                                    </div>
                                                </div>
                                                <div className="row card-body scrollspy">

                                                    {(searchData && searchData.length ? searchData : categories?.CategoryLectures)?.map((item, index) =>
                                                    (
                                                        <div className="col-md-12 col-lg-12 col-sm-12" key={index} >
                                                            <div className="card h-auto" id={index} onMouseOver={()=>document.getElementById(index).style.backgroundColor="lightyellow"} onMouseLeave={()=>document.getElementById(index).style.backgroundColor=""}>
                                                                <div className="card-body" style={{ color: `${((playlist && playlist.id ? playlist?.id : VideoData?.id) === item?.id) ? "blue" : ""}` }}>
                                                                    <div className="card-schedule plan">
                                                                        <div className="row justify-content-between content align-items-center">
                                                                            <div className="col-md-10 col-sm-10">
                                                                                <p>{item?.title}</p>
                                                                            </div>
                                                                            <div className="col-md-2 col-sm-2" onClick={() => setPlaylist(item)}>
                                                                                <h5 className={`${((playlist && playlist.id ? playlist?.id : VideoData?.id) === item?.id) ? "btn btn-success btn-xs" : "btn btn-primary btn-xs"}`}>
                                                                                    <i className="bi-play-btn"></i>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="card-footer">
                                                    <div className="pagination-down">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                            <h4 className="sm-mb-0 mb-2">Showing <span>1-{categories?.CategoryLectures?.length} </span>from <span>{categories?.CategoryLectures?.length} </span>data </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade show" id="nav-note" role="tabpanel" aria-labelledby="nav-note-tab">
                                    <div className="row mt-4">
                                        <div className="col-md-12 col-md-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4 className="card-title">Note</h4>
                                                </div>
                                                <div className="card-body custom-ekeditor">
                                                    <div id="ckeditor"></div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="d-flex justify-content-between content align-items-center">
                                                        
                                                        <a href="coursecategories.html" className="btn btn-primary btn-sm"> submit</a>
                                                    </div>
                                                </div>

                                                <div className="card-body about-content mt-2">
                                                    <h5 className="text-primary">Created on: 12/12/2022 12:30 PM</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                                        ut labore et dolore magna aliqua.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                        labore et dolore magna aliqua. </p>
                                                    <h5 className="text-primary">Created on: 14/12/2022 12:30 PM</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                                        ut labore et dolore magna aliqua.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                        labore et dolore magna aliqua. </p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default VideoPannel
import React, { useState, } from "react";
import { Link } from "react-router-dom";
import Module from "./modale";
import Pagination from "./pagination";
import profileImg from "./images/img.png"
import degree from "./images/svg/degree-certificate.svg"
import microscope from "./images/svg/microscope.svg"
import cup from "./images/svg/cup.svg"
import education from "./images/svg/education-website.svg"
import planet from "./images/svg/planet.svg"
import skill from "./images/svg/skill.svg"
import readingtime from "./images/svg/readingtime.svg"
import puzzle from "./images/svg/puzzle.svg"
import { isSubscription } from "../../utils";

let postsPerPage = 5
const MyProfile = (props) => {
    const { profileData, ProfileApi } = props
    let issubs = isSubscription()
    const mypro = JSON.parse(localStorage.getItem("userdata"))
    const [user, setUser] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentTableData = mypro?.subscriptions?.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(mypro?.subscriptions?.length + 1 / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const incrementPageNumber = () => {
        if (currentPage < pageNumbers.length - 1) {
            setCurrentPage((previousPageNumber) => previousPageNumber + 1);
        }
    };

    const decrementPageNumber = () => {
        if (currentPage > 0) {
            setCurrentPage((previousPageNumber) => previousPageNumber - 1);
        }
    };


    const handleEditClick = () => {
        setUser(profileData)
        setShowModal(true)
    }

    const Search = (e) => {
        let search = e.target.value
        let data = mypro?.subscriptions?.filter(item => item.course.name.toLowerCase().includes(search.toLowerCase()))
        setSearchData(data)
    }
    // console.log(profileData);
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-8 col-xxl-8">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-sm-12">
                                <img src={profileImg} width="100%" className="mb-4" style={{ borderRradius: "4px" }} alt="" />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div
                                            className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src={degree} alt="" />
                                                <div className="ms-4">
                                                    <h4>{(profileData?.subscriptions?.length) ? profileData?.subscriptions?.length : 0}</h4>
                                                    <span><strong>Online Courses</strong></span>
                                                </div>
                                            </div>
                                            <Link href="subscription"><i
                                                className="fa fa-angle-right text-primary"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div
                                            className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src={cup} alt="" />
                                                <div className="ms-4">
                                                    <h4>0</h4>
                                                    <span><strong>Test Series</strong></span>
                                                </div>
                                            </div>
                                            <Link to="/subscription"><i
                                                className="fa fa-angle-right text-secondary"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div
                                            className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src={microscope} alt="" />
                                                <div className="ms-4">
                                                    <h4>0</h4>
                                                    <span><strong>Offline Courses</strong></span>
                                                </div>
                                            </div>
                                            <Link href="/subscription"><i
                                                className="fa fa-angle-right text-secondary"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div
                                            className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src={education} alt="" />
                                                <div className="ms-4">
                                                    <h4>0</h4>
                                                    <span><strong>Study Material</strong></span>
                                                </div>
                                            </div>
                                            <Link href="subscription"><i
                                                className="fa fa-angle-right text-secondary"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-xxl-4">
                        <div className="card instructors-box h-auto">
                            <div className="card-body">
                                <div className="instructors-media mt-3">
                                    <div className="instructors-media-info text-center mt-4">
                                        <img src={profileData?.dp} alt="" />
                                        <ul className="list-group list-group-flush mt-4">
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Student</strong>
                                                <span className="mb-0">{profileData?.fullname}</span>
                                            </li>
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Mobile</strong>
                                                <span className="mb-0">{profileData?.mobile}</span>
                                            </li>
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Email</strong>
                                                <span className="mb-0">{profileData?.email}</span>
                                            </li>
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Member Since</strong>
                                                <span className="mb-0">{new Date(profileData?.created_at).toDateString()}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="achievements ">
                                    <div className="card-schedule mb-4">
                                        <div className="d-flex justify-content-between content align-items-center">
                                            <button className="btn btn-primary btn-sm text-left"
                                                onClick={handleEditClick}>
                                                <i className="bi-pencil-square"></i> Edit details
                                            </button>

                                        </div>
                                    </div>

                                    <h4 className="text-start mb-4">Achievements</h4>
                                    <div className="achievements-content flex-wrap">
                                        <span><img src={planet} alt="" /></span>
                                        <span><img src={skill} alt="" /></span>
                                        <span><img src={readingtime} alt="" /></span>
                                        <span><img src={puzzle} alt="" /></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card students-list h-auto">
                            <div className="card-body pt-2">
                                <h4 className="mt-2 mb-4">Lastest Transaction</h4>
                                <div className="table-responsive">
                                    <div id="example3_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="dataTables_length" id="example3_length">
                                            <label>Show
                                                <select name="example3_length" aria-controls="example3" className="">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </select> Entries</label>
                                        </div>
                                        <div id="example3_filter" className="dataTables_filter">
                                            <label>Search:
                                                <input type="search" className="" placeholder="" aria-controls="example3" onChange={Search} />
                                            </label>
                                        </div>
                                        {issubs ? <table id="example3" className="display dataTable no-footer " >
                                            <thead>
                                                <tr className="text-center">
                                                    <th className="sorting" style={{ "width": "148.75px" }}>Purchase Date</th>
                                                    <th className="sorting" style={{ "width": "144.781px" }}>Expiry Date</th>
                                                    <th className="sorting" style={{ "width": "442.188px" }}>Course Name</th>
                                                    <th className="sorting" style={{ "width": "123.25px" }}>Amount</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(searchData && searchData.length ? searchData : currentTableData)?.map((sub, index) => (
                                                    <tr className="odd text-center" key={index}>
                                                        <td className="sorting_1">{new Date(sub?.subscription?.created_at).toDateString()}</td>
                                                        <td>{new Date(sub?.expiry_date).toDateString()}</td>
                                                        <td className="text-primary">{sub?.course?.name}</td>
                                                        <td className="text-center">{sub?.subscription?.plan_price}</td>

                                                    </tr>))}
                                            </tbody>
                                        </table> : <div className="text-center"><h4 className="text-center text-primary">You Have Not Purchased Any Subscriptions</h4></div>}

                                        <div className="dataTables_info mt-3" id="example3_info" >Showing {mypro?.subscriptions.length} of {mypro?.subscriptions.length} entries</div>

                                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} incrementPageNumber={incrementPageNumber} decrementPageNumber={decrementPageNumber} pageNumbers={pageNumbers} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Module user={user} ProfileApi={ProfileApi} setShowModal={setShowModal} showModal={showModal} />
            <div className={showModal ? "modal-backdrop fade show" : ""}></div>
        </div>

    )
}

export default MyProfile
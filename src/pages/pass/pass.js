import React from 'react'

const Pass = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-8 col-xxl-8">
                        <div className="row">
                            <div className="widget-heading d-flex justify-content-between align-items-center">
                                <h4 className="mb-2">Current Courses</h4>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src="images/svg/degree-certificate.svg" alt="" />
                                                <div className="ms-4">
                                                    <h4>6</h4>
                                                    <span>Online Courses</span>
                                                </div>
                                            </div>
                                            <a href="subscription.html"><i className="fa fa-angle-right text-primary" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src="images/svg/cup.svg" alt="" />
                                                <div className="ms-4">
                                                    <h4>2</h4>
                                                    <span>Test Series</span>
                                                </div>
                                            </div>
                                            <a href="subscription.html"><i className="fa fa-angle-right text-secondary" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src="images/svg/microscope.svg" alt="" />
                                                <div className="ms-4">
                                                    <h4>0</h4>
                                                    <span>Offline Courses</span>
                                                </div>
                                            </div>
                                            <a href="subscription.html"><i className="fa fa-angle-right text-secondary" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-sm-6">
                                <div className="card profile-widget">
                                    <div className="card-body">
                                        <div className="widget-courses align-items-center d-flex justify-content-between style-1 flex-wrap">
                                            <div className="d-flex">
                                                <img src="images/svg/education-website.svg" alt="" />
                                                <div className="ms-4">
                                                    <h4>0</h4>
                                                    <span>Study Material</span>
                                                </div>
                                            </div>
                                            <a href="subscription.html"><i className="fa fa-angle-right text-secondary" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card students-list h-auto">
                                    <div className="card-body pt-2">
                                        <h4 className="mt-2">Lastest Transaction</h4>
                                        <div className="table-responsive p-3">
                                            <table className="table display  dataTablesCard card-table text-black application" id="example5">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Course Name</th>
                                                        <th>Amount</th>
                                                        <th>Invoice</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>January 2, 2022</td>
                                                        <td className="text-primary">MPPSC Mains Foundation (AADHAR English
                                                            Batch)</td>
                                                        <td>₹17500</td>
                                                        <td>
                                                            <a href="javascript:void(0);">Download
                                                                <i className="bi-download text-secondary" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>January 2, 2022</td>
                                                        <td className="text-primary">MPPSC Mains Foundation (AADHAR English
                                                            Batch)</td>
                                                        <td>₹17500</td>
                                                        <td>
                                                            <a href="javascript:void(0);">Download
                                                                <i className="bi-download text-secondary" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>January 2, 2022</td>
                                                        <td className="text-primary">MPPSC Mains Foundation (AADHAR English
                                                            Batch)</td>
                                                        <td>₹17500</td>
                                                        <td>
                                                            <a href="javascript:void(0);">Download
                                                                <i className="bi-download text-secondary" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-xxl-4">
                        <div className="card instructors-box mt-5 h-auto">
                            <div className="card-body text-center pb-3">
                                <div className="instructors-media  mt-3">
                                    <img src="images/profile.png" alt="" />
                                    <div className="instructors-media-info mt-4">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Student</strong>
                                                <span className="mb-0">Student Name</span>
                                            </li>
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Mobile</strong>
                                                <span className="mb-0">+919876543210</span>
                                            </li>
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Email</strong>
                                                <span className="mb-0">studentname@gmail.com</span>
                                            </li>
                                            <li className="list-group-item d-flex px-0 justify-content-between">
                                                <strong>Member Since</strong>
                                                <span className="mb-0">12 October 2022</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="achievements ">
                                    <h4 className="text-start mb-4">Achievements</h4>
                                    <div className="achievements-content flex-wrap">
                                        <span><img src="images/svg/planet.svg" alt="" /></span>
                                        <span><img src="images/svg/skill.svg" alt="" /></span>
                                        <span><img src="images/svg/readingtime.svg" alt="" /></span>
                                        <span><img src="images/svg/puzzle.svg" alt="" /></span>
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

export default Pass
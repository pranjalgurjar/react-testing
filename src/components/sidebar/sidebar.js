import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const {pathname} = props

    return (
        <>
            <div className="dlabnav">
                <div className="dlabnav-scroll mm-active ps ps--active-y ps--scrolling-y">
                    <ul className="metismenu mm-show" id="menu">
                        <li className="nav-divider ng-scope" translate="">Subscription Plans</li>
                        <li className={`${pathname ==="subscription" ? "mm-active" : ""}`}>
                            <Link to="/subscription" aria-expanded="false" >
                                <i className="bi-cast"></i>
                                <span className="nav-text"> My Subscription</span>
                            </Link>
                        </li>
                        <li className="nav-divider ng-scope" translate="">Learn</li>
                        <li className={`${ pathname ==="courses"? "mm-active" : ""}`}>
                            <Link to="/courses" aria-expanded="false"  >
                                <i className="bi-journals"></i>
                                <span className="nav-text">Courses</span>
                            </Link>
                        </li>



                        <li className={`${pathname ==="liveclasses" ? "mm-active" : ""}`}>
                            <Link to="/liveclasses" aria-expanded="false" >
                                <i className="bi bi-camera-reels-fill"></i>
                                <span className="nav-text"> Live Classes</span>
                            </Link>
                        </li>

                        <li className={`${pathname === "currentAffairs" ? "mm-active" : ""}`}>
                            <Link to="/currentAffairs" aria-expanded="false">
                                <i className="bi bi-calendar2-event"></i>
                                <span className="nav-text">Current Affairs</span>
                            </Link>
                        </li>
                        <li className="nav-divider ng-scope" translate="">Test & Study Material</li>
                        <li className={`${pathname ==="testseries" ? "mm-active" : ""}`}>
                            <Link to="/testseries" aria-expanded="false" >
                                <i className="bi-journal-text"></i>
                                <span className="nav-text">Test Series</span>
                            </Link>
                        </li>
                        <li className={`${pathname === "studymaterial" ?"mm-active"  : ""}`}>
                            <Link to="/studymaterial" aria-expanded="false" >
                                <i className="bi bi-book-half"></i>
                                <span className="nav-text">Study Material</span>
                            </Link>
                        </li>
                        <li className={`${pathname ==="prevyearpapers" ?"mm-active" : ""}`}>
                            <Link to="/prevyearpapers" aria-expanded="false">
                                <i className="bi-compass"></i>
                                <span className="nav-text">Prev Year Papers</span>
                            </Link>
                        </li>

                        <li className="nav-divider ng-scope" translate="">More</li>
                        <li className={`${pathname ==="myprofile" ? "mm-active"  : ""}`}>
                            <Link to="/myprofile" aria-expanded="false" >
                                <i className="bi-person-lines-fill"></i>
                                <span className="nav-text">My Profile</span>
                            </Link>
                        </li>

                        <li className={`${pathname === "support" ? "mm-active" : ""}`}>
                            <Link to="/support" aria-expanded="false" >
                                <i className="bi-info-square"></i>
                                <span className="nav-text">Help & Support</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>


        </>
    );
}

export default Sidebar;
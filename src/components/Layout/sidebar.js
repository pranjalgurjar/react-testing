import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, pathName } from '../../utils';
import { useEffect } from 'react';
import { COURSES, CURRENT_AFFAIRS, LIVE_CLASSES, LOGIN, MY_PROFILE, PREV_YEAR_PAPER, STUDY_MATERIAL, SUBSCRIPTION, SUPPORT, TEST_SERIES } from '../../route/route';



function Sidebar(props) {
    const navigate = useNavigate()
    const { pathname, setPathname } = props

    function Log_Out() {
        LogOut()
        navigate(LOGIN)
    }

    useEffect(() => {
        window.onpopstate = () => {
            let nn = pathName()
            setPathname(nn)
        }
        window.onclick = () => {
            let nn = pathName()
            setPathname(nn)
        }
    }, [setPathname])


    return (
        <>
            <div className="dlabnav col-md-2 col-sm-1">
                <div className="dlabnav-scroll itemscroll mm-active ps--active-y">
                    <ul className="metismenu mm-show scrollmenu" id="menu">
                        <li className="nav-divider ng-scope" translate="">Subscription Plans</li>
                        <li className={`${pathname === "subscription" ? "mm-active" : ""}`}>
                            <Link to={`/${SUBSCRIPTION}`} >
                                <i className="bi-cast"></i>
                                <span className="nav-text"> My Subscription</span>
                            </Link>
                        </li>
                        <li className="nav-divider ng-scope" translate="">Learn</li>
                        <li className={`${pathname === "courses" ? "mm-active" : ""}`}>
                            <Link to={`/${COURSES}`} >
                                <i className="bi-journals"></i>
                                <span className="nav-text">Courses</span>
                            </Link>
                        </li>

                        <li className={`${pathname === "liveclasses" ? "mm-active" : ""}`}>
                            <Link to={LIVE_CLASSES} >
                                <i className="bi bi-camera-reels-fill"></i>
                                <span className="nav-text"> Live Classes</span>
                            </Link>
                        </li>

                        <li className={`${pathname === "currentAffairs" ? "mm-active" : ""}`}>
                            <Link to={CURRENT_AFFAIRS}>
                                <i className="bi bi-calendar2-event"></i>
                                <span className="nav-text">Current Affairs</span>
                            </Link>
                        </li>
                        <li className="nav-divider ng-scope" translate="">Test & Study Material</li>
                        <li className={`${pathname === "testseries" ? "mm-active" : ""}`}>
                            <Link to={TEST_SERIES} >
                                <i className="bi-journal-text"></i>
                                <span className="nav-text">Test Series</span>
                            </Link>
                        </li>
                        <li className={`${pathname === "studymaterial" ? "mm-active" : ""}`}>
                            <Link to={STUDY_MATERIAL} >
                                <i className="bi bi-book-half"></i>
                                <span className="nav-text">Study Material</span>
                            </Link>
                        </li>
                        <li className={`${pathname === "prevyearpapers" ? "mm-active" : ""}`}>
                            <Link to={PREV_YEAR_PAPER}>
                                <i className="bi-compass"></i>
                                <span className="nav-text">Prev Year Papers</span>
                            </Link>
                        </li>

                        <li className="nav-divider ng-scope" translate="">More</li>
                        <li className={`${pathname === "myprofile" ? "mm-active" : ""}`}>
                            <Link to={MY_PROFILE} >
                                <i className="bi-person-lines-fill"></i>
                                <span className="nav-text">My Profile</span>
                            </Link>
                        </li>

                        <li className={`${pathname === "support" ? "mm-active" : ""}`}>
                            <Link to={SUPPORT} >
                                <i className="bi-info-square"></i>
                                <span className="nav-text">Help & Support</span>
                            </Link>
                        </li>

                        <li className="">
                            <Link onClick={Log_Out}>
                                <i className="bi bi-box-arrow-left"></i>
                                <span className="nav-text">Log Out</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
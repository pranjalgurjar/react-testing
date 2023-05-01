import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Tokens } from '../../App';
import { TEST_endPointUrl } from '../../common/api/endPointUrl';
import Loader from '../../components/loader/Loader';
import "./testseries.css"
const TestSeries = () => {
    const token = useContext(Tokens)
    const studentID = localStorage.getItem("eXvctIdv")
    const [prefrence, setPrefrence] = useState()
    const [checking, setChecking] = useState()
    const [isloading, setIsloading] = useState(false)
    // console.log(prefrence);
    const [label, setLabel] = useState()
    const [testseries, setestseries] = useState()
    // console.log(testseries);
    
    const FindLableId = (id) => {
        setestseries([])
        setChecking({ id })
        fetch(TEST_endPointUrl + "api/study_material_labels/v1/" + id + "/" + studentID + "/", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            // console.log(result,"testid")
            let res = result?.content?.find(item => item.label === "Test Series")
            setLabel(true)
            if (res.label_id) {
                Test(res.label_id, id)
            }
        }).catch(err => {
            //  console.log(err)
        })
    }

    const Test = (id, cid) => {
        fetch(TEST_endPointUrl + "api/exam_study_material/test_series/package/", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course_id: cid,
                label_id: id,
                student_id: studentID
            }),
        }).then(response => response.json()).then(result => {
            if (result.length) {
                setIsloading(true)
                setestseries(result)
            } else {
                setLabel(false)
                setIsloading(false)
            }
        })
    }
    useEffect(() => {
        const Pref = () => {
            // for prefrence course
            fetch(TEST_endPointUrl + "api/student/get_each_preference_courses/mppsc-civil-services", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(result => { setPrefrence(result) }).catch(err => {
                // console.log(err)
            })
        }
        Pref()
    }, [token])
    // console.log(testseries,);
    return (
        <>{(prefrence && prefrence?.courses?.length) ? <div className="container-fluid">
            <div className="course-details-tab style-2">
                <h4 className="card-title"><i className="bi-journal-text me-2"></i> Test Series ({(testseries?.length) ? testseries?.length : (label?.label_id) ? "..." : 0})
                </h4>
                <div className="course-details-tab style-2">
                    <nav>
                        <div className="nav nav-tabs justify-content-start tab-auto scrollmenu" id="nav-tab" role="tablist">
                            {prefrence?.courses?.map((item, index) => <button className={(checking && checking.id ? checking.id : prefrence?.courses?.[0]?.id) === item?.id ? "nav-link active" : "nav-link"} onClick={() => FindLableId(item?.id)} id="nav-about-tab" key={index} >{item?.name}</button>)}
                        </div>
                    </nav>
                </div>

                <div className="row mt-3">
                    {isloading ? (testseries && testseries?.length ? testseries : [])?.map((item, index) =>
                        <div className="col-xl-4 col-md-4" key={index}>
                            <div className="card all-crs-wid">
                                <div className="card-body">
                                    <div className="courses-bx">
                                        <div className="dlab-media">
                                            <img src={item.web_icon} alt="" />
                                        </div>
                                        <div className="dlab-info">
                                            <div className="dlab-title d-flex justify-content-between">
                                                <div className="mt-2">
                                                    <h4><Link to="/coursedetails"></Link></h4>
                                                    <p className="m-0">MPPSC Civil Services</p>
                                                </div>
                                                <div className="course_price ml-auto text-primary mt-2"><span>₹{item.bundle_price}</span>₹{item.bundle_dsc_price}</div>
                                            </div>
                                            <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps ps--active-y mt-4">
                                                <ul className="timeline">
                                                    <li>
                                                        <div className="timeline-badge info">
                                                        </div>
                                                        <a className="timeline-panel ,text-muted" href="/">
                                                            <h6 className="mb-0">12 FLTs Full Length Test</h6>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div className="timeline-badge success">
                                                        </div>
                                                        <a className="timeline-panel text-muted" href="/">
                                                            <h6 className="mb-0">24 Topic Wise Test </h6>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div className="timeline-badge warning">
                                                        </div>
                                                        <a className="timeline-panel text-muted" href="/">
                                                            <h6 className="mb-0">Bilingual Test Papers</h6>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-between content align-items-center">
                                        <Link to={`${item?.id}`} aria-expanded="false" activename="active" className="btn btn-warning btn-sm">
                                            <i className="bi-view-list" /> Explore
                                        </Link>
                                        <Link to="/package" aria-expanded="false" activename="active" className="btn btn-primary btn-sm" onClick={() => { sessionStorage.setItem("CRS", JSON.stringify(item)) }}>
                                            <i className="bi-cart3" /> Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (label) ? <div className="mt-4">
                        <div className="mr-2">
                            <h5 className="text-primary text-center">Loading....</h5>
                        </div>
                    </div> : <div className="mt-4">
                        <div className=" mr-2">
                            <h5 className="text-red text-center">TestSeries Not Available</h5>
                        </div>
                    </div>}
                </div>








            </div>
            <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
                <div className="row mt-4">
                </div>
            </div>
        </div> : <div className="container-fluid">
            <Loader />
        </div>}



        </>
    )
}

export default TestSeries
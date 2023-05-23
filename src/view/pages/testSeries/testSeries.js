import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Tokens } from '../../../App';
import { TEST_endPointUrl } from '../../../common/api/endPointUrl';
import Loader from '../../../components/loader/Loader';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

const TestSeries = () => {
    const token = useContext(Tokens)
    const studentID = localStorage.getItem("eXvctIdv")
    const [prefrence, setPrefrence] = useState()
    const [isloading, setIsloading] = useState(false)
    const [label, setLabel] = useState()
    const [testseries, setestseries] = useState()
    const [value, setValue] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    FindLableId(newValue)
  }
    // console.log(testseries);

    const Test = useCallback((id, cid) => {
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
    }, [studentID, token])

    const FindLableId = useCallback((id) => {
        setLabel(true)
        setestseries([])
        if (id === undefined) {
            id = prefrence?.courses?.[0]?.id
        }
        fetch(TEST_endPointUrl + "api/study_material_labels/v1/" + id + "/" + studentID + "/", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            // console.log(result,"testid")
            let res = result?.content?.find(item => item.label === "Test Series")
            if (res.label_id) {
                Test(res.label_id, id)
            }
        }).catch(err => {
            //  console.log(err)
        })
    }, [Test, studentID, token, prefrence?.courses])

    useEffect(() => {
        FindLableId()
    }, [FindLableId])



    useEffect(() => {
        const Pref = () => {
            // for prefrence course
            fetch(TEST_endPointUrl + "api/student/get_each_preference_courses/mppsc-civil-services", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(result => { setPrefrence(result);setValue(result?.courses[0]?.id) }).catch(err => {
                // console.log(err)
            })
        }
        Pref()
    }, [token])
    return (
        <> <div className="container-fluid">
            <div className="course-details-tab style-2">
                <h4 className="card-title"><i className="bi-journal-text me-2"></i> Test Series ({(testseries?.length) ? testseries?.length : (label?.label_id) ? "..." : 0})
                </h4>
                <div className="course-details-tab style-2">
                <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label="secondary tabs example"
            TabIndicatorProps={{style:{background:'#886ffe',color:"#886ffe"}}}
            >
             {prefrence?.courses?.map((item, index) =><Tab style={value===item?.id?{color:"#886ffe"}:{}} label={item?.name} value={(value ===undefined)?prefrence?.courses?.[0]?.id:item?.id} key={index}/>)}
          </TabList>
        </Box>
        <TabPanel value={value}>
                     {(prefrence && prefrence?.courses?.length) ?
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
                                                    <h4><Link></Link></h4>
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
                                        <Link to={`/courses/details/${item?.slug}`}aria-expanded="false" activename="active" className="btn btn-warning btn-sm">
                                            <i className="bi-view-list" /> Explore
                                        </Link>
                                        <Link to={`/courses/${item?.id}`} aria-expanded="false" activename="active" className="btn btn-primary btn-sm" onClick={() => { sessionStorage.setItem("CRS", JSON.stringify(item)) }}>
                                            <i className="bi-cart3" /> Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (label) ? <div className="container-fluid">
                        <Loader />
                    </div> : <div className="card mt-4">
                        <div className="card-body mr-2">
                            <h5 className="text-red text-center"> No TestSeries Available</h5>
                        </div>
                    </div>}
                </div>
            : <Loader />}
                    </TabPanel>
            </TabContext>
                </div>            
        </div>
        </div>
        </>
    )
}

export default TestSeries
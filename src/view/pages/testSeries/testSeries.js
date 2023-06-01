import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Tokens } from '../../../App';
import axiosClient from "../../../webServices/webservice"
import Loader from '../../../components/loader/Loader';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { Title, useDocumentTitle } from '../../../coustomhook';
import { COURSES } from '../../../route/route';
import { webUrls } from '../../../webServices/webUrls';


const TestSeries = () => {
    useDocumentTitle(`${Title.documentTitle} | TestSeries | ${Title.backTitle}`)
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

    const Test = useCallback(async (id, cid) => {
        let data = JSON.stringify({
            course_id: cid,
            label_id: id,
            student_id: studentID
        })
        try {
            let response = await axiosClient.post(webUrls.TESTSERIES_PACKAGE_URL, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                if (response.data.length) {
                    setIsloading(true)
                    setestseries(response.data)
                } else {
                    setLabel(false)
                    setIsloading(false)
                }
            }
        } catch (e) {
            console.log(e);
        }

    }, [studentID, token])

    const FindLableId = useCallback(async (id) => {
        if (token) {
            setLabel(true)
            setestseries([])
            if (id === undefined) {
                id = prefrence?.courses?.[0]?.id
            }
            try {
                let response = await axiosClient.get(`${webUrls.STUDY_MATERIAL_LABLE_URL}/${id}/${studentID}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    let res = response?.data?.content?.find(item => item.label === "Test Series")
                    if (res.label_id) {
                        Test(res.label_id, id)
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [Test, studentID, token, prefrence?.courses])

    useEffect(() => {
        FindLableId()
    }, [FindLableId])



    useEffect(() => {
        if (token) {
            const Pref = async () => {
                // for prefrence course
                try {
                    let response = await axiosClient.get(webUrls.EACH_COURSE_PREFRENCE_URL, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    })
                    if (response.status === 200) {
                        setPrefrence(response.data)
                        setValue(response?.data?.courses[0]?.id)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            Pref()
        }
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
                                TabIndicatorProps={{ style: { background: '#886ffe', color: "#886ffe" } }}
                            >
                                {prefrence?.courses?.map((item, index) => <Tab style={value === item?.id ? { color: "#886ffe" } : {}} label={item?.name} value={(value === undefined) ? prefrence?.courses?.[0]?.id : item?.id} key={index} />)}
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
                                                        <Link to={`/courses/details/${item?.slug}`} aria-expanded="false" activename="active" className="btn btn-warning btn-sm">
                                                            <i className="bi-view-list" /> Explore
                                                        </Link>
                                                        <Link to={`/${COURSES}/${item?.slug}`} aria-expanded="false" activename="active" className="btn btn-primary btn-sm" onClick={() => { sessionStorage.setItem("CRS", JSON.stringify(item)) }}>
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
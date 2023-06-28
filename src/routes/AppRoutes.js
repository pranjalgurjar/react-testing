import React, { useContext, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import axiosClient from "../webServices/webservice"
import { Tokens } from '../App';
import { isLogin, isSubscription } from '../utils/index';
import { useEffect } from 'react';
import { useCallback } from 'react';
import * as ROUTE from "../route/route"
import * as view from "../view/view"
import PrivateRoutes from './PrivateRoutes';
import { webUrls } from '../webServices/webUrls';


function AppRoutes(props) {
    const token = useContext(Tokens)
    const id = localStorage.getItem("eXvctIdv")
    const is_sub = isSubscription()
    const { couresPageData, Alldata } = props
    const [profileData, setProfileData] = useState();
    const [loader, setLoader] = useState(false)

    const ProfileApi = useCallback(async () => {
        setLoader(true)
        let isLog = isLogin()
        if (isLog && token) {
            try {
                let response = await axiosClient.get(`${webUrls.PROFILE_URL}${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setLoader(false)
                    localStorage.setItem("is_subscription", response.data.subscriptions.length)
                    localStorage.setItem("user_subscription", JSON.stringify(response.data.subscriptions))
                    setProfileData(response.data)
                }
            } catch (e) {
                setLoader(false)
                // console.log(e)
            }
        }
    }, [id, token])

    useEffect(() => {
        ProfileApi()
    }, [ProfileApi])
    return (<>

        <Routes>
            <Route path='/react-testing' element={<Navigate to={ROUTE.HOME} />} />
            <Route  path={ROUTE.HOME} element={<view.LAYOUT profileData={profileData} />} >
                <Route path={ROUTE.HOME} element={<PrivateRoutes />}>
                    <Route path={ROUTE.HOME} element={<Navigate to={is_sub ? ROUTE.SUBSCRIPTION : ROUTE.COURSES} />} />

                    <Route exact path={is_sub ? `/${ROUTE.COURSES}` : ROUTE.COURSES} element={<PrivateRoutes />}>
                        <Route index element={<view.COURSES couresPageData={couresPageData} />} />
                        <Route exact path={ROUTE.PACKAGE} element={<view.PACKAGE ProfileApi={ProfileApi} couresPageData={couresPageData} />} />
                        <Route exact path={ROUTE.COURSE_DETAIL_ONE} element={<view.COURSEDETAILONE />} />
                    </Route>
                    {/* my subscriptions Route */}
                    <Route path={is_sub ? ROUTE.SUBSCRIPTION : `/${ROUTE.SUBSCRIPTION}`} element={<PrivateRoutes />} >
                        <Route index element={<view.SUBSCRIPTION couresPageData={couresPageData} profileData={profileData} loader={loader} />} />
                        <Route path={ROUTE.COURSE_CATEGORIES} element={<PrivateRoutes />} >
                            <Route index element={<view.COURSECATEGORIES />} />
                            <Route path={ROUTE.COURSE_DEATAIL_TWO} element={<PrivateRoutes />} >
                                <Route index element={<view.COURSEDEATAILTWO />} />
                                <Route path={ROUTE.TEST_SERIES_ATTEMPT} element={<PrivateRoutes />} >
                                    <Route index element={<view.TESTSERIESATTEMPT />} />
                                    <Route path={ROUTE.TEST_SERIES_REPORT} element={<PrivateRoutes />} >
                                        <Route index element={<view.TESTSERIESREPORT />} />
                                        <Route path={ROUTE.TEST_SOLUTION} element={<view.TESTSOLUTION />} />
                                    </Route>
                                </Route>
                                <Route path={ROUTE.VIDEO_PANNEL} element={<view.VIDEOPANNEL />} />
                            </Route>
                        </Route>
                    </Route>
                    {/* end */}

                    <Route path={ROUTE.LIVE_CLASSES} element={<PrivateRoutes />} >
                        <Route index element={<view.LIVECLASSES />} />
                        <Route path={ROUTE.LIVE_PANNEL} element={<view.LIVEPANNEL />} />
                    </Route>

                    <Route path={ROUTE.CURRENT_AFFAIRS} element={<view.CURRENTAFFAIRS couresPageData={couresPageData} />} />
                    
                    <Route path={ROUTE.TEST_SERIES} element={<PrivateRoutes />}>
                        <Route index element={<view.TESTSERIES />} />
                        <Route path={ROUTE.TEST_SERIES_EXPLORE} element={<view.TESTSERIESEXPLORE />} />
                    </Route>
                    
                    <Route path={ROUTE.STUDY_MATERIAL} element={<view.STUDYMATERIAL couresPageData={couresPageData} />} />
                    
                    <Route path={ROUTE.PREV_YEAR_PAPER} element={<view.PREVYEARPAPER couresPageData={couresPageData} />} />
                    
                    <Route path={ROUTE.MY_PROFILE} element={<view.MYPROFILE profileData={profileData} ProfileApi={ProfileApi} />} />
                    
                    <Route path={ROUTE.SUPPORT} element={<view.SUPPORT />} />
                
                </Route>
            
            </Route>
            
            <Route path={ROUTE.FORGOT_PASS} element={<view.FORGOTPASS />} />
            <Route path={ROUTE.LOGIN} element={<view.LOGIN ProfileApi={ProfileApi} Alldata={Alldata} />} />
            <Route path={ROUTE.REGISTRATION} element={<view.REGISTRATION />} />
            <Route path={ROUTE.ERROR_PAGE} element={<view.ERRORPAGE />} />
        </Routes >
    </>)
}

export default AppRoutes;

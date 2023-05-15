import React, { useContext, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/register"
import CurrentAffairs from '../pages/currentAffairs/currentAffairs';
import Courses from '../pages/courses/courses';
import MySubscription from '../pages/mySubscription/mySubscription';
import LiveClasses from '../pages/liveClasses/liveClasses';
import TestSeries from '../pages/testSeries/testSeries';
import StudyMaterial from '../pages/studyMaterial/studyMaterial';
import PrevYearPapers from '../pages/Prev Year Papers/PrevYearPapers';
import MyProfile from '../pages/myPfofile/myProfile';
import Support from '../pages/support/support';
import CourseCategories from "../pages/mySubscription/subMySubscription/courseCategory/courseCategories";
import CoursedetailsTwo from "../pages/mySubscription/subMySubscription/coursedetailsTwo/coursedetailsTwo";
import VideoPannel from "../pages/mySubscription/subMySubscription/videoPannel/videoPannel";
import Package from '../pages/courses/package/Package';
import ErrorPage from '../pages/errorpage/ErrorPage';
import PrivateRoutes from './PrivateRoutes';
import CourseDetailsOne from '../pages/courses/coursedetailsone/courseDetailsOne';
import Layout from '../components/Layout/layout';
import LivePanel from '../pages/liveClasses/livepanel/livePanel';
import Testseriesexplore from '../pages/testSeries/testexplore/testseriesexplore';
import TestseriesAttempt from '../pages/mySubscription/subMySubscription/coursedetailsTwo/testseriesAttempt/testseriesAttempt';
import Testseriesreport from '../pages/mySubscription/subMySubscription/coursedetailsTwo/testseriesreport/testseriesreport';
import TestSolution from '../pages/mySubscription/subMySubscription/coursedetailsTwo/testseriesreport/testSolution';
import Forgetpassword from '../pages/login/forgetpassword';
import { TEST_endPointUrl } from '../common/api/endPointUrl';
import { Tokens } from '../App';
import { isSubscription} from '../utils';




function AppRoutes(props) {
    const token = useContext(Tokens)
    const id = localStorage.getItem("eXvctIdv")
    const { couresPageData } = props
    const [profileData, setProfileData] = useState();
    
    const ProfileApi = () => {

        fetch(TEST_endPointUrl + `api/student/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.id) {
                    localStorage.setItem("userdata", JSON.stringify(data))
                    setProfileData(data)
                }
            });
    }
    
    // console.log(profileData);
    return (<>

        <Routes>
            <Route path='/react-testing' element={<Navigate to="/" />} />
            <Route exact path='/' element={<Layout profileData={profileData}/>} >
                <Route path='/' element={<PrivateRoutes />}>
                    <Route path='/' element={<Navigate to={isSubscription() ? 'subscription' : 'courses'} />} />

                    <Route exact path={isSubscription() ? '/courses' : 'courses'} element={<PrivateRoutes />}>
                        <Route index element={<Courses couresPageData={couresPageData} />} />
                        <Route exact path=':cslug' element={<Package ProfileApi={ProfileApi} />} />
                        <Route exact path='details/:cdslug' element={<CourseDetailsOne />} />
                    </Route>
                    {/* my subscriptions Route */}
                    <Route path={isSubscription() ? 'subscription' : '/subscription'} element={<PrivateRoutes />} >
                        <Route index element={<MySubscription couresPageData={couresPageData} />} />
                        <Route path=':slug' element={<PrivateRoutes />} >
                            <Route index element={<CourseCategories />} />
                            <Route path=':cslug' element={<PrivateRoutes />} >
                                <Route index element={<CoursedetailsTwo />} />
                                <Route path='que/:id/:nameindex/:title' element={<PrivateRoutes />} >
                                    <Route index element={<TestseriesAttempt />} />
                                    <Route path='report' element={<PrivateRoutes />} >
                                        <Route index element={<Testseriesreport />} />
                                        <Route path='testsolution' element={<TestSolution />} />
                                    </Route>
                                </Route>
                                <Route path='vid/:vslug' element={<VideoPannel />} />
                            </Route>
                        </Route>
                    </Route>
                    {/* end */}

                    <Route path='/liveclasses' element={<PrivateRoutes />} >
                        <Route index element={<LiveClasses />} />
                        <Route path=':lslug' element={<LivePanel />} />
                    </Route>
                    <Route path='/currentAffairs' element={<CurrentAffairs />} />
                    <Route path='/testseries' element={<PrivateRoutes />}>
                        <Route index element={<TestSeries />} />
                        <Route path=':tid' element={<Testseriesexplore />} />
                    </Route>
                    <Route path='/studymaterial' element={<StudyMaterial />} />
                    <Route path='/prevyearpapers' element={<PrevYearPapers />} />
                    <Route path='/myprofile' element={<MyProfile profileData={profileData} ProfileApi={ProfileApi} />} />
                    <Route path='/support' element={<Support />} />
                </Route>
            </Route>
            <Route path='/forgot' element={<Forgetpassword />} />
            <Route path='/login' element={<Login setProfileData={setProfileData} />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes >
    </>)
}

export default AppRoutes;

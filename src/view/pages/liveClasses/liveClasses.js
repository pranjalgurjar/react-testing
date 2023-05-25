import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TEST_endPointUrl } from '../../../common/api/endPointUrl'
import { Tokens } from "../../../App"
import { useCallback } from 'react'
import { isSubscription } from '../../../utils'
import Loader from '../../../components/loader/Loader'
import { Box, Tab} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useDocumentTitle } from '../../../coustomhook'


const LiveClasses = (props) => {
  useDocumentTitle("I-Magnus | Live Classes")
  let issubs = isSubscription()
  const token = useContext(Tokens)
  const [live, setLive] = useState()
  const [loading,setloading] = useState(false)
  const course_slug = JSON.parse(localStorage.getItem("userdata"))
  const [value, setValue] = useState(course_slug?.subscriptions[0]?.course?.slug)
  // remove duplicates from subscriptions
  var dps = {}
  const subscription_plan = course_slug?.subscriptions?.filter((item)=>{ 
    let hash = item?.course?.id
    let isdup = dps[hash]
    dps[hash] = true
    return !isdup
  });

  const handleChange = (event, newValue) => {
    setValue(newValue)
    liveClasses(newValue)
  }
  // for live classes
  const liveClasses = useCallback((slugs) => {
    setloading(true)
    fetch(TEST_endPointUrl + `api/student/get_live_classes/${slugs}/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(result => {
        setLive(result)
        setloading(false)
      }
      );
        

  }, [token])

  useEffect(() => {
    liveClasses(value)
  }, [liveClasses,value])

  return (
    <>{issubs ? <div className="container-fluid">
      <div className="border-0 pb-0 mt-2">
        <h4 className="card-title"><i className="bi-collection-play-fill me-2"></i> Live Classes - Schedules ({(live && live.length) ? live.length : 0})
        </h4> 
      </div>

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
            {subscription_plan && subscription_plan?.map((item, index) =><Tab style={value===item?.course?.slug?{color:"#886ffe"}:{}} label={item?.course?.name} value={(value ===undefined)?course_slug?.subscriptions[0]?.course?.slug:item?.course?.slug} key={index}/>)}
          </TabList>
        </Box>
        <TabPanel value={value}>{loading? <div className="container-fluid">
                    <Loader />
                </div>:<div className="card mt-4">
        <div className="card-body mr-2">
          <div id="DZ_W_TimeLine11" className="widget-timeline style-3 p-2">
            <h4 className="mt-2">{live?.[0]?.course?.name}</h4>
            {live && live?.length ? "" : <><h5 className="text-red text-center"> No live Classes Available</h5></>}
            {(live && live?.length ? live : [])?.map((item, index) => <div className="row mt-4" key={index}>
              <div className="col-xl-12 col-md-12">
                <div className="card all-crs-wid">
                  <div className="card-body">
                    <div className="courses-bx">
                      <div className="row">
                        <div className="col-xl-4 col-md-4">
                          <div className="dlab-media mb-2">
                            <Link onClick={() => { sessionStorage.setItem("li_ve", JSON.stringify(item)) }} to={`${item.course.slug}`} className="popup-youtube">
                              <img src={item?.thumbnail} alt="" height={150} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-8 col-md-8">
                          <div className="dlab-info">
                            <div className="d-flex justify-content-between content align-items-center">
                              <h4>
                                <Link onClick={() => { sessionStorage.setItem("li_ve", JSON.stringify(item)) }} to={`${item?.course?.slug}`} className="text-primary">{item?.title}</Link><br />
                                <small className="m-0"><i className="bi-clipboard-data" /> MPPSC Civil Services
                                  <br />
                                  <span className="text-success"><i className="bi bi-clock" /> Time: <span className="text-black">{new Date(item?.streaming_time).toDateString()} {new Date(item?.streaming_time).toLocaleTimeString()}</span></span>
                                </small>
                              </h4>

                            </div>
                            <div className="row mt-2">
                              <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps">

                              </div>
                              <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps ps--active-y">

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between content align-items-center">
                      <h5><i className="bi bi-person-fill text-danger" /> <span className="text-danger"> Faculty BY: {item.instructor.name}</span></h5>
                      <Link onClick={() => { sessionStorage.setItem("li_ve", JSON.stringify(item)) }} to={`${item?.course.slug}`} className="btn btn-primary btn-sm">
                        <i className="bi bi-camera-video" /><span>  Join Class</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>}
      </TabPanel>
     </TabContext> </div>
    </div> : <>
      <div className="container-fluid mt-1">
        <div className="tab-content" id="nav-tabContent">
          <div className="card mt-4">
            <div className="card-body mr-2">
              <h4 className='text-center text-primary '>You Have No subscriptions</h4>
            </div>
          </div>
        </div>
      </div>
    </>}

    </>
  )
}

export default LiveClasses
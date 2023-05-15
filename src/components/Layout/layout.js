import React, { useEffect } from 'react'
import PrivateRoutes from '../../routes/PrivateRoutes'
import Sidebar from '../sidebar/sidebar'
import Header from './main/header'
import { useState } from 'react'
import { pathName } from '../../utils'

const Layout = (props) => {
  const{profileData} = props
// console.log(subs);
const [pathname, setPathname] = useState()
useEffect(()=>{
  setPathname(pathName())
},[])
return (
  <>
    <div id="main-wrapper" className="show">
      <Header pathname={pathname} profileData={profileData} />
      <Sidebar  pathname={pathname} setPathname={setPathname}/>
      <div className="content-body mt-1">
        <PrivateRoutes />
      </div>
    </div>
  </>
)
}

export default Layout

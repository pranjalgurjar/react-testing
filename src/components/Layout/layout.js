import React, {useState } from 'react'
import PrivateRoutes from '../../routes/PrivateRoutes'
import Sidebar from '../sidebar/sidebar'
import Header from './main/header'

const Layout = (props) => {
  const{profileData} = props
// console.log(subs);
const [pathname, setPathname] = useState()

return (
  <>
    <div id="main-wrapper" className="show">
      <Header setPathname={setPathname} profileData={profileData} />
      <Sidebar  pathname={pathname}/>
      <div className="content-body mt-2">
        <PrivateRoutes />
      </div>
    </div>
  </>
)
}

export default Layout

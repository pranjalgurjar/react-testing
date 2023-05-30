import React, { useEffect } from 'react'
import PrivateRoutes from '../../routes/PrivateRoutes'
import * as view from "../../view/view"
import { useState } from 'react'
import { pathName } from '../../utils'

const Layout = (props) => {
  const { profileData } = props
  // console.log(subs);
  const [pathname, setPathname] = useState()
  useEffect(() => {
    setPathname(pathName())
  }, [])
  return (
    <>
      <div id="main-wrapper" className="show">
        <view.HEADER pathname={pathname} profileData={profileData} />
        <view.SIDEBAR pathname={pathname} setPathname={setPathname} />
        <div className="content-body mt-1">
          <PrivateRoutes />
        </div>
      </div>
    </>
  )
}

export default Layout

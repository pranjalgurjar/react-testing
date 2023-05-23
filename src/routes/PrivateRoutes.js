import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../utils";
import { LOGIN } from "../route/route";


const PrivateRoutes = () => {
    // const setCoupons = props.setCoupons
    const auth = isLogin()


    return( auth ? <Outlet /> : <Navigate to={LOGIN} />)

}

export default PrivateRoutes;
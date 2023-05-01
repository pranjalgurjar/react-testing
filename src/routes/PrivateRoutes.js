import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../utils";


const PrivateRoutes = () => {
    // const setCoupons = props.setCoupons
    const auth = isLogin()


    return auth ? <Outlet /> : <Navigate to="/login" />

}

export default PrivateRoutes;
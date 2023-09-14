import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LIVE_KEY } from '../../../../ApiBaseUrl/endPointUrl'
import axiosClient from "../../../../webServices/webservice"
import img from "./images/favicon.png"
import CouponModel from './couponModel'
import { Tokens } from '../../../../App'
import { COURSES } from '../../../../route/route'
import FAQs from './FAQs'
import { webUrls } from '../../../../webServices/webUrls'
import useOtherJs from '../../../../coustomhook/UseOtherJs'
import 'react-loading-skeleton/dist/skeleton.css'
import * as view from "../../../view"
import { Title, useDocumentTitle } from '../../../../coustomhook'

const Package = (props) => {

    useDocumentTitle(`${Title.documentTitle} | Packages | ${Title.backTitle}`)
    const { ProfileApi, couresPageData } = props
    const token = useContext(Tokens)
    const { cslug } = useParams()
    const coursePackage = useOtherJs(couresPageData, cslug)
    const user_id = localStorage.getItem("eXvctIdv")
    const user_data = JSON.parse(localStorage.getItem("user_data"))
    const sub_scription = JSON.parse(localStorage.getItem("user_subscription"))
    const [user, setUser] = useState([])
    const [coupons, setCoupons] = useState()
    const [subscription, setSubscription] = useState()

    // for filter coupans data
    const [applyCoupan, setApply] = useState(0)
    const [coupanData, setCoupanData] = useState([])
    const [totalPrice, setTotalprice] = useState()
    const [isCheck, setIscheck] = useState(false)
    const [loading, setLoading] = useState(false)
    const [packageLoading, setPackageLoading] = useState(true)
    const [coupanName, setCoupanName] = useState()
    const [showCoupanModal, setShowCoupanModal] = useState(false)
    /* for payment */
    const [PaymetSuccessData, setPaymetSuccessData] = useState()
    const [alreadyBuy, setAlreadyBuy] = useState(false)
    const [payMsg, setPayMsg] = useState(false)
    /* for expand FAQ's Questions */


    useEffect(() => {
        // for pakage data 
        if (cslug && user_id && token) {
            const saveData = async () => {
                setPackageLoading(false)
                try {
                    let response = await axiosClient.get(`${webUrls.SUBSCRIPTION_PLANS_URL}${cslug}/${user_id}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (response.status === 200) {
                        setUser(response.data)
                        setPackageLoading(true)
                        setSubscription(response.data?.[0])
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            saveData()
        }
    }, [cslug, user_id, token])


    //  for select plane price button change
    const redioButton = (data) => {
        setSubscription(data)
        setIscheck(false)
    }


    // for payment proccessing
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // for amount and order id generate
    const handlePayment = async (Amount, sid) => {
        let isSubscription = sub_scription?.find(item => item?.subscription?.id === sid)
        if (isSubscription?.subscription?.id === sid) {
            setAlreadyBuy(true)
            setTimeout(() => { setAlreadyBuy(false) }, 3000)
        } else {

            if (Amount > 0) {
                try {
                    setLoading(true)
                    const res = await loadScript(
                        "https://checkout.razorpay.com/v1/checkout.js"
                    );

                    if (!res) {
                        alert("Razorpay SDK failed to load. Are you online?");
                        setLoading(false)
                        return;
                    }

                    let orderData = JSON.stringify({ amount: Amount })

                    let result = await axiosClient.post(webUrls.CREATE_ORDER_ID_URL, orderData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": 'application/json'
                        }
                    })
                    if (!result.data.status === 200) {
                        setLoading(false)
                        alert("Server error. Are you online?");
                        return;
                    } else {
                        setLoading(false)
                    }
                    const amount = Amount * 100;
                    const order_id = result.data.order_id

                    const options = {
                        'key': LIVE_KEY, // Enter the Key ID generated from the Dashboard
                        'amount': amount,
                        'currency': "INR",
                        'name': "Imagnus",
                        'description': coursePackage?.description,
                        'image': img,
                        'order_id': order_id,
                        'handler': async function (response) {
                            let data = JSON.stringify({
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                gateway_name: "razorpay",
                                coupon: ApplyCoupan?.status ? coupanName?.name : "",
                                coupon_discount: ApplyCoupan?.status ? ApplyCoupan?.coupon_discount : 0,
                                notes: subscription?.SubscriptionPlan?.name,
                                source: "web",
                                bill_amount: amount,
                                student_id: user_id,
                                subscription_id: subscription?.id
                            })

                            let paymentDone = await axiosClient.post(webUrls.PLACE_ORDER_URL, data, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    "Content-Type": 'application/json'
                                }
                            })
                            if (paymentDone?.status === 200) {
                                ProfileApi()
                                setPaymetSuccessData(paymentDone)
                            } else {
                                console.log(paymentDone.data)
                            }

                        },
                        'prefill': {
                            'name': user_data?.name,
                            'email': user_data?.email,
                            'contact': user_data?.mobile,
                        },
                        'readonly': {
                            'contact': true,
                            'email': true,
                        },
                        theme: {
                            color: "#8A2BE2",
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open()
                } catch (e) {
                    console.log(e);
                }
            } else {
                if (Amount === 0 || Amount === undefined) {
                    try {
                        setLoading(true)
                        let data = JSON.stringify({
                            "mobile": [
                                user_data?.mobile
                            ],
                            "subscription_id": subscription?.id,
                            "bill_amount": 0
                        })
                        let response = await axiosClient.post(webUrls.PLACE_MANUAL_ORDER_URL, data, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                "Content-Type": 'application/json'
                            }
                        })
                        if (response.data?.success?.[0].status_code === 200) {
                            ProfileApi()
                            setLoading(false)
                            setPayMsg(true)
                            function removeAlert() {
                                setTimeout(() => {
                                    setPayMsg(false)
                                }, 3000);
                            }
                            removeAlert()
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }



    // console.log(applyCoupan,coupanName,"co");
    const filterCoupon = () => {
        let result = coupons?.filter(item => item.subscription_id === subscription?.id)
        setCoupanData(result)
        setShowCoupanModal(true)
    }


    useEffect(() => {
        // for get coupons 
        if (token && coursePackage?.id) {
            const Coupan = async () => {
                try {
                    let reqData = JSON.stringify({
                        student_id: user_id,
                        course_id: coursePackage?.id
                    })
                    let response = await axiosClient.post(webUrls.GET_COUPON_URL, reqData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": 'application/json'
                        }
                    })
                    if (response.status === 200) {
                        setCoupons(response.data)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            Coupan()
        }
    }, [token, user_id, coursePackage?.id])

    const ApplyCoupan = async (item) => {
        try {
            setCoupanName(item)
            let reqData = JSON.stringify({
                student_id: user_id,
                coupon: item?.name,
                course_id: coursePackage?.id,
                subscription_id: item?.subscription_id
            })
            let response = await axiosClient.post(webUrls.APPLY_COUPON_URL, reqData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            })
            if (response.status === 200) {
                setTotalprice(subscription?.plan_price - response.data?.coupon_discount)
                setApply(response.data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <view.BACK_KEY
                    path={`/${COURSES}`}
                />
                {payMsg ? <div className="alert alert-success" role="alert">
                    <p style={{ fontSize: "16px" }}>Your Subscription plan successfully added to My Subscription Section. Go and Checkout It.</p>
                </div> : ""}
                {PaymetSuccessData?.data.status ? <div className="alert alert-success" role="alert">
                    <h3 className="alert-heading">Payment Success !</h3>
                    <p style={{ fontSize: "16px" }}>Your Subscription plan successfully added to My Subscription Section. Go and Checkout It.</p>
                    <hr />
                    <p className="mb-0" style={{ fontSize: "16px" }}>{PaymetSuccessData?.data?.message}.To get invoice go to My profile page</p>
                </div> : ""}
                <div className="row">
                    <div className="col-xl-6 col-xxl-6">
                        <h4 className="d-flex justify-content-between align-items-center">
                            <span className="text-black">
                                <h4 className="d-flex justify-content-between align-items-center">
                                    <span className="text-black">Subscription Plans for You!</span>
                                </h4>
                            </span>
                        </h4>
                        <view.PACKAGE_DETAILS
                            packageLoading={packageLoading}
                            user={user}
                            redioButton={redioButton}
                            coursePackage={coursePackage}
                        />
                    </div>
                    {/* <div className="col-xl-1 col-xxl-1" /> */}

                    <div className="col-xl-6 col-xxl-6 order-lg-2">
                        <h4 className="d-flex justify-content-between align-items-center">
                            <span className="text-black">
                                <h4 className="d-flex justify-content-between align-items-center">
                                    <span className="text-black">Special Offers for You!</span>
                                </h4>
                            </span>
                        </h4>
                        <div className="alert alert-warning alert-dismissible notification alert-alt fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close" />
                            <p className="notificaiton-title mb-2 text-black">
                                <strong>Flat Rs. 1000 Off !</strong> Only Valid Till 31st October
                            </p>
                            <button className="btn btn-secondary btn-sm">Apply Coupon</button>
                        </div>
                        <h4 className="d-flex justify-content-between align-items-center mb-3 mt-4">
                            <span className="text-black">Price Details</span>
                        </h4>
                        <view.PRICE_DETAIL
                            coursePackage={coursePackage}
                            subscription={subscription}
                            filterCoupon={filterCoupon}
                            isCheck={isCheck}
                            applyCoupan={applyCoupan}
                            coupanName={coupanName}
                            totalPrice={totalPrice}
                            alreadyBuy={alreadyBuy}
                            loading={loading}
                            handlePayment={handlePayment}
                            user={user}
                        />
                    </div>
                </div>
                <FAQs />
            </div>
            <CouponModel
                coupanData={coupanData}
                setIscheck={setIscheck}
                isCheck={isCheck}
                ApplyCoupan={ApplyCoupan}
                setShowCoupanModal={setShowCoupanModal}
                showCoupanModal={showCoupanModal}
            />
            <div className={showCoupanModal ? "modal-backdrop fade show" : ""}></div>
        </>
    )
}

export default Package;